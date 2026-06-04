'use client';

import { useEffect, useRef, useState } from 'react';
import { testimonials } from '@/data/testimonials';

function Star({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${filled ? 'text-gold' : 'text-hairline'}`} fill="currentColor" aria-hidden="true">
      <path d="M12 2l3 7 7 .6-5.4 4.8L18 22l-6-4-6 4 1.4-7.6L2 9.6 9 9z" />
    </svg>
  );
}

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, []);

  const t = testimonials[index];

  return (
    <div className="relative">
      <div className="card p-8 sm:p-10 text-center">
        <div className="flex justify-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} filled={i < t.rating} />)}
        </div>
        <blockquote className="mt-5 font-display text-[22px] leading-snug text-ink sm:text-[26px] text-balance">
          “{t.quote}”
        </blockquote>
        <p className="mt-4 text-[14px] text-ink-soft">
          — <span className="font-semibold text-maroon">{t.author}</span>
          {t.source && <span className="ml-1 text-ink-soft/70">on {t.source}</span>}
        </p>
      </div>
      <div className="mt-5 flex items-center justify-center gap-2" role="tablist" aria-label="Reviews">
        {testimonials.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            aria-label={`Review ${i + 1} of ${testimonials.length}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'w-8 bg-maroon' : 'w-2 bg-hairline hover:bg-maroon/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
