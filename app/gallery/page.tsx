import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';
import { business, siteUrl } from '@/lib/business';
import { KemarDivider } from '@/components/Ornaments';

export const metadata: Metadata = {
  title: 'Gallery',
  description: `Dishes and interior of ${business.name} — Bhutanese cuisine in Mawson, Canberra.`,
  alternates: { canonical: `${siteUrl}/gallery` },
};

export default function GalleryPage() {
  return (
    <>
      <section className="border-b border-hairline bg-cream/50">
        <div className="container-page py-12 sm:py-16 text-center">
          <p className="eyebrow">Gallery</p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">A taste in pictures.</h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-ink-soft">
            Placeholder imagery until our food photography lands. Tap any tile to view.
          </p>
          <KemarDivider className="mt-6" />
        </div>
      </section>
      <section className="container-page py-12">
        <GalleryClient />
      </section>
    </>
  );
}
