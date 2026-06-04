import type { Metadata } from 'next';
import { business, siteUrl } from '@/lib/business';
import { aggregateRating, testimonials } from '@/data/testimonials';
import { KemarDivider } from '@/components/Ornaments';

export const metadata: Metadata = {
  title: 'Reviews',
  description: `Read what guests say about ${business.name} — the Bhutanese restaurant in Mawson, Canberra.`,
  alternates: { canonical: `${siteUrl}/reviews` },
};

function Star({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${filled ? 'text-gold' : 'text-hairline'}`} fill="currentColor" aria-hidden="true">
      <path d="M12 2l3 7 7 .6-5.4 4.8L18 22l-6-4-6 4 1.4-7.6L2 9.6 9 9z" />
    </svg>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <section className="border-b border-hairline bg-cream/50">
        <div className="container-page py-12 sm:py-16 text-center">
          <p className="eyebrow">Reviews</p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">What our guests say</h1>
          <div className="mt-5 inline-flex flex-col items-center gap-2 rounded-card border border-hairline bg-cream px-6 py-4 shadow-card">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} filled={i < Math.round(aggregateRating.value)} />)}
            </div>
            <p className="font-display text-2xl font-semibold text-maroon">
              {aggregateRating.value.toFixed(1)}
              <span className="ml-2 text-[14px] font-normal text-ink-soft">from {aggregateRating.count}+ reviews</span>
            </p>
          </div>
          <KemarDivider className="mt-8" />
        </div>
      </section>

      <section className="container-page py-12">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={i} className="card p-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} filled={j < t.rating} />)}
                </div>
                {t.source && (
                  <span className="text-[11px] uppercase tracking-wider text-ink-soft">{t.source}</span>
                )}
              </div>
              <blockquote className="mt-3 text-[15px] leading-relaxed text-ink">“{t.quote}”</blockquote>
              <p className="mt-3 font-display text-[14px] font-semibold text-maroon">— {t.author}</p>
            </li>
          ))}
        </ul>

        <div className="card mt-10 flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
          <div className="flex-1">
            <h2 className="font-display text-xl font-semibold text-maroon">Loved your meal?</h2>
            <p className="text-[14px] text-ink-soft">
              Leave us a review — it really helps a small family restaurant.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={business.socials.google} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Review on Google
            </a>
            <a href={business.socials.facebook} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Review on Facebook
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
