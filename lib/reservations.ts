// Reservation persistence adapter.
//
// The site never talks to a real backend directly. It calls `createReservation()`
// which delegates to whichever adapter is registered. To plug in a real provider
// (e.g. ResDiary, OpenTable, Now Book It), swap the implementation here.

export type ReservationPayload = {
  date: string;          // YYYY-MM-DD (venue local)
  time: string;          // HH:MM 24h
  partySize: number;
  name: string;
  phone: string;
  email: string;
  highChair?: boolean;
  notes?: string;
  marketingConsent?: boolean;
};

export type ReservationResult = {
  ok: true;
  confirmationNumber: string;
  receivedAt: string;
};

export type ReservationError = {
  ok: false;
  code: 'INVALID' | 'CLOSED' | 'UNAVAILABLE' | 'SERVER';
  message: string;
  fieldErrors?: Partial<Record<keyof ReservationPayload, string>>;
};

export interface ReservationAdapter {
  create(payload: ReservationPayload): Promise<ReservationResult | ReservationError>;
}

// --- Mock adapter (demo) ---------------------------------------------------
const mockAdapter: ReservationAdapter = {
  async create(payload) {
    // Simulate latency so the loading state is visible.
    await new Promise((r) => setTimeout(r, 700));
    // Deterministic-ish 6-digit confirmation.
    const n = (Math.floor(Math.random() * 900000) + 100000).toString();
    return {
      ok: true,
      confirmationNumber: `DF-${n}`,
      receivedAt: new Date().toISOString(),
    };
  },
};

// Swap this line for a real adapter when ready.
const adapter: ReservationAdapter = mockAdapter;

export const reservations = {
  create: (p: ReservationPayload) => adapter.create(p),
};

// AU mobile (+61 4xx xxx xxx) and AU landlines (02/03/07/08).
export function validateAUPhone(value: string): boolean {
  const v = value.replace(/[\s()-]/g, '');
  return /^(?:\+?61|0)[2-578]\d{8}$/.test(v);
}

export function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
