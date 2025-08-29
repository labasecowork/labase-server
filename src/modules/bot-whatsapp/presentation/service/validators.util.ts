export function isValidTimeHHmm(s: string) {
  const m = s.match(/^(\d{2}):(\d{2})$/);
  if (!m) return false;
  const hh = Number(m[1]),
    mm = Number(m[2]);
  return hh >= 0 && hh <= 23 && mm >= 0 && mm <= 59;
}

export function toMinutes(s: string) {
  const [hh, mm] = s.split(":").map(Number);
  return hh * 60 + mm;
}

export function isWithinOpenHours(
  timeHHmm: string,
  OPEN_START: string,
  OPEN_END: string,
) {
  const t = toMinutes(timeHHmm);
  return t >= toMinutes(OPEN_START) && t <= toMinutes(OPEN_END);
}

export function isDateNotPastLima(todayISO: string, yyyy_mm_dd: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(yyyy_mm_dd)) return false;
  return yyyy_mm_dd >= todayISO;
}

/* ---------- Parseo flexible ---------- */
export function parseDateFlexible(
  input: string,
  todayISO: string,
): string | null {
  const s = input.trim().toLowerCase();

  if (/\b(mañana|manana)\b/.test(s)) {
    const [y, m, d] = todayISO.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d));
    dt.setUTCDate(dt.getUTCDate() + 1);
    const yy = dt.getUTCFullYear();
    const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(dt.getUTCDate()).padStart(2, "0");
    return `${yy}-${mm}-${dd}`;
  }

  // yyyy-mm-dd o yyyy/mm/dd
  const ymd = s.match(/\b(\d{4})[/-](\d{2})[/-](\d{2})\b/);
  if (ymd) {
    const [, y, m, d] = ymd;
    return `${y}-${m}-${d}`;
  }

  // dd-mm-yyyy o dd/mm/yyyy
  const dmy = s.match(/\b(\d{2})[/-](\d{2})[/-](\d{4})\b/);
  if (dmy) {
    const [, d, m, y] = dmy;
    return `${y}-${m}-${d}`;
  }

  return null;
}

export function parseTimeFlexible(input: string): string | null {
  let t = input.trim().toLowerCase().replace(/\s+/g, " ");

  // Rango "3-4pm" → tomar la primera hora
  const range = t.match(
    /(.+?)(?:\s*[-–a]\s*)(\d{1,2}(?::\d{2})?\s*(?:a\.?m?\.?|p\.?m?\.?)?|\bmediod[ií]a\b|\bmedianoche\b)/i,
  );
  if (range) t = range[1];

  // Palabras especiales
  if (/\bmediod[ií]a\b/.test(t)) return "12:00";
  if (/\bmedianoche\b/.test(t)) return "00:00";

  // hh[:mm] [am|pm]
  const m = t.match(/\b(\d{1,2})(?::(\d{2}))?\s*(a\.?m?\.?|p\.?m?\.?)?\b/i);
  if (!m) return null;

  let hh = parseInt(m[1]!, 10);
  const mm = m[2] ? parseInt(m[2], 10) : 0;
  const ap = (m[3] || "").toLowerCase();

  if (ap.startsWith("a")) {
    if (hh === 12) hh = 0;
  } else if (ap.startsWith("p")) {
    if (hh < 12) hh += 12;
  }

  if (hh < 0 || hh > 23 || mm < 0 || mm > 59) return null;
  const H = String(hh).padStart(2, "0");
  const M = String(mm).padStart(2, "0");
  return `${H}:${M}`;
}
