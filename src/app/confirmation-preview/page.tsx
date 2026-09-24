import { notFound } from "next/navigation";
import { ConfirmationCard } from "@/components/estimate-confirmation";

export default async function ConfirmationPreview({ searchParams }: { searchParams: Promise<{ state?: string }> }) {
  if (process.env.NODE_ENV !== "development") notFound();
  const { state } = await searchParams;
  const period = state === "daytime" || state === "evening" ? state : "weekend";
  return (
    <section className="estimate-page">
      <div className="estimate-page__inner">
        <div className="estimate-card"><ConfirmationCard period={period} /></div>
      </div>
    </section>
  );
}
