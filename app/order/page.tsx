import type { Metadata } from 'next';
import { business, siteUrl } from '@/lib/business';
import { KemarDivider, Phone, Pin, Scooter } from '@/components/Ornaments';

export const metadata: Metadata = {
  title: 'Order online',
  description:
    `Order Bhutanese momos, ema datshi and more from ${business.name} via DoorDash or Uber Eats. Pickup available — call ${business.phone.display}.`,
  alternates: { canonical: `${siteUrl}/order` },
};

const partners = [
  {
    key: 'doordash',
    name: 'DoorDash',
    url: business.delivery.doordash,
    blurb: 'Browse the menu, schedule a delivery window, or pick up.',
    accent: 'bg-[#FF3008]',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="currentColor">
        <path d="M2 7h12a6 6 0 0 1 6 6v3a1 1 0 0 1-1 1H2zM2 12h11a3 3 0 0 1 3 3v0H2z"/>
      </svg>
    ),
  },
  {
    key: 'ubereats',
    name: 'Uber Eats',
    url: business.delivery.ubereats,
    blurb: 'Live tracking, ratings and contactless delivery.',
    accent: 'bg-jade',
    icon: <Scooter className="h-8 w-8 text-white" />,
  },
];

export default function OrderPage() {
  return (
    <>
      <section className="border-b border-hairline bg-cream/50">
        <div className="container-page py-12 sm:py-16 text-center">
          <p className="eyebrow">Order in</p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl text-balance">
            Momos to your door across Canberra.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] text-ink-soft">
            Choose your delivery partner. Prices and availability are set by them — we keep things honest about that below.
          </p>
          <KemarDivider className="mt-6" />
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {partners.map((p) => (
            <a
              key={p.key}
              href={p.url}
              target="_blank" rel="noopener noreferrer"
              data-analytics-event="order_outbound"
              data-analytics-partner={p.key}
              className="card-interactive flex flex-col p-7 group"
            >
              <div className="flex items-center gap-4">
                <span className={`grid h-14 w-14 place-items-center rounded-card ${p.accent}`}>{p.icon}</span>
                <h2 className="font-display text-2xl font-semibold text-maroon">{p.name}</h2>
              </div>
              <p className="mt-4 text-[15px] text-ink-soft">{p.blurb}</p>
              <p className="mt-auto pt-6">
                <span className="btn-primary group-hover:bg-maroon-deep">Order on {p.name} ↗</span>
              </p>
            </a>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="card p-7">
            <h2 className="font-display text-xl font-semibold text-maroon">Pickup &amp; phone orders</h2>
            <p className="mt-2 text-[15px] text-ink-soft">
              Prefer to skip the platform fees? Call us — most orders are ready in 20–30 minutes.
            </p>
            <a href={`tel:${business.phone.e164}`} className="btn-secondary mt-4">
              <Phone className="h-4 w-4" /> {business.phone.display}
            </a>
            <p className="mt-3 flex items-start gap-2 text-[13px] text-ink-soft">
              <Pin className="mt-0.5 h-4 w-4 text-maroon" /> {business.address.full}
            </p>
          </div>

          <div className="rounded-card border border-saffron/30 bg-saffron/[0.08] p-7">
            <h2 className="font-display text-xl font-semibold text-maroon-deep">A note on delivery pricing</h2>
            <p className="mt-2 text-[15px] text-ink-soft">
              Menu prices and item availability on DoorDash and Uber Eats are set by the platforms and may differ from dine-in.
              Any weekend surcharge applies (consistent with what you’d see in-restaurant on Saturdays/Sundays); the platforms
              will show it in your basket before you check out. We mention it up-front because we’d rather you knew.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
