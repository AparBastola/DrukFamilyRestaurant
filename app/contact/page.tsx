import type { Metadata } from 'next';
import MapEmbed from '@/components/MapEmbed';
import ContactForm from './ContactForm';
import { business, siteUrl } from '@/lib/business';
import { Clock, KemarDivider, Phone, Pin } from '@/components/Ornaments';
import { formatHour } from '@/lib/hours';

export const metadata: Metadata = {
  title: 'Contact & find us',
  description: `Visit ${business.name} at ${business.address.full}. Phone ${business.phone.display}.`,
  alternates: { canonical: `${siteUrl}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-hairline bg-cream/50">
        <div className="container-page py-12 sm:py-16 text-center">
          <p className="eyebrow">Contact &amp; find us</p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl text-balance">
            Drop in, call, or write to us.
          </h1>
          <KemarDivider className="mt-6" />
        </div>
      </section>

      <section className="container-page grid gap-8 py-12 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="card p-7">
            <h2 className="font-display text-xl font-semibold text-maroon">Visit us</h2>
            <p className="mt-3 flex items-start gap-2 text-[15px]">
              <Pin className="mt-0.5 h-4 w-4 text-maroon" />
              <span>{business.address.full}</span>
            </p>
            <p className="mt-2 text-[13px] text-ink-soft">
              Located in the Swinger Hill Shops mini-precinct — plenty of free street parking out front.
            </p>
            <p className="mt-4 flex items-center gap-2">
              <Phone className="h-4 w-4 text-maroon" />
              <a href={`tel:${business.phone.e164}`} className="link-saffron">{business.phone.display}</a>
            </p>
            <p className="mt-1 flex items-center gap-2 text-[14px] text-ink-soft">
              <Clock className="h-4 w-4 text-maroon" />
              <span>Open today — see hours below</span>
            </p>
          </div>

          <div className="card p-7">
            <h2 className="font-display text-xl font-semibold text-maroon">Hours</h2>
            <ul className="mt-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
              {business.hours.map((h) => (
                <li key={h.day} className="flex justify-between border-b border-hairline py-1.5 text-[14px]">
                  <span className="text-ink-soft">{h.day}</span>
                  <span className="text-ink">{formatHour(h.open)} – {formatHour(h.close)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[12px] text-ink-soft">Public holidays may vary — please call ahead.</p>
          </div>

          <div className="rounded-card bg-cream p-7 border border-hairline">
            <h2 className="font-display text-xl font-semibold text-maroon">Send us a message</h2>
            <p className="mt-1 text-[14px] text-ink-soft">For general enquiries, group bookings, or feedback.</p>
            <div className="mt-4"><ContactForm /></div>
          </div>
        </div>

        <div className="space-y-4">
          <MapEmbed className="min-h-[420px]" />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address.full)}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-primary w-full"
          >
            Open in Google Maps
          </a>
        </div>
      </section>
    </>
  );
}
