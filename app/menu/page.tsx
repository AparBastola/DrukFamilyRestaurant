import type { Metadata } from 'next';
import MenuClient from './MenuClient';
import { menu } from '@/data/menu';
import { business, siteUrl } from '@/lib/business';
import { KemarDivider } from '@/components/Ornaments';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    "Authentic Bhutanese dishes — handmade momos, ema datshi, paa curries, bathup, chow mein. Dine-in menu and prices for The Druk Family Restaurant in Mawson, Canberra.",
  alternates: { canonical: `${siteUrl}/menu` },
};

const menuJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: `${business.name} Menu`,
  hasMenuSection: Array.from(
    menu.reduce((acc, m) => {
      acc.set(m.category, [...(acc.get(m.category) ?? []), m]);
      return acc;
    }, new Map<string, typeof menu>()),
  ).map(([cat, items]) => ({
    '@type': 'MenuSection',
    name: cat,
    hasMenuItem: items.map((i) => ({
      '@type': 'MenuItem',
      name: i.name,
      description: i.description,
      offers: { '@type': 'Offer', price: i.price.toFixed(2), priceCurrency: 'AUD' },
      suitableForDiet: i.vegetarian ? 'https://schema.org/VegetarianDiet' : undefined,
    })),
  })),
};

export default function MenuPage() {
  return (
    <>
      <section className="border-b border-hairline bg-cream/50">
        <div className="container-page py-12 sm:py-16 text-center">
          <p className="eyebrow">Our menu</p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl text-balance">
            Hand-pleated, slow-cooked, lovingly fierce.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] text-ink-soft">
            Bhutanese dishes are prepared in the traditional style and can be
            generously spicy. Ask our staff for milder options.
          </p>
          <KemarDivider className="mt-6" />
        </div>
      </section>
      <section className="container-page py-10">
        <MenuClient />
      </section>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
    </>
  );
}
