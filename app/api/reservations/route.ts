import { NextResponse } from 'next/server';
import {
  reservations,
  validateAUPhone,
  validateEmail,
  type ReservationPayload,
} from '@/lib/reservations';
import { isClosedDay, slotsForDate } from '@/lib/hours';
import { business } from '@/lib/business';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: Partial<ReservationPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: 'INVALID', message: 'Malformed request.' },
      { status: 400 },
    );
  }

  const fieldErrors: Record<string, string> = {};
  const required: (keyof ReservationPayload)[] = ['date', 'time', 'partySize', 'name', 'phone', 'email'];
  for (const k of required) {
    if (body[k] === undefined || body[k] === '' || body[k] === null) {
      fieldErrors[k] = 'Required';
    }
  }

  if (body.email && !validateEmail(body.email)) fieldErrors.email = 'Enter a valid email.';
  if (body.phone && !validateAUPhone(body.phone)) fieldErrors.phone = 'Enter a valid Australian phone number.';
  if (typeof body.partySize === 'number') {
    if (body.partySize < 1 || body.partySize > business.reservations.maxPartySize) {
      fieldErrors.partySize = `Choose between 1 and ${business.reservations.maxPartySize}. Larger groups: please call.`;
    }
  }

  if (body.date) {
    if (isClosedDay(body.date)) {
      return NextResponse.json(
        { ok: false, code: 'CLOSED', message: 'We are closed on that day.', fieldErrors: { date: 'Closed.' } },
        { status: 400 },
      );
    }
    if (body.time && !slotsForDate(body.date).includes(body.time)) {
      fieldErrors.time = 'That time is outside our opening hours.';
    }
  }

  if (Object.keys(fieldErrors).length) {
    return NextResponse.json(
      { ok: false, code: 'INVALID', message: 'Please correct the highlighted fields.', fieldErrors },
      { status: 400 },
    );
  }

  const result = await reservations.create(body as ReservationPayload);
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
