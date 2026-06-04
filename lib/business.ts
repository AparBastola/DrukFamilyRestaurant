// Single source of truth for the business's NAP, hours, links, and constants.
// Edit here to update across the entire site.

export const business = {
  name: 'The Druk Family Restaurant',
  shortName: 'Druk Family',
  tagline:
    'Thousands of miles away from home, we want to bring you a little closer to Home — Bhutan.',
  description:
    "Canberra's original authentic Bhutanese restaurant, family-run in Mawson — handmade momos, ema datshi, paa curries.",
  cuisine: 'Bhutanese',
  priceRange: '$$',
  address: {
    street: 'Shop 15/84 Ainsworth St',
    locality: 'Swinger Hill Shops, Mawson',
    region: 'ACT',
    postcode: '2607',
    country: 'AU',
    full: 'Shop 15/84 Ainsworth St, Swinger Hill Shops, Mawson ACT 2607, Australia',
  },
  geo: { latitude: -35.367, longitude: 149.097 }, // approx Mawson, ACT
  phone: {
    display: '(02) 6284 2970',
    e164: '+61262842970',
  },
  email: 'hello@drukfamily.com.au', // [PLACEHOLDER] — replace with real address
  socials: {
    facebook:
      'https://www.facebook.com/p/The-Druk-Family-Restaurant-100077355498867/',
    instagram: '#', // [PLACEHOLDER]
    google: '#', // [PLACEHOLDER — Google Business URL]
  },
  delivery: {
    // [PLACEHOLDER URLs] — replace with official storefront links from the platforms
    doordash: 'https://www.doordash.com/search/store/druk%20family/',
    ubereats: 'https://www.ubereats.com/au/search?q=druk%20family',
  },
  reservations: {
    maxPartySize: 8, // groups larger than this are routed to a phone call
    advanceDays: 60,
    slotMinutes: 30,
    closeBufferMinutes: 30, // last booking accepted = close - buffer
  },
  // Hours follow Australia/Sydney. Order matches JS Date.getDay() (0 = Sun).
  hours: [
    { day: 'Sunday',    open: '12:00', close: '21:00' }, // 0
    { day: 'Monday',    open: '12:00', close: '21:00' }, // 1
    { day: 'Tuesday',   open: '16:00', close: '21:00' }, // 2
    { day: 'Wednesday', open: '12:00', close: '21:00' }, // 3
    { day: 'Thursday',  open: '12:00', close: '21:00' }, // 4
    { day: 'Friday',    open: '12:00', close: '21:00' }, // 5
    { day: 'Saturday',  open: '12:00', close: '21:00' }, // 6
  ],
  timezone: 'Australia/Sydney',
} as const;

export type Hours = (typeof business.hours)[number];

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://drukfamily.com.au';
