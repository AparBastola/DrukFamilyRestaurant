'use client';

import { useEffect, useState } from 'react';

// Each tile is a self-contained SVG "photo" — a placeholder with a tagged
// caption — so the page looks finished before real photography lands.
// Replace `tiles` with <img src="/images/..." /> entries when photos arrive.
export type Tile = {
  caption: string;
  alt: string;
  // hue + accent let each tile feel distinct.
  hue: string;
  accent: string;
  motif: 'momo' | 'bowl' | 'chilli' | 'plate' | 'tea';
  span?: 'sm' | 'md' | 'lg'; // grid row span
};

const tiles: Tile[] = [
  { caption: 'Beef momos, hand-pleated each morning', alt: 'Steamed beef momos served with ezay', hue: '#7A1620', accent: '#F0A500', motif: 'momo', span: 'lg' },
  { caption: 'Ema Datshi — the national dish',         alt: 'Bowl of ema datshi with melted cheese and green chillies', hue: '#1F6B4F', accent: '#F0A500', motif: 'bowl', span: 'md' },
  { caption: 'Crispy potato chilli',                    alt: 'Crispy potato chilli with sticky sweet glaze', hue: '#E2680B', accent: '#7A1620', motif: 'plate', span: 'sm' },
  { caption: 'Pork ribs paa',                           alt: 'Slow-cooked pork ribs paa with red chilli', hue: '#5A0E16', accent: '#C9A227', motif: 'bowl', span: 'md' },
  { caption: 'Chilli momo platter',                     alt: 'Platter of chilli momos with sauce', hue: '#7A1620', accent: '#F0A500', motif: 'plate', span: 'lg' },
  { caption: 'Bathup — Bhutanese noodle soup',          alt: 'Bowl of bathup noodle soup', hue: '#1D4E89', accent: '#F0A500', motif: 'bowl', span: 'sm' },
  { caption: 'Bhutanese chillies',                      alt: 'Dried red chillies', hue: '#B3261E', accent: '#241A12', motif: 'chilli', span: 'sm' },
  { caption: 'Butter tea, served warm',                 alt: 'A cup of Bhutanese butter tea', hue: '#C9A227', accent: '#7A1620', motif: 'tea', span: 'md' },
  { caption: 'Family kitchen, weekend nights',          alt: 'Warm restaurant interior with prayer flags', hue: '#3a0810', accent: '#F0A500', motif: 'plate', span: 'lg' },
];

function Motif({ kind, accent }: { kind: Tile['motif']; accent: string }) {
  const stroke = accent;
  switch (kind) {
    case 'momo':
      return (
        <g fill="none" stroke={stroke} strokeWidth="2.5">
          <path d="M40 130c0-30 27-55 60-55s60 25 60 55" />
          <path d="M40 130h120" />
          <path d="M60 128c5-22 14-34 40-34s35 12 40 34M80 127c4-18 9-26 20-26s16 8 20 26" />
        </g>
      );
    case 'bowl':
      return (
        <g fill="none" stroke={stroke} strokeWidth="2.5">
          <path d="M30 90h140c0 35-32 60-70 60S30 125 30 90z" />
          <path d="M20 90h160" />
          <path d="M60 70c8-14 18-14 26 0M100 65c8-14 18-14 26 0" />
        </g>
      );
    case 'chilli':
      return (
        <g fill={stroke}>
          <path d="M40 80c0-6 5-12 12-12 4 0 7 2 9 5l60 30c8 4 12 12 12 22 0 14-12 26-26 26-9 0-17-4-21-12l-32-58c-5-1-14-3-14-1z" />
        </g>
      );
    case 'tea':
      return (
        <g fill="none" stroke={stroke} strokeWidth="2.5">
          <path d="M50 90h90v30c0 16-12 28-28 28h-34c-16 0-28-12-28-28V90z" />
          <path d="M140 100h12c8 0 12 6 12 14s-6 14-14 14h-10" />
          <path d="M75 70c0-6 4-10 4-14s-6-6-6-10M95 70c0-6 4-10 4-14s-6-6-6-10M115 70c0-6 4-10 4-14s-6-6-6-10" />
        </g>
      );
    case 'plate':
    default:
      return (
        <g fill="none" stroke={stroke} strokeWidth="2.5">
          <circle cx="100" cy="110" r="60" />
          <circle cx="100" cy="110" r="44" />
          <path d="M80 105c6-8 14-8 20 0s14 8 20 0" />
        </g>
      );
  }
}

function Tile({ tile, onClick }: { tile: Tile; onClick: () => void }) {
  const spanCls =
    tile.span === 'lg' ? 'row-span-2 min-h-[360px]'
    : tile.span === 'md' ? 'min-h-[260px]'
    : 'min-h-[200px]';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-card border border-hairline shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover ${spanCls}`}
      aria-label={tile.alt}
    >
      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={`g-${tile.motif}-${tile.hue}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor={tile.hue} />
            <stop offset="1" stopColor="#241A12" />
          </linearGradient>
          <pattern id={`p-${tile.motif}-${tile.hue}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill={tile.accent} opacity=".18" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill={`url(#g-${tile.motif}-${tile.hue})`} />
        <rect width="200" height="200" fill={`url(#p-${tile.motif}-${tile.hue})`} />
        <Motif kind={tile.motif} accent={tile.accent} />
      </svg>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon-deep/[0.85] via-maroon-deep/30 to-transparent p-4 text-left">
        <p className="font-display text-[14px] font-medium text-white">{tile.caption}</p>
      </div>
      <span className="absolute right-3 top-3 rounded-pill bg-white/[0.15] px-2 py-1 text-[10px] uppercase tracking-wider text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
        View
      </span>
    </button>
  );
}

export default function GalleryClient() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') setActive((i) => ((i ?? 0) + 1) % tiles.length);
      if (e.key === 'ArrowLeft')  setActive((i) => ((i ?? 0) - 1 + tiles.length) % tiles.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <>
      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {tiles.map((t, i) => (
          <Tile key={i} tile={t} onClick={() => setActive(i)} />
        ))}
      </div>

      {active !== null && (
        <div
          role="dialog" aria-modal="true" aria-label={tiles[active].alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-maroon-deep/90 p-4"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close" onClick={() => setActive(null)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round"/></svg>
          </button>
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label="Previous" onClick={(e) => { e.stopPropagation(); setActive((i) => ((i ?? 0) - 1 + tiles.length) % tiles.length); }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="relative max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden rounded-card">
              <svg viewBox="0 0 800 500" className="h-auto w-full">
                <defs>
                  <linearGradient id="lb" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor={tiles[active].hue} />
                    <stop offset="1" stopColor="#241A12" />
                  </linearGradient>
                </defs>
                <rect width="800" height="500" fill="url(#lb)" />
                <g transform="translate(300,150) scale(1)">
                  <Motif kind={tiles[active].motif} accent={tiles[active].accent} />
                </g>
              </svg>
            </div>
            <p className="mt-3 text-center font-display text-white">{tiles[active].caption}</p>
          </div>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label="Next" onClick={(e) => { e.stopPropagation(); setActive((i) => ((i ?? 0) + 1) % tiles.length); }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      )}
    </>
  );
}
