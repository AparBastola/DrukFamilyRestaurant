import { Chilli, Leaf } from './Ornaments';
import { type MenuItem, spiceLabel } from '@/data/menu';

function SpiceMeter({ level }: { level: 0 | 1 | 2 | 3 | 4 }) {
  if (!level) return null;
  return (
    <span className="pill pill-spice" aria-label={`Spice: ${spiceLabel(level)}`}>
      <span className="flex items-center gap-0.5 text-marigold">
        {Array.from({ length: 4 }).map((_, i) => (
          <Chilli
            key={i}
            className={`h-3 w-3 ${i < level ? 'text-marigold' : 'text-marigold/25'}`}
          />
        ))}
      </span>
      <span className="ml-1 hidden sm:inline">{spiceLabel(level)}</span>
    </span>
  );
}

export default function DishCard({ item, compact = false }: { item: MenuItem; compact?: boolean }) {
  return (
    <article className="card-interactive flex h-full flex-col p-5">
      <header className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-[18px] font-semibold text-maroon">
          {item.name}
          {item.national && (
            <span className="ml-2 align-middle pill pill-popular">National dish</span>
          )}
        </h3>
        <span className="shrink-0 font-display text-[16px] font-semibold text-maroon-deep">
          ${item.price.toFixed(2)}
        </span>
      </header>

      {!compact && (
        <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{item.description}</p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {item.vegetarian && (
          <span className="pill pill-veg">
            <Leaf className="h-3 w-3 text-jade" /> Vegetarian
          </span>
        )}
        {item.spice ? <SpiceMeter level={item.spice} /> : null}
        {item.popular && !item.national && (
          <span className="pill pill-popular">Popular</span>
        )}
      </div>
    </article>
  );
}
