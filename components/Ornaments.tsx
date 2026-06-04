// Decorative Bhutanese motifs as inline SVG so they stay crisp and tintable.
// Keep usage sparing — they're accents, not wallpaper.

export function EndlessKnot({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <path d="M20 12h24v12H32V12" />
        <path d="M44 12v24h-12V24h12" />
        <path d="M44 36H20v12h12V36" />
        <path d="M20 48V24h12v12H20" />
      </g>
    </svg>
  );
}

export function KemarDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-current opacity-60" />
      <EndlessKnot className="h-6 w-6" />
      <span className="h-px w-16 bg-current opacity-60" />
    </div>
  );
}

export function DragonMark({ className = 'h-12 w-12' }: { className?: string }) {
  // Simplified Druk (dragon) silhouette referencing the flag.
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M10 38c4-12 14-18 24-18 6 0 10 2 14 6 2-4 6-6 6-6s-2 6-2 10c0 5-3 10-9 12 4 2 6 6 6 10 0 0-5-3-9-3-6 0-11 3-15 3-8 0-15-5-15-14z"
      />
      <circle cx="42" cy="28" r="2" fill="#FFFDF7" />
    </svg>
  );
}

export function Chilli({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M9 4c-1 2-1 4 1 5 2 1 3 0 4-1" stroke="#1F6B4F" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M11 7c5 0 8 4 8 9 0 3-3 6-7 6-3 0-6-2-7-5-1-4 1-8 6-10z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Leaf({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M4 20c0-9 7-16 16-16 0 9-7 16-16 16z"
        fill="currentColor"
        opacity=".85"
      />
      <path d="M4 20 16 8" stroke="#0e3a2a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function Momo({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <path d="M8 32c0-9 7-16 16-16s16 7 16 16" stroke="currentColor" strokeWidth="2" />
      <path d="M8 32h32" stroke="currentColor" strokeWidth="2" />
      <path d="M14 31c2-6 4-9 10-9s8 3 10 9M20 30c1-5 2-7 4-7s3 2 4 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Scooter({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M3 6h3l3 12M9 18h6M14 6h4l2 6h-3" />
    </svg>
  );
}

export function Clock({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function Pin({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function Phone({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1.2.3 2.4.7 3.6a2 2 0 0 1-.5 2.1L8 10.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c1.2.4 2.4.6 3.6.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}
