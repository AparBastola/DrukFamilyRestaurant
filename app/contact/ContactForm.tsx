'use client';

import { useState } from 'react';
import { business } from '@/lib/business';

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; msg: string; errors?: Record<string, string> };

// Set NEXT_PUBLIC_CONTACT_ENDPOINT in .env (and as a GitHub Actions secret/var)
// to a form-handler URL — e.g. Formspree (https://formspree.io) or Web3Forms.
// When unset, the form posts via mailto: so the site still works on GitHub Pages.
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ENDPOINT) {
      const subject = encodeURIComponent(`Website enquiry from ${name || 'a guest'}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
      setStatus({ kind: 'sent' });
      return;
    }
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.ok ?? true)) setStatus({ kind: 'sent' });
      else setStatus({ kind: 'error', msg: 'Please check the fields below.', errors: data.errors });
    } catch {
      setStatus({ kind: 'error', msg: 'Network error. Please try again or call us.' });
    }
  }

  if (status.kind === 'sent') {
    return (
      <div className="card p-7 text-center">
        <h2 className="font-display text-xl text-maroon">Thank you — we’ll be in touch shortly.</h2>
        <p className="mt-2 text-[14px] text-ink-soft">For anything urgent, please give us a call.</p>
      </div>
    );
  }

  const err = (k: 'name' | 'email' | 'message') =>
    status.kind === 'error' ? status.errors?.[k] : undefined;

  return (
    <form onSubmit={onSubmit} noValidate className="card p-7 space-y-4">
      <div>
        <label htmlFor="c-name" className="label">Your name</label>
        <input id="c-name" type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
        {err('name') && <p className="mt-1 text-[12px] text-error">{err('name')}</p>}
      </div>
      <div>
        <label htmlFor="c-email" className="label">Email</label>
        <input id="c-email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
        {err('email') && <p className="mt-1 text-[12px] text-error">{err('email')}</p>}
      </div>
      <div>
        <label htmlFor="c-message" className="label">Message</label>
        <textarea id="c-message" className="textarea" value={message} onChange={(e) => setMessage(e.target.value)} required />
        {err('message') && <p className="mt-1 text-[12px] text-error">{err('message')}</p>}
      </div>
      {status.kind === 'error' && (
        <p className="rounded-control border border-error/20 bg-error/[0.08] p-3 text-[14px] text-error">{status.msg}</p>
      )}
      <button type="submit" disabled={status.kind === 'sending'} className="btn-primary w-full">
        {status.kind === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
