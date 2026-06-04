import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Stub endpoint — replace with a real form provider (Formspree, Resend, etc.)
// when ready. See README for instructions.
export async function POST(req: Request) {
  let body: { name?: string; email?: string; message?: string };
  try { body = await req.json(); } catch {
    return NextResponse.json({ ok: false, message: 'Bad request.' }, { status: 400 });
  }
  const errors: Record<string, string> = {};
  if (!body.name || body.name.trim().length < 2) errors.name = 'Required';
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.email = 'Enter a valid email';
  if (!body.message || body.message.trim().length < 5) errors.message = 'Please add a short message';
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }
  // In production, forward to email or save to a CRM here.
  return NextResponse.json({ ok: true });
}
