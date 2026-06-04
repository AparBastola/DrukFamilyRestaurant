// SVG-only hero backdrop — no external image required.
// Renders a warm, layered "Bhutanese hills + dragon clouds" composition so the
// site looks production-ready before real photography lands.

export default function HeroBackdrop() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 720"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#5A0E16" />
          <stop offset=".55" stopColor="#7A1620" />
          <stop offset="1" stopColor="#4a0b12" />
        </linearGradient>
        <radialGradient id="sun" cx=".75" cy=".25" r=".4">
          <stop offset="0" stopColor="#F0A500" stopOpacity=".75" />
          <stop offset="1" stopColor="#F0A500" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hill1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3a0810" />
          <stop offset="1" stopColor="#2a0509" />
        </linearGradient>
        <linearGradient id="hill2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#5A0E16" />
          <stop offset="1" stopColor="#3a0810" />
        </linearGradient>
        <pattern id="cloudKnot" width="240" height="160" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#C9A227" strokeOpacity=".11" strokeWidth="1.5">
            <path d="M40 40c10-20 40-20 50 0s-20 30-25 50 25 30 35 10" />
            <circle cx="160" cy="60" r="14" />
            <path d="M170 100c10 0 18 8 18 18s-8 18-18 18-18-8-18-18" />
          </g>
        </pattern>
      </defs>

      <rect width="1440" height="720" fill="url(#sky)" />
      <rect width="1440" height="720" fill="url(#sun)" />
      <rect width="1440" height="720" fill="url(#cloudKnot)" />

      {/* Distant Himalayan silhouette */}
      <path d="M0 470 L120 380 L240 440 L360 360 L480 430 L620 340 L760 410 L900 350 L1040 420 L1180 360 L1320 420 L1440 380 L1440 720 L0 720Z"
        fill="url(#hill2)" opacity=".85" />
      {/* Foreground hill */}
      <path d="M0 560 L160 500 L320 550 L480 480 L640 540 L800 490 L960 545 L1120 495 L1280 555 L1440 510 L1440 720 L0 720Z"
        fill="url(#hill1)" />

      {/* Subtle decorative bottom band echoing the kemar */}
      <rect x="0" y="700" width="1440" height="6" fill="#C9A227" opacity=".5" />
    </svg>
  );
}
