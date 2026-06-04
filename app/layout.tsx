import type { Metadata } from 'next';
import { Poppins, Sintony } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileActionBar from '@/components/MobileActionBar';
import { business, siteUrl } from '@/lib/business';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600'],
  display: 'swap',
  variable: '--font-display',
});

const sintony = Sintony({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} — Authentic Bhutanese in Mawson, Canberra`,
    template: `%s · ${business.shortName}`,
  },
  description: business.description,
  applicationName: business.name,
  keywords: [
    'Bhutanese restaurant Canberra',
    'Mawson restaurant',
    'momo Canberra',
    'ema datshi',
    'authentic Bhutanese',
    'Druk Family',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: siteUrl,
    siteName: business.name,
    title: `${business.name} — Authentic Bhutanese in Mawson`,
    description: business.description,
    images: [{ url: '/images/logo.jpg', width: 1200, height: 630, alt: business.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: business.name,
    description: business.description,
    images: ['/images/logo.jpg'],
  },
  icons: {
    icon: [{ url: '/images/logo.jpg' }],
    apple: [{ url: '/images/logo.jpg' }],
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
};

const restaurantJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: business.name,
  description: business.description,
  url: siteUrl,
  telephone: business.phone.e164,
  servesCuisine: business.cuisine,
  priceRange: business.priceRange,
  acceptsReservations: true,
  image: `${siteUrl}/images/logo.jpg`,
  sameAs: [business.socials.facebook],
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: business.address.locality,
    addressRegion: business.address.region,
    postalCode: business.address.postcode,
    addressCountry: business.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: business.geo.latitude,
    longitude: business.geo.longitude,
  },
  openingHoursSpecification: business.hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: `https://schema.org/${h.day}`,
    opens: h.open,
    closes: h.close,
  })),
  menu: `${siteUrl}/menu`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${poppins.variable} ${sintony.variable}`}>
      <body className="bg-paper-grain min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-control focus:bg-maroon focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <MobileActionBar />
        {/* Pad the page so the floating mobile action bar never covers content */}
        <div className="h-16 md:hidden" aria-hidden="true" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
      </body>
    </html>
  );
}
