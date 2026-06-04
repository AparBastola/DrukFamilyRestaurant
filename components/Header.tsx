'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import StatusChip from './StatusChip';
import { business } from '@/lib/business';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/book', label: 'Reservations' },
  { href: '/order', label: 'Order' },
  { href: '/about', label: 'About' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <div className="kemar-band" aria-hidden="true" />
      <div
        className={`bg-parchment/95 backdrop-blur transition-shadow ${
          scrolled ? 'shadow-[0_4px_20px_rgba(90,14,22,0.06)]' : ''
        }`}
      >
        <div className="container-page flex items-center gap-4 py-3">
          <Link href="/" className="flex items-center gap-3" aria-label={`${business.name} home`}>
            <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full ring-1 ring-hairline shadow-card bg-cream">
              <Image
                src="/images/logo.jpg"
                alt=""
                width={64}
                height={64}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-[22px] font-semibold text-maroon">The Druk Family</span>
              <span className="font-body text-[12px] uppercase tracking-[0.18em] text-ink-soft">
                Restaurant · Mawson
              </span>
            </span>
          </Link>

          <nav className="ml-auto hidden lg:flex items-center gap-1" aria-label="Primary">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-control px-3 py-2 font-display text-[14px] font-medium transition-colors ${
                    active
                      ? 'text-maroon bg-cream'
                      : 'text-ink hover:text-maroon hover:bg-cream/70'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto lg:ml-3 hidden md:flex items-center gap-2">
            <StatusChip />
            <Link href="/book" className="btn-secondary !py-2 !px-4 text-[14px]">Book a table</Link>
            <Link href="/order" className="btn-primary !py-2 !px-4 text-[14px]">Order online</Link>
          </div>

          <button
            type="button"
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-control border border-hairline bg-cream text-maroon md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-hairline bg-parchment">
            <div className="container-page py-3">
              <div className="mb-3 flex items-center justify-between">
                <StatusChip />
                <a href={`tel:${business.phone.e164}`} className="link-saffron text-[14px]">
                  {business.phone.display}
                </a>
              </div>
              <ul className="grid grid-cols-2 gap-1">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-control px-3 py-2.5 font-display text-[15px] ${
                        pathname === item.href
                          ? 'bg-maroon text-white'
                          : 'bg-cream text-ink hover:bg-cream/80'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link href="/book" className="btn-secondary">Book</Link>
                <Link href="/order" className="btn-primary">Order</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
