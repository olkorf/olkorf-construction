export const confirmationTimeZone = "America/Chicago";
export const daytimeHours = { start: 8, end: 18 };

export function confirmationPeriod(date = new Date()): "daytime" | "evening" {
 const hour = Number(new Intl.DateTimeFormat("en-US", {
  timeZone: confirmationTimeZone, hour: "numeric", hourCycle: "h23"
 }).format(date));
 return hour >= daytimeHours.start && hour < daytimeHours.end ? "daytime" : "evening";
}

// Weekend presentation takes priority over the weekday time-of-day states.
export function confirmationState(date = new Date()): "daytime" | "evening" | "weekend" {
 const weekday = new Intl.DateTimeFormat("en-US", { timeZone: confirmationTimeZone, weekday: "short" }).format(date);
 if (weekday === "Sat" || weekday === "Sun") return "weekend";
 return confirmationPeriod(date);
}

export const confirmationContent = {
 daytime: {
  image: "/images/estimate/daytime-reference-hq.avif",
  lead: ["I’m probably on an installation", "right now."],
  support: ["Your request is in. I’ll review the details", "and get back to you as soon as I’m off the jobsite."]
 },
 weekend: {
  image: "/images/estimate/weekend-reference-hq.avif",
  lead: ["It’s the weekend.", "I’m recharging too."],
  support: ["Your request is safely in.", "I’ll take a look and get back to you soon."]
 },
 evening: {
  image: "/images/estimate/evening-reference-hq.avif",
  lead: ["Tools are down.", "Batteries are charging.", "So am I."],
  support: ["Your request is safely in.", "I’ll get back to you tomorrow morning."]
 }
};
