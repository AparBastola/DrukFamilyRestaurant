import { business } from './business';

// Returns the venue's local wall-clock time as { day, minutes-since-midnight }.
// Uses Intl with the venue's timezone so the chip is correct regardless of
// where the visitor is.
function venueLocal(now: Date = new Date()) {
  const fmt = new Intl.DateTimeFormat('en-AU', {
    timeZone: business.timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const weekday = get('weekday'); // e.g. "Tue"
  const hour = parseInt(get('hour'), 10);
  const minute = parseInt(get('minute'), 10);
  const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(
    weekday,
  );
  return { dayIndex, minutes: hour * 60 + minute };
}

function hhmmToMin(s: string) {
  const [h, m] = s.split(':').map(Number);
  return h * 60 + m;
}

export type LiveStatus = {
  open: boolean;
  label: string;     // "Open now" | "Closing soon" | "Closed"
  detail: string;    // "Until 9pm" | "Opens Tue at 4pm"
};

export function liveStatus(now: Date = new Date()): LiveStatus {
  const { dayIndex, minutes } = venueLocal(now);
  const today = business.hours[dayIndex];
  if (today) {
    const open = hhmmToMin(today.open);
    const close = hhmmToMin(today.close);
    if (minutes >= open && minutes < close) {
      const minsToClose = close - minutes;
      if (minsToClose <= 30) {
        return {
          open: true,
          label: 'Closing soon',
          detail: `Closes at ${formatHour(today.close)}`,
        };
      }
      return {
        open: true,
        label: 'Open now',
        detail: `Until ${formatHour(today.close)}`,
      };
    }
  }
  // Closed — find the next opening day/time.
  for (let offset = 0; offset <= 7; offset++) {
    const idx = (dayIndex + offset) % 7;
    const slot = business.hours[idx];
    if (!slot) continue;
    const openMin = hhmmToMin(slot.open);
    if (offset === 0 && minutes < openMin) {
      return {
        open: false,
        label: 'Closed',
        detail: `Opens today at ${formatHour(slot.open)}`,
      };
    }
    if (offset > 0) {
      return {
        open: false,
        label: 'Closed',
        detail: `Opens ${slot.day.slice(0, 3)} at ${formatHour(slot.open)}`,
      };
    }
  }
  return { open: false, label: 'Closed', detail: '' };
}

export function formatHour(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const period = h >= 12 ? 'pm' : 'am';
  const display = ((h + 11) % 12) + 1;
  return m === 0 ? `${display}${period}` : `${display}:${String(m).padStart(2, '0')}${period}`;
}

// Build selectable 30-min booking slots for a given local date,
// respecting that day's hours and the close buffer.
export function slotsForDate(dateISO: string): string[] {
  const d = new Date(dateISO + 'T00:00:00');
  const dayIndex = d.getDay();
  const slot = business.hours[dayIndex];
  if (!slot) return [];
  const start = hhmmToMin(slot.open);
  const end = hhmmToMin(slot.close) - business.reservations.closeBufferMinutes;
  const step = business.reservations.slotMinutes;
  const out: string[] = [];
  for (let m = start; m <= end; m += step) {
    const hh = Math.floor(m / 60);
    const mm = m % 60;
    out.push(`${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`);
  }
  return out;
}

export function isClosedDay(dateISO: string): boolean {
  const d = new Date(dateISO + 'T00:00:00');
  return !business.hours[d.getDay()];
}
