// src/modules/chatbot/presentation/service/datetime_lima.util.ts
export function fmtDateLima(d: Date, TZ: string) {
  return new Intl.DateTimeFormat("es-PE", {
    timeZone: TZ,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

export function fmtTimeLima(d: Date, TZ: string) {
  return new Intl.DateTimeFormat("es-PE", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

export function todayLimaISO(TZ: string) {
  const d = new Date();
  const [y, m, dd] = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .formatToParts(d)
    .filter((p) => p.type !== "literal")
    .map((p) => p.value);
  return `${y}-${m}-${dd}`;
}

export function addDaysLima(baseISO: string, days: number) {
  const [y, m, d] = baseISO.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  const y2 = dt.getUTCFullYear();
  const m2 = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const d2 = String(dt.getUTCDate()).padStart(2, "0");
  return `${y2}-${m2}-${d2}`;
}
