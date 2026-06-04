import Link from 'next/link';
import { business } from '@/lib/business';
import { Clock, Phone, Pin } from './Ornaments';
import StatusChip from './StatusChip';
import DrukDragon from './DrukDragon';
import { TextilePatternBg, MandalaBand } from './BhutanesePatterns';
import { formatHour } from '@/lib/hours';

export default function Footer() {
  return (
    <footer className="mt-16 bg-maroon-deep text-white/90 relative overflow-hidden">
      {/* Textile micro-texture */}
      <TextilePatternBg className="absolute inset-0 w-full h-full text-saffron" opacity={0.05} />
      {/* Dragon watermark — centred behind content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <DrukDragon variant="full" className="w-[70%] max-w-2xl opacity-[0.06] text-saffron" />
      </div>
      <div className="kemar-band relative z-10" aria-hidden="true" />
      <div className="container-page relative z-10 grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-cream">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.jpg" alt="" className="h-full w-full object-cover" />
            </span>
            <div className="leading-tight">
              <div className="font-display text-[17px] font-semibold text-white">The Druk Family</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-saffron/90">Restaurant</div>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-[14px] text-white/75">
            {business.tagline}
          </p>
          <div className="mt-4"><StatusChip /></div>
        </div>

        <div>
          <h3 className="font-display text-[14px] font-semibold uppercase tracking-[0.18em] text-saffron">
            Visit
          </h3>
          <p className="mt-3 flex items-start gap-2 text-[14px] text-white/[0.85]">
            <Pin className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
            <span>{business.address.full}</span>
          </p>
          <p className="mt-2 flex items-center gap-2 text-[14px]">
            <Phone className="h-4 w-4 text-saffron" />
            <a href={`tel:${business.phone.e164}`} className="hover:text-saffron">
              {business.phone.display}
            </a>
          </p>
        </div>

        <div>
          <h3 className="font-display text-[14px] font-semibold uppercase tracking-[0.18em] text-saffron">
            Hours
          </h3>
          <ul className="mt-3 space-y-1 text-[14px] text-white/[0.85]">
            {business.hours.map((h) => (
              <li key={h.day} className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-saffron/80" />
                <span className="w-24 text-white/95">{h.day}</span>
                <span>{formatHour(h.open)} – {formatHour(h.close)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[12px] text-white/55">Public holidays may differ.</p>
        </div>

        <div>
          <h3 className="font-display text-[14px] font-semibold uppercase tracking-[0.18em] text-saffron">
            Explore
          </h3>
          <ul className="mt-3 grid grid-cols-2 gap-y-1 text-[14px]">
            {[
              ['/menu', 'Menu'],
              ['/book', 'Book a table'],
              ['/order', 'Order online'],
              ['/about', 'About'],
              ['/reviews', 'Reviews'],
              ['/gallery', 'Gallery'],
              ['/contact', 'Contact'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-white/80 hover:text-saffron">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3 text-[13px]">
            <a
              href={business.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-3 py-1 hover:border-saffron hover:text-saffron"
            >
              Facebook
            </a>
            <a
              href={business.socials.google}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-3 py-1 hover:border-saffron hover:text-saffron"
            >
              Google
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 px-5">
        <MandalaBand count={9} className="py-3 text-saffron/40" />
      </div>
      <div className="relative z-10 border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-4 text-[12px] text-white/55 md:flex-row">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <p>
            Built with care in Canberra ·{' '}
            <Link href="/contact" className="hover:text-saffron">Contact</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
