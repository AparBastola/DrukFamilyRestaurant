'use client';

import { useState } from 'react';

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; msg: string; errors?: Record<string, string> };

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (data.ok) setStatus({ kind: 'sent' });
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
