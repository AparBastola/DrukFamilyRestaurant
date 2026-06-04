'use client';

import { useEffect, useState } from 'react';
import { liveStatus, type LiveStatus } from '@/lib/hours';

type Props = {
  /** subtle look for header/footer; bold look for hero. */
  tone?: 'subtle' | 'hero';
};

export default function StatusChip({ tone = 'subtle' }: Props) {
  // Computed at first render on the server, then re-evaluated client-side
  // every 60s so visitors see "Closing soon" / "Open" flip live.
  const [status, setStatus] = useState<LiveStatus>(() => liveStatus());

  useEffect(() => {
    const id = setInterval(() => setStatus(liveStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  const dot = status.open
    ? status.label === 'Closing soon'
      ? 'bg-marigold'
      : 'bg-jade'
    : 'bg-error';

  if (tone === 'hero') {
    return (
      <span className="inline-flex items-center gap-2 rounded-pill bg-white/[0.12] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm ring-1 ring-white/25">
        <span className={`h-2 w-2 rounded-full ${dot} shadow-[0_0_0_3px_rgba(255,255,255,.15)]`} />
        {status.label}
        <span className="hidden sm:inline font-normal normal-case tracking-normal text-white/[0.85]">· {status.detail}</span>
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-2 rounded-pill border border-hairline bg-cream px-2.5 py-1 text-[12px] font-semibold text-ink"
      title={status.detail}
    >
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {status.label}
      <span className="hidden md:inline font-normal text-ink-soft">· {status.detail}</span>
    </span>
  );
}
