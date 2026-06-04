'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { business } from '@/lib/business';
import { formatHour, isClosedDay, slotsForDate } from '@/lib/hours';
import { validateAUPhone, validateEmail } from '@/lib/reservations';

type FormState = {
  date: string;
  time: string;
  partySize: number;
  name: string;
  phone: string;
  email: string;
  highChair: boolean;
  notes: string;
  marketingConsent: boolean;
};

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; confirmation: string }
  | { kind: 'error'; message: string; fieldErrors?: Record<string, string> };

function todayISO() {
  const d = new Date();
  const tz = d.getTimezoneOffset();
  return new Date(d.getTime() - tz * 60_000).toISOString().slice(0, 10);
}

function maxISO(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const initial: FormState = {
  date: todayISO(),
  time: '',
  partySize: 2,
  name: '',
  phone: '',
  email: '',
  highChair: false,
  notes: '',
  marketingConsent: false,
};

export default function BookingWidget() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const closed = useMemo(() => isClosedDay(form.date), [form.date]);
  const slots = useMemo(() => (closed ? [] : slotsForDate(form.date)), [form.date, closed]);

  useEffect(() => {
    // When the date changes and the previously chosen time is no longer valid,
    // pre-select the first available slot so the user isn't stranded.
    if (slots.length && !slots.includes(form.time)) {
      setForm((f) => ({ ...f, time: slots[0] }));
    }
    if (!slots.length) setForm((f) => ({ ...f, time: '' }));
  }, [slots, form.time]);

  const oversized = form.partySize > business.reservations.maxPartySize;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  function blur(field: string) {
    setTouched((s) => new Set(s).add(field));
  }
  function fieldError(field: keyof FormState): string | undefined {
    if (status.kind === 'error' && status.fieldErrors?.[field]) return status.fieldErrors[field];
    if (!touched.has(field)) return undefined;
    switch (field) {
      case 'name':  return form.name.trim().length < 2 ? 'Please enter your name.' : undefined;
      case 'phone': return !validateAUPhone(form.phone) ? 'Enter a valid Australian phone number.' : undefined;
      case 'email': return !validateEmail(form.email) ? 'Enter a valid email.' : undefined;
      case 'time':  return !form.time ? 'Choose a time.' : undefined;
      default: return undefined;
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (oversized) return; // routed to phone instead
    setStatus({ kind: 'submitting' });
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus({ kind: 'success', confirmation: data.confirmationNumber });
      } else {
        setStatus({ kind: 'error', message: data.message ?? 'Something went wrong.', fieldErrors: data.fieldErrors });
      }
    } catch {
      setStatus({ kind: 'error', message: 'Network error. Please try again or call us.' });
    }
  }

  // ─── SUCCESS STATE ────────────────────────────────────────────────────────
  if (status.kind === 'success') {
    const dt = `${form.date}T${form.time}:00`;
    const cal = buildCalendarLink(dt, form.partySize, status.confirmation);
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-jade/[0.12] text-jade">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 13 4 4L19 7" /></svg>
        </div>
        <h2 className="mt-4 font-display text-2xl font-semibold text-maroon">Tashi delek — you’re booked.</h2>
        <p className="mt-2 text-ink-soft">
          Confirmation <span className="font-mono text-maroon-deep">{status.confirmation}</span> ·{' '}
          {form.partySize} {form.partySize === 1 ? 'guest' : 'guests'} on{' '}
          <strong>{formatDateLong(form.date)}</strong> at{' '}
          <strong>{formatHour(form.time)}</strong>.
        </p>
        <p className="mt-2 text-[14px] text-ink-soft">
          We’ll text {form.phone} if anything changes. See you soon at Swinger Hill.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={cal} download="druk-family-booking.ics" className="btn-primary">Add to calendar</a>
          <button onClick={() => { setStatus({ kind: 'idle' }); setForm(initial); }} className="btn-secondary">
            Book another
          </button>
        </div>
      </div>
    );
  }

  // ─── FORM ──────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="r-date" className="label">Date</label>
          <input
            id="r-date" type="date" className="input"
            min={todayISO()} max={maxISO(business.reservations.advanceDays)}
            value={form.date} onChange={(e) => update('date', e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="r-party" className="label">Party size</label>
          <select
            id="r-party" className="select"
            value={form.partySize} onChange={(e) => update('partySize', Number(e.target.value))}
          >
            {[1,2,3,4,5,6,7,8].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
            ))}
            <option value={9}>8+ (please call)</option>
          </select>
        </div>
        <div>
          <label htmlFor="r-time" className="label">Time</label>
          <select
            id="r-time" className="select"
            value={form.time} onChange={(e) => update('time', e.target.value)}
            onBlur={() => blur('time')}
            disabled={closed || slots.length === 0}
            aria-describedby={fieldError('time') ? 'time-err' : undefined}
            required
          >
            {!form.time && <option value="" disabled>Select a time…</option>}
            {slots.map((t) => (
              <option key={t} value={t}>{formatHour(t)}</option>
            ))}
          </select>
          {fieldError('time') && <p id="time-err" className="mt-1 text-[12px] text-error">{fieldError('time')}</p>}
        </div>
      </div>

      {/* Closed-day notice */}
      {closed && (
        <p className="mt-4 rounded-control border border-error/20 bg-error/[0.08] p-3 text-[14px] text-error">
          We’re closed on {formatDateLong(form.date)}. Please pick another day.
        </p>
      )}

      {/* Oversized party fallback */}
      {oversized && (
        <div className="mt-4 rounded-control border border-saffron/40 bg-saffron/10 p-4">
          <p className="font-display text-maroon">Groups of 8+ are very welcome.</p>
          <p className="mt-1 text-[14px] text-ink-soft">
            Please call us so we can find the right table (and the karaoke room if you’d like).
          </p>
          <a href={`tel:${business.phone.e164}`} className="btn-primary mt-3">
            Call {business.phone.display}
          </a>
        </div>
      )}

      {!oversized && (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="r-name" className="label">Your name</label>
              <input
                id="r-name" type="text" className="input"
                value={form.name} onChange={(e) => update('name', e.target.value)} onBlur={() => blur('name')}
                autoComplete="name" required
              />
              {fieldError('name') && <p className="mt-1 text-[12px] text-error">{fieldError('name')}</p>}
            </div>
            <div>
              <label htmlFor="r-phone" className="label">Mobile</label>
              <input
                id="r-phone" type="tel" inputMode="tel" className="input"
                placeholder="04xx xxx xxx"
                value={form.phone} onChange={(e) => update('phone', e.target.value)} onBlur={() => blur('phone')}
                autoComplete="tel" required
              />
              {fieldError('phone') && <p className="mt-1 text-[12px] text-error">{fieldError('phone')}</p>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="r-email" className="label">Email</label>
              <input
                id="r-email" type="email" className="input"
                value={form.email} onChange={(e) => update('email', e.target.value)} onBlur={() => blur('email')}
                autoComplete="email" required
              />
              {fieldError('email') && <p className="mt-1 text-[12px] text-error">{fieldError('email')}</p>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="r-notes" className="label">Special requests (optional)</label>
              <textarea
                id="r-notes" className="textarea"
                value={form.notes} onChange={(e) => update('notes', e.target.value)}
                placeholder="Dietary notes, anniversary, allergies…"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <label className="inline-flex items-center gap-2 text-[14px] text-ink">
              <input type="checkbox" className="accent-maroon"
                checked={form.highChair} onChange={(e) => update('highChair', e.target.checked)} />
              High chair required
            </label>
            <label className="inline-flex items-center gap-2 text-[13px] text-ink-soft">
              <input type="checkbox" className="accent-maroon"
                checked={form.marketingConsent} onChange={(e) => update('marketingConsent', e.target.checked)} />
              Send me occasional updates from the restaurant
            </label>
          </div>

          {status.kind === 'error' && (
            <p className="mt-4 rounded-control border border-error/20 bg-error/[0.08] p-3 text-[14px] text-error">
              {status.message}
            </p>
          )}

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-ink-soft">
              Prefer to call? <a href={`tel:${business.phone.e164}`} className="link-saffron">{business.phone.display}</a>
            </p>
            <button
              type="submit" className="btn-primary"
              disabled={closed || status.kind === 'submitting' || slots.length === 0}
            >
              {status.kind === 'submitting' ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Reserving…
                </>
              ) : 'Confirm reservation'}
            </button>
          </div>
        </>
      )}
    </form>
  );
}

function formatDateLong(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-AU', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

function buildCalendarLink(startLocal: string, party: number, conf: string) {
  // Encode a self-contained ICS as a data URL so it works without any server.
  const start = startLocal.replace(/[-:]/g, '').slice(0, 13) + '00';
  const endDate = new Date(startLocal);
  endDate.setHours(endDate.getHours() + 2);
  const end = endDate.toISOString().replace(/[-:]/g, '').slice(0, 13) + '00';
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Druk Family//EN',
    'BEGIN:VEVENT', `UID:${conf}@drukfamily`, `SUMMARY:Druk Family Restaurant — ${party} guests`,
    `LOCATION:${business.address.full}`,
    `DESCRIPTION:Confirmation ${conf}. Phone ${business.phone.display}.`,
    `DTSTART:${start}`, `DTEND:${end}`, 'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
