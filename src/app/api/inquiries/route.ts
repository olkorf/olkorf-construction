const recipient = "info@olkorfconstruction.com";
const failure = () => Response.json({ error: "Unable to confirm delivery. Please try again or email us directly." }, { status: 503 });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Invalid origin" }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Expected JSON" }, { status: 415 });
  }
  let input: Record<string, unknown>;
  try {
    // Bound the stream before parsing, including requests without Content-Length.
    const reader = request.body?.getReader();
    if (!reader) throw new Error();
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 24000) {
        await reader.cancel();
        return Response.json({ error: "Message too long" }, { status: 413 });
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    input = JSON.parse(new TextDecoder().decode(bytes));
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error();
  } catch {
    return Response.json({ error: "Invalid message" }, { status: 400 });
  }
  if (input.website) return Response.json({ ok: true });
  const estimate = input.kind === "estimate";
  if (!estimate && input.kind !== "contact") return Response.json({ error: "Invalid form" }, { status: 400 });
  const fields = ["name", "email", "phone", "city", "subject", "quantity", "timeline", "message"];
  const values: Record<string, string> = {};
  for (const field of fields) {
    const value = input[field] ?? "";
    if (typeof value !== "string" || value.length > (field === "message" ? 10000 : 250)) {
      return Response.json({ error: "Invalid field" }, { status: 400 });
    }
    values[field] = value.trim();
  }
  const types = input.projectTypes ?? [];
  if (!Array.isArray(types) || types.length > 7 || types.some(value => typeof value !== "string" || value.length > 100)) {
    return Response.json({ error: "Invalid project types" }, { status: 400 });
  }
  if (!values.name || (estimate ? !values.phone || !values.city || !types.length : !values.email || !values.message) ||
    (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))) {
    return Response.json({ error: "Required information missing or invalid" }, { status: 400 });
  }
  const account = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_EMAIL_API_TOKEN;
  const from = process.env.INQUIRY_FROM_EMAIL;
  if (!account || !token || !from) return failure();
  const title = estimate ? "New Estimate Request" : "New Contact Message";
  const entries = [
    ["Name", values.name], ["Email", values.email], ["Phone", values.phone],
    ...(estimate ? [["City", values.city], ["Project types", types.join(", ")], ["Approximate quantity", values.quantity], ["Timeline", values.timeline]] : [["Subject", values.subject]]),
    ["Message / project details", values.message],
    ["Form", estimate ? "/estimate" : "/contact"], ["Submitted (UTC)", new Date().toISOString()]
  ];
  const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
  const text = `${title} — OLKORF Construction\n\n` + entries.map(([label, value]) => `${label}:\n${value || "Not provided"}`).join("\n\n");
  const html = `<div style="font-family:Arial,sans-serif;color:#192c40;max-width:640px"><h1 style="font-size:24px;color:#203f60">${title}</h1><p>OLKORF Construction website inquiry</p>${entries.map(([label, value]) => `<h2 style="font-size:13px;color:#526a80;margin:24px 0 6px">${escape(label)}</h2><p style="margin:0;white-space:pre-wrap">${escape(value || "Not provided")}</p>`).join("")}</div>`;
  try {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(account)}/email/sending/send`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: recipient, subject: `${title} - OLKORF Construction`, text, html }),
      signal: AbortSignal.timeout(15000)
    });
    const data = await response.json();
    const accepted = [...(data.result?.delivered ?? []), ...(data.result?.queued ?? [])];
    if (!response.ok || !data.success || !accepted.includes(recipient)) return failure();
    return Response.json({ ok: true });
  } catch {
    return failure();
  }
}
