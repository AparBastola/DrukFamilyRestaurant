import type { Metadata } from 'next';
import BookingWidget from './BookingWidget';
import { business, siteUrl } from '@/lib/business';
import { KemarDivider, Phone } from '@/components/Ornaments';

export const metadata: Metadata = {
  title: 'Reservations',
  description:
    `Reserve your table at ${business.name} in Mawson, Canberra. Open Mon, Wed–Sun 12pm–9pm; Tuesdays 4pm–9pm. Larger groups please call.`,
  alternates: { canonical: `${siteUrl}/book` },
};

export default function BookPage() {
  return (
    <>
      <section className="border-b border-hairline bg-cream/50">
        <div className="container-page py-12 sm:py-16 text-center">
          <p className="eyebrow">Reservations</p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl text-balance">
            Reserve your seat at the Druk family table.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] text-ink-soft">
            Bookings for 1–{business.reservations.maxPartySize} guests. Larger
            groups (and karaoke nights) — please call us.
          </p>
          <KemarDivider className="mt-6" />
        </div>
      </section>

      <section className="container-page grid gap-8 py-12 lg:grid-cols-[1.4fr_1fr]">
        <BookingWidget />

        <aside className="space-y-5">
          <div className="card p-6">
            <h2 className="font-display text-lg font-semibold text-maroon">A few things to know</h2>
            <ul className="mt-3 space-y-2 text-[14px] text-ink-soft">
              <li>• Last bookings are accepted up to 30 minutes before close.</li>
              <li>• High chairs and gluten-free options available — ask in the special-requests box.</li>
              <li>• Confirmations are sent to your phone & email within seconds.</li>
              <li>• Walk-ins welcome subject to availability.</li>
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="font-display text-lg font-semibold text-maroon">Prefer to call?</h2>
            <p className="mt-2 text-[14px] text-ink-soft">We answer during opening hours — Mon &amp; Wed–Sun from 12pm, Tue from 4pm.</p>
            <a href={`tel:${business.phone.e164}`} className="btn-primary mt-4 w-full">
              <Phone className="h-4 w-4" /> {business.phone.display}
            </a>
          </div>
          <div className="rounded-card bg-saffron/[0.14] p-6">
            <h2 className="font-display text-lg font-semibold text-maroon-deep">Big celebration?</h2>
            <p className="mt-2 text-[14px] text-ink-soft">
              We host birthdays, work parties and karaoke nights. Call us to plan a private set-menu — we can spice things up (or down).
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
