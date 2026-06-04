'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import DishCard from '@/components/DishCard';
import { categories, menu, type Category } from '@/data/menu';
import { Chilli, Leaf } from '@/components/Ornaments';

const spiceOptions = [
  { value: -1, label: 'Any spice' },
  { value: 0, label: 'No spice' },
  { value: 1, label: 'Mild +' },
  { value: 2, label: 'Medium +' },
  { value: 3, label: 'Hot +' },
] as const;

export default function MenuClient() {
  const [query, setQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [minSpice, setMinSpice] = useState<number>(-1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menu.filter((m) => {
      if (vegOnly && !m.vegetarian) return false;
      if (minSpice >= 0 && (m.spice ?? 0) < minSpice) return false;
      if (q && !(m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [query, vegOnly, minSpice]);

  const byCategory = useMemo(() => {
    const map = new Map<Category, typeof menu>();
    for (const c of categories) map.set(c, []);
    for (const item of filtered) map.get(item.category)!.push(item);
    return map;
  }, [filtered]);

  return (
    <>
      {/* Sticky filter bar (sits just under the site header) */}
      <div className="sticky top-[60px] z-20 -mx-5 mb-8 border-b border-hairline bg-parchment/95 px-5 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative flex-1 min-w-[200px]">
            <span className="sr-only">Search the menu</span>
            <input
              type="search"
              placeholder="Search dishes (e.g. ‘momo’, ‘chilli’)…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input pl-10"
            />
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" strokeLinecap="round"/>
            </svg>
          </label>

          <label className="inline-flex items-center gap-2 rounded-pill border border-hairline bg-cream px-3 py-2 text-[13px] text-ink cursor-pointer hover:border-jade">
            <input
              type="checkbox"
              checked={vegOnly}
              onChange={(e) => setVegOnly(e.target.checked)}
              className="accent-jade"
            />
            <Leaf className="h-4 w-4 text-jade" />
            Vegetarian only
          </label>

          <label className="inline-flex items-center gap-2 rounded-pill border border-hairline bg-cream px-3 py-1.5 text-[13px]">
            <Chilli className="h-4 w-4 text-marigold" />
            <span className="sr-only">Minimum spice</span>
            <select
              value={minSpice}
              onChange={(e) => setMinSpice(Number(e.target.value))}
              className="bg-transparent text-[13px] focus:outline-none"
            >
              {spiceOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>

          {(query || vegOnly || minSpice > -1) && (
            <button
              onClick={() => { setQuery(''); setVegOnly(false); setMinSpice(-1); }}
              className="text-[13px] text-maroon hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category quick-jump */}
        <nav className="mt-3 -mx-1 flex gap-1 overflow-x-auto pb-1" aria-label="Menu categories">
          {categories.map((c) => {
            const count = byCategory.get(c)?.length ?? 0;
            return (
              <a
                key={c}
                href={`#${slug(c)}`}
                className="shrink-0 rounded-pill border border-hairline bg-cream px-3 py-1.5 font-display text-[13px] text-maroon hover:bg-maroon hover:text-white"
              >
                {c} <span className="text-[11px] opacity-70">· {count}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {filtered.length === 0 && (
        <div className="card p-10 text-center">
          <p className="font-display text-lg text-maroon">No dishes match those filters.</p>
          <button onClick={() => { setQuery(''); setVegOnly(false); setMinSpice(-1); }} className="link-saffron mt-2">
            Clear filters
          </button>
        </div>
      )}

      {categories.map((c) => {
        const items = byCategory.get(c) ?? [];
        if (items.length === 0) return null;
        return (
          <section key={c} id={slug(c)} className="mb-14 scroll-mt-32">
            <header className="mb-5 flex items-baseline justify-between gap-3 border-b border-hairline pb-3">
              <h2 className="font-display text-2xl font-semibold text-maroon sm:text-[28px]">{c}</h2>
              <span className="text-[12px] uppercase tracking-wider text-ink-soft">{items.length} dishes</span>
            </header>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <li key={item.id}><DishCard item={item} /></li>
              ))}
            </ul>
          </section>
        );
      })}

      <div className="card mt-10 flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
        <div className="flex-1">
          <h3 className="font-display text-lg text-maroon">Prefer to order from home?</h3>
          <p className="text-[14px] text-ink-soft">
            Delivery pricing is set by DoorDash and Uber Eats and may differ from dine-in.
          </p>
        </div>
        <Link href="/order" className="btn-primary">Order online</Link>
      </div>
    </>
  );
}

function slug(c: string) {
  return c.toLowerCase().replace(/[^a-z]+/g, '-');
}
