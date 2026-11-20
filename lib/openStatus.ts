// lib/openStatus.ts
// Live "Open now / Closed" from a place's timing strings such as "9:00 AM" / "5:30 PM".

type Timing = { open?: string; close?: string };

/** Parses "9:00 AM" / "12:30 PM" into minutes since midnight; null for anything else. */
export function parseTime(value: string | undefined): number | null {
    if (!value) return null;
    const m = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!m) return null;
    let h = parseInt(m[1], 10) % 12;
    if (m[3].toUpperCase() === "PM") h += 12;
    return h * 60 + parseInt(m[2], 10);
}

/** "9:00 AM" -> "09:00" (schema.org format); null if it can't be parsed. */
export function toSchemaTime(value: string | undefined): string | null {
    const mins = parseTime(value);
    if (mins === null) return null;
    const h = String(Math.floor(mins / 60)).padStart(2, "0");
    const m = String(mins % 60).padStart(2, "0");
    return `${h}:${m}`;
}

/**
 * Whether a place is open at `now`. Falls back to the static `fallback` flag when
 * `now` is not known yet (server render) or the timing text can't be parsed.
 */
export function isOpenAt(timing: Timing | undefined, now: Date | null, fallback: boolean): boolean {
    const open = timing?.open ?? "";
    if (/all day|24/i.test(open)) return true;
    if (!now) return fallback;
    const start = parseTime(open);
    const end = parseTime(timing?.close);
    if (start === null || end === null) return fallback;
    const mins = now.getHours() * 60 + now.getMinutes();
    return end > start ? mins >= start && mins < end : mins >= start || mins < end;
}
