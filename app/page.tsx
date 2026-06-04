import Image from 'next/image';
import Link from 'next/link';
import StatusChip from '@/components/StatusChip';
import DishCard from '@/components/DishCard';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import MapEmbed from '@/components/MapEmbed';
import { KemarDivider, Momo, Pin, Scooter } from '@/components/Ornaments';
import DrukDragon from '@/components/DrukDragon';
import { TextilePatternBg, BhutanDivider, MandalaBand } from '@/components/BhutanesePatterns';
import { business } from '@/lib/business';
import { formatHour } from '@/lib/hours';
import { signatureDishes } from '@/data/menu';
import { aggregateRating } from '@/data/testimonials';

export default function HomePage() {
  return (
    <>
      {/* ─────────────── HERO ─────────────── */}
      <section className="relative isolate overflow-hidden min-h-[82vh] sm:min-h-[88vh] flex flex-col">
        {/* Real food photo background */}
        <Image
          src="/images/food-platter.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Layered scrim: deep maroon gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-tr from-maroon-deep/95 via-maroon/80 to-maroon-deep/[0.55]" aria-hidden="true" />
        {/* Textile pattern micro-texture over the scrim */}
        <TextilePatternBg className="absolute inset-0 w-full h-full text-saffron" opacity={0.08} />
        {/* Dragon watermark — large, right-aligned */}
        <div className="dragon-watermark right-[-4%] top-[-5%] w-[55%] h-[110%] hidden lg:block text-saffron" aria-hidden="true">
          <DrukDragon variant="full" className="w-full h-full" />
        </div>
        {/* Content */}
        <div className="container-page relative z-10 flex flex-1 flex-col justify-end pb-16 pt-28 text-white sm:pb-24 sm:pt-36">
          <div className="max-w-2xl">
            <StatusChip tone="hero" />
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-[64px] text-balance">
              A little taste of <span className="text-saffron">Bhutan</span> in Mawson.
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/[0.85] sm:text-[19px]">
              {business.tagline}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/book" className="btn-primary bg-saffron !text-maroon-deep hover:bg-gold glow-maroon">
                Book a table
              </Link>
              <Link
                href="/order"
                className="btn-secondary !bg-transparent !text-white !border-white/70 hover:!bg-white hover:!text-maroon"
              >
                <Scooter className="h-4 w-4" /> Order online
              </Link>
            </div>
            <p className="mt-6 text-[13px] uppercase tracking-[0.18em] text-white/60">
              Canberra’s original Bhutanese restaurant · Mawson’s home of momos
            </p>
          </div>
        </div>
        {/* Mandala strip at hero bottom */}
        <div className="relative z-10 py-3 text-gold/60">
          <MandalaBand count={7} className="container-page" />
        </div>
      </section>

      {/* ─────────────── INTRO / STORY STRIP ─────────────── */}
      <section className="section-tight bg-cream/60 bg-textile relative overflow-hidden">
        <div className="container-page relative z-10 grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div>
            <p className="eyebrow">Druk · འབྲུག · Thunder Dragon</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl text-balance">
              Family-run. Handmade. A home away from home.
            </h2>
          </div>
          <div className="flex flex-col items-center gap-3 text-maroon">
            <DrukDragon variant="outline" className="h-20 w-20 text-maroon" />
            <BhutanDivider className="text-maroon" />
          </div>
          <p className="text-[16px] leading-relaxed text-ink-soft">
            We bring you the food we grew up with — pleated <em>momos</em>, smoky{' '}
            <em>ema datshi</em>, slow-cooked <em>paa</em> curries with the warmth
            and chilli of the Himalayan kingdom. Welcome to the family table.
          </p>
        </div>
      </section>

      {/* ─────────────── SIGNATURE DISHES ─────────────── */}
      <section className="section">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">From our kitchen</p>
              <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                Signature dishes
              </h2>
              <p className="mt-2 max-w-xl text-[15px] text-ink-soft">
                A taste of what our regulars come back for. The full menu has 30+ dishes.
              </p>
            </div>
            <Link href="/menu" className="btn-secondary">
              See the full menu
            </Link>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {signatureDishes.map((d) => (
              <li key={d.id} className="animate-fade-up">
                <div className="card-3d"><DishCard item={d} /></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─────────────── RESERVATION BAND ─────────────── */}
      <section className="relative overflow-hidden bg-maroon text-white">
        {/* Textile pattern overlay */}
        <TextilePatternBg className="absolute inset-0 w-full h-full text-saffron" opacity={0.07} />
        {/* Dragon watermark right side */}
        <div className="dragon-watermark-gold right-[-2%] top-[-10%] w-[42%] h-[120%] hidden md:block text-saffron pointer-events-none" aria-hidden="true">
          <DrukDragon variant="full" className="w-full h-full" />
        </div>
        <div className="container-page relative grid items-center gap-8 py-14 sm:py-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow !text-saffron">Reservations</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl text-balance">
              Join us at the Druk family table.
            </h2>
            <p className="mt-3 max-w-xl text-white/[0.85]">
              We take bookings for 1–8 guests. Larger groups and karaoke nights
              are very welcome — just give us a call.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/book" className="btn-primary bg-saffron !text-maroon-deep hover:bg-gold">
                Book a table
              </Link>
              <a href={`tel:${business.phone.e164}`} className="btn-secondary !bg-transparent !text-white !border-white/70 hover:!bg-white hover:!text-maroon">
                Call {business.phone.display}
              </a>
            </div>
          </div>
          <div className="rounded-card bg-white/[0.08] p-6 ring-1 ring-white/20 backdrop-blur-sm flex flex-col gap-4">
            <StatusChip tone="hero" />
            <p className="text-[15px] text-white/[0.85]">
              Open Mon, Wed–Sun 12pm–9pm · Tue 4pm–9pm.
            </p>
            <a href="#hours" className="link-saffron !text-saffron self-start text-[14px]">
              Full opening hours ↓
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────── DELIVERY BAND ─────────────── */}
      <section className="section bg-cream/60">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Delivery & takeaway</p>
              <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                Can’t make it in? Order in.
              </h2>
              <p className="mt-2 max-w-xl text-[15px] text-ink-soft">
                Momos and curries to your door across Canberra via our delivery partners.
              </p>
            </div>
            <Link href="/order" className="btn-secondary">
              Pickup & delivery options
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <a
              href={business.delivery.doordash}
              target="_blank" rel="noopener noreferrer"
              className="card-interactive flex items-center gap-5 p-6 group"
            >
              <span className="grid h-14 w-14 place-items-center rounded-card bg-[#FF3008]/10 text-[#FF3008]">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor"><path d="M2 7h12a6 6 0 0 1 6 6v3a1 1 0 0 1-1 1H2zM2 12h11a3 3 0 0 1 3 3v0H2z"/></svg>
              </span>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold text-maroon">DoorDash</h3>
                <p className="text-[14px] text-ink-soft">Browse our menu and check delivery to your address.</p>
              </div>
              <span className="link-saffron group-hover:after:right-0">Order →</span>
            </a>
            <a
              href={business.delivery.ubereats}
              target="_blank" rel="noopener noreferrer"
              className="card-interactive flex items-center gap-5 p-6 group"
            >
              <span className="grid h-14 w-14 place-items-center rounded-card bg-jade/[0.12] text-jade">
                <Scooter className="h-7 w-7" />
              </span>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold text-maroon">Uber Eats</h3>
                <p className="text-[14px] text-ink-soft">Live tracking and contactless delivery options.</p>
              </div>
              <span className="link-saffron group-hover:after:right-0">Order →</span>
            </a>
          </div>

          <p className="mt-5 text-[13px] text-ink-soft">
            Note: delivery prices and availability are set by the platforms. Weekend
            surcharges, where they apply, are passed on transparently.
          </p>
        </div>
      </section>

      {/* ─────────────── REVIEWS CAROUSEL ─────────────── */}
      <section className="section">
        <div className="container-page max-w-4xl">
          <div className="text-center">
            <p className="eyebrow">Loved by locals</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              {aggregateRating.value.toFixed(1)} from {aggregateRating.count}+ guests
            </h2>
          </div>
          <div className="mt-8"><ReviewsCarousel /></div>
          <div className="mt-6 text-center">
            <Link href="/reviews" className="link-saffron text-[15px]">Read all reviews</Link>
          </div>
        </div>
      </section>

      {/* ─────────────── HOURS + LOCATION ─────────────── */}
      <section id="hours" className="section bg-cream/60">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Find us</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              Swinger Hill Shops, Mawson
            </h2>
            <p className="mt-3 flex items-start gap-2 text-[15px] text-ink-soft">
              <Pin className="mt-0.5 h-4 w-4 text-maroon" />
              {business.address.full}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-1 sm:grid-cols-2">
              {business.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-3 border-b border-hairline py-1.5 text-[14px]">
                  <span className="text-ink-soft">{h.day}</span>
                  <span className="text-ink">{formatHour(h.open)} – {formatHour(h.close)}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={`tel:${business.phone.e164}`} className="btn-primary">Call {business.phone.display}</a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address.full)}`}
                target="_blank" rel="noopener noreferrer" className="btn-secondary"
              >
                Get directions
              </a>
            </div>
          </div>
          <MapEmbed className="min-h-[360px]" />
        </div>
      </section>
    </>
  );
}
