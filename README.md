# The Druk Family Restaurant — Website

Production-ready marketing + ordering site for **The Druk Family Restaurant** in
Mawson, Canberra. Built with **Next.js 14 (App Router) · React 18 · Tailwind ·
TypeScript**, static-first and SEO-optimised, with an accessible booking widget,
delivery deep-links to DoorDash / Uber Eats, and a fully tokenised Bhutanese
visual system.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the built site
```

Requires Node 18.17+.

---

## Project layout

```
app/                       # App Router pages
  layout.tsx               # Fonts, metadata, JSON-LD, Header/Footer
  page.tsx                 # Home
  menu/                    # Menu page (filters, search, category jump)
  book/                    # Reservations page + BookingWidget
  order/                   # DoorDash + Uber Eats deep-link cards
  about/   reviews/        # Brand story, testimonials
  gallery/ contact/        # Lightbox gallery, contact form
  sitemap.ts  robots.ts       # Generated /sitemap.xml + /robots.txt

components/                # Reusable UI (Header, Footer, DishCard, …)
data/                      # menu.ts, testimonials.ts (seed content)
lib/                       # business.ts, hours.ts, reservations.ts (adapter)
public/images/logo.jpg     # Brand logo (swap with a vectorised version)
```

---

## What's wired vs. what needs your input

The site ships demo-ready. Everywhere a real value is needed, you'll find a
`[PLACEHOLDER]` comment. The big ones:

| What | Where | How to swap |
| --- | --- | --- |
| **DoorDash store URL** | `lib/business.ts` → `delivery.doordash` | Paste the official Druk Family DoorDash listing URL |
| **Uber Eats store URL** | `lib/business.ts` → `delivery.ubereats` | Paste the official listing URL |
| **Logo** | `public/images/logo.jpg` | Replace with vectorised SVG (recommended) or hi-res PNG |
| **Food / interior photos** | `app/gallery/GalleryClient.tsx` | Replace `tiles[]` with `<img src="/images/…" />` entries |
| **Email + contact endpoint** | `lib/business.ts` (`email`) · `NEXT_PUBLIC_CONTACT_ENDPOINT` | Set to a Formspree / Web3Forms URL. Unset = mailto fallback. |
| **Reservations endpoint** | `NEXT_PUBLIC_RESERVATIONS_ENDPOINT` | Same — third-party form handler, or mailto fallback. |
| **Reservations backend** | `lib/reservations.ts` | See *Swappable reservations* below |
| **Google rating + count** | `data/testimonials.ts` → `aggregateRating` | Update manually or wire to Google Places API |
| **Site URL** | `NEXT_PUBLIC_SITE_URL` env var | Set in `.env.production.local` before deploy |

---

## Brand / design tokens

All colours, fonts, radii and shadows are exposed as CSS custom properties in
`app/globals.css` and mirrored as Tailwind theme tokens in `tailwind.config.ts`.

```
maroon         #7A1620   maroon-deep    #5A0E16
saffron        #F0A500   marigold       #E2680B
gold           #C9A227   jade           #1F6B4F   lapis  #1D4E89
parchment(bg)  #FBF4E6   cream(card)    #FFFDF7
ink            #241A12   ink-soft       #5A4D40   hairline #E7DCC4

radius: control 8px · card 12px · pill 999px
shadow-card: 0 6px 20px rgba(90,14,22,.08)
```

Re-theming = edit `globals.css` + `tailwind.config.ts`.

Typography uses Google Fonts via `next/font` (zero-FOIT, no privacy leakage):
**Poppins 500/600** for display, **Sintony 400/700** for body.

---

## Forms (contact + reservations)

Because the site is statically exported for GitHub Pages, there's no server to
receive form posts. Two options:

1. **Plug in a third-party form handler** — sign up for
   [Formspree](https://formspree.io), [Web3Forms](https://web3forms.com) or
   similar, then set in your repo:
   - **Settings → Secrets and variables → Actions → Variables**
     - `CONTACT_ENDPOINT` = your contact form URL
     - `RESERVATIONS_ENDPOINT` = your reservations form URL
   The deploy workflow injects these as `NEXT_PUBLIC_CONTACT_ENDPOINT` /
   `NEXT_PUBLIC_RESERVATIONS_ENDPOINT` at build time.

2. **Do nothing** — if the env vars are unset, both forms open the visitor's
   email client with their submission pre-filled (`mailto:`). The restaurant
   then confirms by phone or email. Lower fidelity, zero setup.

Client-side validation (AU phone, email, opening hours) still runs either way.

---

## Accessibility & performance

- WCAG 2.1 AA-friendly: semantic landmarks, visible focus rings, `aria-*` on the
  booking widget, icon + text for spice / vegetarian (never colour-only),
  `prefers-reduced-motion` respected.
- Live Open/Closed chip computed in `Australia/Sydney` regardless of visitor
  timezone (`lib/hours.ts`).
- Fonts self-hosted via `next/font` with `display: swap`; images configured for
  AVIF/WebP via `next.config.mjs`.
- All marketing pages are statically rendered.

---

## SEO

- `Restaurant` JSON-LD with address, geo, hours, telephone, `acceptsReservations`,
  `priceRange`, `sameAs` — wired in `app/layout.tsx`.
- `Menu` / `MenuSection` / `MenuItem` JSON-LD on `/menu`.
- Per-page `<title>` / description / canonical via the App Router Metadata API.
- Open Graph + Twitter card.
- `sitemap.xml` and `robots.txt` auto-generated.

Set `NEXT_PUBLIC_SITE_URL=https://drukfamily.com.au` (or your real domain)
before deploying so canonical URLs and JSON-LD point at the right host.

---

## Deploying to GitHub Pages

This repo ships with a GitHub Actions workflow at
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) that builds the
static site (`next build` with `output: 'export'`) and deploys it to GitHub
Pages on every push to `main`.

**One-time setup**

1. Push the repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. (Optional) **Settings → Secrets and variables → Actions → Variables** —
   add:
   - `SITE_URL` — e.g. `https://drukfamily.com.au` (used for canonical URLs,
     OG tags, JSON-LD). Skip for a `*.github.io` URL.
   - `CONTACT_ENDPOINT` / `RESERVATIONS_ENDPOINT` — see *Forms* above.
4. Push to `main`. The workflow runs, builds, and publishes.

**Base path handling**

GitHub Pages serves project repos under `https://<user>.github.io/<repo>/`. The
workflow auto-detects the repo name and passes it as `NEXT_PUBLIC_BASE_PATH`
so all internal links + asset URLs resolve correctly. For a user/org page
(`<user>.github.io`) or a custom domain, the base path is empty automatically.

**Custom domain**

Add a `public/CNAME` file containing your domain (e.g. `drukfamily.com.au`),
then point a DNS `CNAME` record at `<user>.github.io`. GitHub Pages will pick
it up. Also set the `SITE_URL` variable to the custom domain.

**Local build**

```bash
NEXT_PUBLIC_SITE_URL=https://drukfamily.com.au npm run build
npx serve out   # preview the static export
```

---

## License

Custom build for The Druk Family Restaurant. All rights reserved.
