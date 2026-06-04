import Link from 'next/link';
import { business } from '@/lib/business';
import { Phone, Scooter } from './Ornaments';

// Floating Call · Book · Order bar pinned to the bottom on small screens.
// Hidden on md+ where the header already has the same CTAs.
export default function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-3 z-30 px-3 md:hidden">
      <div className="mx-auto flex max-w-md items-stretch gap-1 rounded-pill border border-hairline bg-cream/95 p-1 shadow-card backdrop-blur">
        <a
          href={`tel:${business.phone.e164}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-pill px-3 py-2.5 font-display text-[13px] font-medium text-maroon hover:bg-parchment"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <Link
          href="/book"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-pill px-3 py-2.5 font-display text-[13px] font-medium text-maroon hover:bg-parchment"
        >
          Book
        </Link>
        <Link
          href="/order"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-pill bg-maroon px-3 py-2.5 font-display text-[13px] font-medium text-white"
        >
          <Scooter className="h-4 w-4" /> Order
        </Link>
      </div>
    </div>
  );
}
