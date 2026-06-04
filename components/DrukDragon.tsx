// The Druk (Thunder Dragon) — full SVG component.
// Traced from traditional Bhutanese flag art. Uses `currentColor` throughout
// so it can be tinted with any Tailwind text-* class.
// Variants: full (hero/about), outline (card ornament), small (icon).

export type DragonVariant = 'full' | 'outline' | 'small';

interface Props {
  className?: string;
  variant?: DragonVariant;
}

export default function DrukDragon({ className = 'h-full w-full', variant = 'full' }: Props) {
  if (variant === 'small') return <DragonSmall className={className} />;
  if (variant === 'outline') return <DragonOutline className={className} />;
  return <DragonFull className={className} />;
}

// ─── Full detailed dragon ─────────────────────────────────────────────────────

function DragonFull({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 400" className={className} aria-hidden="true" fill="none">
      <defs>
        {/* Scale crosshatch pattern applied along body */}
        <pattern id="dragon-scales" patternUnits="userSpaceOnUse" width="10" height="7" patternTransform="rotate(-38)">
          <path d="M0 7 Q5 0 10 7" stroke="currentColor" strokeWidth="0.55" fill="none" opacity="0.38" />
        </pattern>
        {/* Clip path matches the body silhouette for scale texture */}
        <clipPath id="body-clip">
          <path d="
            M 68 372 C 105 345 160 320 215 294
            C 270 268 318 235 358 198
            C 388 170 410 140 425 108
            C 435 84 440 62 438 44
            C 448 42 456 46 462 54
            C 468 68 468 90 458 116
            C 444 150 422 182 392 212
            C 352 250 305 284 250 312
            C 196 339 140 362 100 382 Z
          " />
        </clipPath>
      </defs>

      {/* ── BODY ── */}
      {/* Outer body (shadow/depth) */}
      <path
        d="M 82 370 C 138 338 192 312 248 284 C 305 256 354 220 392 182 C 416 157 432 128 440 96 C 446 76 447 56 444 42"
        stroke="currentColor" strokeWidth="56" strokeLinecap="round" fill="none" opacity="0.18"
      />
      {/* Main body */}
      <path
        d="M 82 370 C 138 338 192 312 248 284 C 305 256 354 220 392 182 C 416 157 432 128 440 96 C 446 76 447 56 444 42"
        stroke="currentColor" strokeWidth="48" strokeLinecap="round" fill="none"
      />
      {/* Belly highlight */}
      <path
        d="M 92 376 C 146 346 198 322 252 295 C 308 268 356 233 394 196 C 417 172 432 144 440 112 C 445 92 446 72 443 58"
        stroke="currentColor" strokeWidth="26" strokeLinecap="round" fill="none" opacity="0.28"
      />
      {/* Scales texture along body */}
      <rect x="0" y="0" width="520" height="400" fill="url(#dragon-scales)" clipPath="url(#body-clip)" />

      {/* ── DORSAL FINS ── */}
      <g opacity="0.92">
        {/* Each fin: triangle apex pointing perpendicular to body curve */}
        <path d="M 438 50 L 444 34 L 450 50" fill="currentColor" />
        <path d="M 432 64 L 437 48 L 443 64" fill="currentColor" />
        <path d="M 422 82 L 427 65 L 433 82" fill="currentColor" />
        <path d="M 408 102 L 413 85 L 419 102" fill="currentColor" />
        <path d="M 390 125 L 395 108 L 401 125" fill="currentColor" />
        <path d="M 368 150 L 373 133 L 379 150" fill="currentColor" />
        <path d="M 342 178 L 347 160 L 353 178" fill="currentColor" />
        <path d="M 312 207 L 317 189 L 323 207" fill="currentColor" />
        <path d="M 278 234 L 283 216 L 289 234" fill="currentColor" />
        <path d="M 242 260 L 247 242 L 253 260" fill="currentColor" />
        <path d="M 205 285 L 210 267 L 216 285" fill="currentColor" />
        <path d="M 165 310 L 170 292 L 176 310" fill="currentColor" />
        <path d="M 124 335 L 129 317 L 135 335" fill="currentColor" />
      </g>

      {/* ── HEAD ── */}
      {/* Upper skull / crown */}
      <path
        d="M 444 42 C 456 36 470 32 488 38 C 504 44 514 58 510 74 C 506 88 494 96 480 100 L 462 104 L 450 96 L 444 82 Z"
        fill="currentColor"
      />
      {/* Lower jaw */}
      <path
        d="M 450 96 C 458 104 472 110 484 112 C 494 114 502 124 498 134 C 494 142 484 144 474 140 L 458 132 L 450 116 Z"
        fill="currentColor"
      />
      {/* Upper teeth */}
      <path d="M 476 100 L 479 112 L 482 100 L 485 112 L 488 100 L 491 112 L 494 100 L 497 112 L 500 100"
        stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7" />
      {/* Lower teeth */}
      <path d="M 468 132 L 471 120 L 474 132 L 477 120 L 480 132 L 483 120 L 486 132"
        stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7" />
      {/* Tongue */}
      <path d="M 496 116 C 504 122 510 122 512 130 M 496 116 C 494 124 490 126 490 134"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Eye */}
      <circle cx="476" cy="68" r="6" fill="currentColor" />
      <circle cx="476" cy="68" r="3" fill="currentColor" opacity="0.2" />
      {/* Nostril */}
      <ellipse cx="503" cy="56" rx="3" ry="2" fill="currentColor" opacity="0.6" />

      {/* ── HORNS ── */}
      <path d="M 458 56 C 454 42 458 24 466 12 C 470 4 478 2 482 10 C 478 22 466 40 462 58"
        fill="currentColor" />
      <path d="M 470 52 C 468 38 474 22 484 14 C 490 8 498 10 498 18 C 494 28 480 44 474 56"
        fill="currentColor" />
      {/* Small third crest horn */}
      <path d="M 448 64 C 446 54 448 44 452 38 C 454 34 458 34 460 38 C 458 46 450 56 450 66"
        fill="currentColor" opacity="0.7" />

      {/* ── MANE / WHISKERS flowing backward from head ── */}
      <path d="M 452 66 C 432 60 410 66 386 72 C 366 77 348 82 330 84"
        stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d="M 450 76 C 428 76 405 85 382 93 C 362 100 344 106 326 108"
        stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M 446 86 C 424 90 400 100 377 110 C 358 118 340 124 322 126"
        stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.55" />
      {/* Long upper whisker */}
      <path d="M 492 52 C 510 42 528 34 542 28"
        stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.65" />
      <path d="M 490 62 C 508 56 524 50 534 44"
        stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M 492 74 C 510 72 526 68 534 64"
        stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.45" />

      {/* ── CLAW SET 1 — upper front ── */}
      <g>
        {/* Arm from body */}
        <path d="M 392 178 C 408 166 420 160 428 158" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* Cloud wisp around wrist */}
        <CloudWisp cx={428} cy={152} />
        {/* 3 talons */}
        <path d="M 428 158 C 440 164 448 176 446 190" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M 428 158 C 440 170 442 184 436 196" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M 428 158 C 424 172 418 182 412 192" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* Claw tips */}
        <path d="M 446 190 C 450 196 450 204 446 208" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 436 196 C 438 204 436 212 430 216" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 412 192 C 408 200 404 208 398 210" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      {/* ── CLAW SET 2 — lower front ── */}
      <g>
        <path d="M 318 210 C 328 226 332 244 328 262" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
        <CloudWisp cx={328} cy={258} />
        <path d="M 328 262 C 336 274 340 290 336 304" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M 328 262 C 334 276 332 292 326 306" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M 328 262 C 320 276 316 292 308 304" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M 336 304 C 338 312 336 320 330 324" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 326 306 C 326 316 322 324 316 326" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 308 304 C 304 314 298 320 292 322" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      {/* ── CLAW SET 3 — upper rear ── */}
      <g>
        <path d="M 228 282 C 218 298 212 316 214 334" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
        <CloudWisp cx={214} cy={330} />
        <path d="M 214 334 C 220 348 222 364 216 376" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M 214 334 C 210 348 206 364 198 374" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M 214 334 C 206 346 200 360 192 370" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M 216 376 C 216 386 212 394 206 396" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 198 374 C 194 384 188 390 182 392" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 192 370 C 186 380 178 386 172 386" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      {/* ── CLAW SET 4 — lower rear ── */}
      <g>
        <path d="M 136 340 C 124 356 116 374 118 392" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
        <CloudWisp cx={118} cy={388} />
        {/* Jewel/thunder ball held in rear claw */}
        <circle cx="118" cy="394" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="118" cy="394" r="4" fill="currentColor" opacity="0.4" />
      </g>

      {/* ── TAIL ── flame-like splits */}
      <path d="M 82 370 C 60 360 38 352 22 358 C 12 362 10 374 18 380" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M 82 370 C 64 376 48 382 34 382 C 22 382 14 392 22 398" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 82 370 C 68 378 55 386 44 392 C 34 396 30 406 38 410" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M 82 370 C 68 360 54 352 42 356 C 30 360 26 370 34 374" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Flame tips at tail ends */}
      <path d="M 18 380 C 12 388 8 396 12 402" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M 22 398 C 18 406 16 414 20 420" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

// ─── Cloud wisp helper ────────────────────────────────────────────────────────
function CloudWisp({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <path
        d={`M ${cx-10} ${cy} C ${cx-12} ${cy-8} ${cx-6} ${cy-14} ${cx} ${cy-10} C ${cx-2} ${cy-16} ${cx+6} ${cy-18} ${cx+10} ${cy-12} C ${cx+8} ${cy-18} ${cx+14} ${cy-20} ${cx+16} ${cy-14} C ${cx+18} ${cy-8} ${cx+14} ${cy-2} ${cx+8} ${cy}`}
        stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.65"
      />
      <path
        d={`M ${cx-8} ${cy+4} C ${cx-10} ${cy-2} ${cx-4} ${cy-6} ${cx+2} ${cy-4} C ${cx+2} ${cy-8} ${cx+8} ${cy-10} ${cx+10} ${cy-5} C ${cx+14} ${cy-4} ${cx+16} ${cy+2} ${cx+10} ${cy+6}`}
        stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5"
      />
    </g>
  );
}

// ─── Outline / ornament variant ───────────────────────────────────────────────
function DragonOutline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 400" className={className} aria-hidden="true" fill="none">
      <path
        d="M 82 370 C 138 338 192 312 248 284 C 305 256 354 220 392 182 C 416 157 432 128 440 96 C 446 76 447 56 444 42"
        stroke="currentColor" strokeWidth="32" strokeLinecap="round" fill="none" opacity="0.15"
      />
      <path
        d="M 82 370 C 138 338 192 312 248 284 C 305 256 354 220 392 182 C 416 157 432 128 440 96 C 446 76 447 56 444 42"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"
      />
      {/* simplified head */}
      <path d="M 444 42 C 456 36 470 32 488 38 C 504 44 514 58 510 74 C 506 88 494 96 480 100 L 462 104 L 450 96 L 444 82 Z"
        stroke="currentColor" strokeWidth="2" />
      <path d="M 450 96 C 458 104 472 110 484 112 C 494 114 502 124 498 134 C 494 142 484 144 474 140 L 458 132 L 450 116 Z"
        stroke="currentColor" strokeWidth="2" />
      <circle cx="476" cy="68" r="5" fill="currentColor" opacity="0.7" />
      {/* Horns */}
      <path d="M 458 56 C 454 40 460 22 468 12 C 472 6 480 6 480 14 C 478 26 464 44 462 58" stroke="currentColor" strokeWidth="2" />
      <path d="M 470 52 C 470 38 476 22 484 14 C 490 8 496 10 496 18 C 492 28 478 44 474 56" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

// ─── Small icon variant ───────────────────────────────────────────────────────
function DragonSmall({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 18" className={className} aria-hidden="true" fill="none">
      <path
        d="M 3 17 C 7 14 11 12 14 10 C 17 8 19 6 21 3"
        stroke="currentColor" strokeWidth="3" strokeLinecap="round"
      />
      <path d="M 21 3 C 22 2 23 2 23.5 3 C 24 4.5 23 6 22 7 L 21 7.5 L 21 5 Z" fill="currentColor" />
      <path d="M 21 3 C 21 2 22 1.2 22.5 1.5 C 22.8 0.8 23.2 0.5 23.5 1" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="22" cy="3.5" r="0.8" fill="currentColor" />
    </svg>
  );
}
