import Link from 'next/link';
import { DragonMark } from '@/components/Ornaments';

export default function NotFound() {
  return (
    <section className="container-page py-20 text-center">
      <DragonMark className="mx-auto h-20 w-20 text-maroon" />
      <h1 className="mt-6 font-display text-4xl font-semibold">Page not found</h1>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">
        The dragon flew off with this page. Try our menu, book a table, or head home.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Back home</Link>
        <Link href="/menu" className="btn-secondary">See the menu</Link>
      </div>
    </section>
  );
}
