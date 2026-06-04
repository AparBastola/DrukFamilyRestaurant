import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { business, siteUrl } from '@/lib/business';
import { KemarDivider } from '@/components/Ornaments';
import DrukDragon from '@/components/DrukDragon';
import { TextilePatternBg, BhutanDivider } from '@/components/BhutanesePatterns';

export const metadata: Metadata = {
  title: 'About',
  description:
    "Canberra's first Bhutanese restaurant — family-run, handmade, generous. Meet the Druk family and learn what makes Bhutanese cuisine unique.",
  alternates: { canonical: `${siteUrl}/about` },
};

const cuisine101 = [
  { word: 'Druk', meaning: 'Thunder Dragon — the emblem of Bhutan, and our namesake.' },
  { word: 'Datshi', meaning: 'Cheese, melted with chillies, vegetables or eggs.' },
  { word: 'Ema',  meaning: 'Chilli — the heart of the Bhutanese table.' },
  { word: 'Momo', meaning: 'Hand-pleated dumplings, steamed or fried.' },
  { word: 'Paa',  meaning: 'A slow-cooked, dry-chilli curry.' },
  { word: 'Ezay', meaning: 'A fiery condiment — chilli, tomato, garlic.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-maroon text-white">
        <TextilePatternBg className="absolute inset-0 w-full h-full text-saffron" opacity={0.07} />
        <div className="container-page relative z-10 grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow !text-saffron">Our story</p>
            <h1 className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl text-balance">
              Canberra’s first Bhutanese restaurant — a Mawson family table.
            </h1>
            <p className="mt-5 max-w-xl text-[17px] text-white/[0.85]">
              We opened in Mawson because we missed the food of home. Today,
              ours is the kitchen our regulars say feels like Bhutan — handmade
              momos pleated fresh each morning, smoky ema datshi, and
              slow-simmered paa curries made with love.
            </p>
            <BhutanDivider className="mt-8 text-saffron/60" />
          </div>
          <div className="grid place-items-center">
            <DrukDragon variant="full" className="h-56 w-56 text-saffron drop-shadow-[0_0_30px_rgba(240,165,0,0.35)]" />
          </div>
        </div>
      </section>

      <section className="container-page section grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="eyebrow">The name</p>
          <h2 className="mt-2 font-display text-3xl font-semibold">Druk — འབྲུག — Thunder Dragon</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            Bhutan is <em>Druk Yul</em> — the Land of the Thunder Dragon. The dragon
            isn’t fearsome; it’s the storm before the warm meal, the spark of
            chilli on the tongue, the family table after a long day. That’s the
            spirit we hope you feel when you sit down with us.
          </p>
          <KemarDivider className="my-8 !justify-start" />
          <p className="eyebrow">What we cook</p>
          <h2 className="mt-2 font-display text-3xl font-semibold">A truly Bhutanese kitchen.</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            Bhutanese food is its own thing — bolder than Tibetan, less curried
            than Indian, generous with cheese and unapologetically spicy. Many of
            our regulars are Bhutanese students and families who tell us the
            food “tastes like home.” That’s the highest compliment we know.
          </p>
        </div>

        <div className="card p-7">
          <h3 className="font-display text-xl font-semibold text-maroon">Bhutanese cuisine 101</h3>
          <p className="mt-2 text-[14px] text-ink-soft">A quick glossary for first-timers.</p>
          <dl className="mt-5 divide-y divide-hairline">
            {cuisine101.map((c) => (
              <div key={c.word} className="grid grid-cols-[100px_1fr] gap-4 py-3">
                <dt className="font-display text-[15px] font-semibold text-maroon">{c.word}</dt>
                <dd className="text-[14px] text-ink-soft">{c.meaning}</dd>
              </div>
            ))}
          </dl>
          <Link href="/menu" className="btn-primary mt-6 w-full">See it on the menu</Link>
        </div>
      </section>

      <section className="section bg-cream/60 bg-textile relative overflow-hidden">
        <div className="container-page relative z-10 grid gap-6 md:grid-cols-3">
          {[
            { title: 'Family-run', text: 'A small team of cooks and servers who treat every guest like a relative.' },
            { title: 'Handmade daily', text: 'Momos pleated each morning, chilli-pastes blended in-house.' },
            { title: 'Generously portioned', text: 'Come hungry. Or share. Either way, leave full.' },
          ].map((v) => (
            <div key={v.title} className="card-3d p-6">
              <h3 className="font-display text-lg font-semibold text-maroon">{v.title}</h3>
              <p className="mt-2 text-[14px] text-ink-soft">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Royal visit highlight ── */}
      <section className="section">
        <div className="container-page">
          <div className="overflow-hidden rounded-card border border-gold/40 bg-gradient-to-br from-maroon-deep to-maroon shadow-[0_12px_40px_rgba(90,14,22,0.22)]">
            <div className="grid lg:grid-cols-[1fr_1.1fr]">

              {/* Photo */}
              <div className="relative min-h-[320px] lg:min-h-[440px]">
                <Image
                  src="/images/royal-visit.jpg"
                  alt="The Druk Family Restaurant team with His Majesty the King of Bhutan and Her Majesty the Queen during their visit to Canberra"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* subtle gold vignette on right edge into the text panel */}
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-maroon-deep/60 hidden lg:block" aria-hidden="true" />
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-12">
                {/* decorative top rule */}
                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-gold/40" />
                  <span className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-saffron">
                    A royal occasion
                  </span>
                  <span className="h-px flex-1 bg-gold/40" />
                </div>

                <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl text-balance">
                  Honoured by a visit from Their Majesties.
                </h2>

                <p className="text-[16px] leading-relaxed text-white/[0.85]">
                  We were deeply humbled and overjoyed to welcome His Majesty the
                  King of Bhutan and Her Majesty the Queen to The Druk Family
                  Restaurant during their visit to Canberra. For our family and
                  team, it was a moment of immense pride — a reminder of why we
                  opened our doors and who we cook for.
                </p>

                <p className="text-[15px] italic text-saffron/90">
                  "To cook for the people who carry Bhutan in their hearts — there
                  is no greater honour."
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <span className="h-px w-10 bg-gold/40" />
                  <span className="text-[13px] text-white/60">The Druk Family, Mawson · Canberra</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
