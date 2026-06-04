// Bhutanese decorative pattern components.
// All built as inline SVG so they stay crisp, tintable, and zero-network-cost.

// ─── Textile Diamond Pattern ─────────────────────────────────────────────────
// Based on the traditional Kishuthara woven pattern (colourful diamond/cross).
// Rendered as an SVG <pattern> tile; wrap in a <div> to fill any surface.
export function TextilePatternBg({
  className = 'absolute inset-0 w-full h-full',
  opacity = 0.06,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg className={className} aria-hidden="true" style={{ opacity }}>
      <defs>
        <pattern id="bhutan-textile" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          {/* Outer diamond frame */}
          <path d="M24 2 L46 24 L24 46 L2 24 Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
          {/* Inner diamond */}
          <path d="M24 10 L38 24 L24 38 L10 24 Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
          {/* Centre cross */}
          <path d="M24 16 L24 32 M16 24 L32 24" stroke="currentColor" strokeWidth="0.8" />
          {/* Corner tick marks */}
          <path d="M24 2 L22 6 M24 2 L26 6 M46 24 L42 22 M46 24 L42 26 M24 46 L22 42 M24 46 L26 42 M2 24 L6 22 M2 24 L6 26" stroke="currentColor" strokeWidth="0.7" />
          {/* Diamond dots at cardinal points of outer ring */}
          <rect x="22.5" y="5" width="3" height="3" transform="rotate(45 24 6.5)" fill="currentColor" opacity="0.7" />
          <rect x="22.5" y="39.5" width="3" height="3" transform="rotate(45 24 41)" fill="currentColor" opacity="0.7" />
          <rect x="5" y="22.5" width="3" height="3" transform="rotate(45 6.5 24)" fill="currentColor" opacity="0.7" />
          <rect x="39.5" y="22.5" width="3" height="3" transform="rotate(45 41 24)" fill="currentColor" opacity="0.7" />
          {/* Centre dot */}
          <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bhutan-textile)" color="currentColor" />
    </svg>
  );
}

// ─── Pigeon's Eye (Parewa Mik) Motif ─────────────────────────────────────────
// Single concentric diamond ornament — use as section divider accent or card corner.
export function PigeonsEye({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none">
      <path d="M32 2 L62 32 L32 62 L2 32 Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M32 10 L54 32 L32 54 L10 32 Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M32 18 L46 32 L32 46 L18 32 Z" stroke="currentColor" strokeWidth="1" />
      <path d="M32 24 L40 32 L32 40 L24 32 Z" stroke="currentColor" strokeWidth="0.8" fill="currentColor" opacity="0.25" />
      {/* Radiating tick marks at 8 points */}
      <path d="M32 2 L30 8 M32 2 L34 8" stroke="currentColor" strokeWidth="0.8" />
      <path d="M62 32 L56 30 M62 32 L56 34" stroke="currentColor" strokeWidth="0.8" />
      <path d="M32 62 L30 56 M32 62 L34 56" stroke="currentColor" strokeWidth="0.8" />
      <path d="M2 32 L8 30 M2 32 L8 34" stroke="currentColor" strokeWidth="0.8" />
      <path d="M47 17 L43 21 M47 47 L43 43 M17 47 L21 43 M17 17 L21 21" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="32" cy="32" r="2.5" fill="currentColor" />
    </svg>
  );
}

// ─── Monkey's Nail (Prai Tsimba) ─────────────────────────────────────────────
export function MonkeysNail({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden="true" fill="none">
      <path d="M28 2 L54 28 L28 54 L2 28 Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M28 9 L47 28 L28 47 L9 28 Z" stroke="currentColor" strokeWidth="1" />
      {/* Inner cross grid */}
      <path d="M28 9 L28 47 M9 28 L47 28" stroke="currentColor" strokeWidth="0.7" />
      <path d="M14 14 L42 42 M42 14 L14 42" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="28" cy="28" r="4" stroke="currentColor" strokeWidth="0.8" fill="currentColor" opacity="0.2" />
      <circle cx="28" cy="28" r="1.5" fill="currentColor" />
    </svg>
  );
}

// ─── Yurung (Swastika / Endless Knot variant) ────────────────────────────────
export function Yurung({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <rect x="8" y="8" width="32" height="32" stroke="currentColor" strokeWidth="1.2" />
      <path d="M24 8 L24 20 L36 20 M24 8 L24 20 M12 24 L24 24 L24 40 M12 24 L24 24 M40 24 L28 24 L28 12 M40 24 L28 24 M24 36 L12 36 L12 24"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// ─── Mandala Band Divider ─────────────────────────────────────────────────────
// A rich horizontal divider with repeating circular mandala motifs.
export function MandalaBand({
  className = 'w-full',
  count = 5,
}: {
  className?: string;
  count?: number;
}) {
  return (
    <div className={`flex items-center gap-0 overflow-hidden ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-current opacity-30" />
      {Array.from({ length: count }).map((_, i) => (
        <MandalaCircle key={i} size={i === Math.floor(count / 2) ? 28 : 20} />
      ))}
      <span className="h-px flex-1 bg-current opacity-30" />
    </div>
  );
}

function MandalaCircle({ size = 24 }: { size?: number }) {
  const r = size / 2;
  const petalCount = 8;
  const petals = Array.from({ length: petalCount }).map((_, i) => {
    const angle = (i * 360) / petalCount;
    const rad = (angle * Math.PI) / 180;
    const x = r + Math.cos(rad) * r * 0.55;
    const y = r + Math.sin(rad) * r * 0.55;
    return `M ${r} ${r} Q ${x + Math.cos(rad + Math.PI / 2) * r * 0.22} ${y + Math.sin(rad + Math.PI / 2) * r * 0.22} ${x} ${y}`;
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
    >
      <circle cx={r} cy={r} r={r - 1} stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
      <circle cx={r} cy={r} r={r * 0.65} stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      {petals.map((d, i) => (
        <path key={i} d={d} stroke="currentColor" strokeWidth="0.6" opacity="0.55" />
      ))}
      <circle cx={r} cy={r} r={r * 0.18} fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// ─── Rich Section Divider (Pigeon's Eye + horizontal rules) ──────────────────
export function BhutanDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-current opacity-25" />
      <MonkeysNail className="h-5 w-5 opacity-50" />
      <PigeonsEye className="h-7 w-7 opacity-75" />
      <MonkeysNail className="h-5 w-5 opacity-50" />
      <span className="h-px flex-1 bg-current opacity-25" />
    </div>
  );
}

// ─── Kemar Band (maroon wall-stripe with gold rule) ───────────────────────────
// Richer version of the plain `.kemar-band` CSS class — adds the textile dot row.
export function KemarBandRich({ className = 'w-full' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <div className="h-1 bg-gold opacity-80" />
      <div className="h-6 bg-maroon relative">
        <TextilePatternBg opacity={0.12} />
      </div>
      <div className="h-1 bg-gold opacity-80" />
    </div>
  );
}
