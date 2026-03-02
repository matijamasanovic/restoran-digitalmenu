"use client";

import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import React, { useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const timeline = [
  {
    year: "1987",
    title: "Osnivanje",
    desc: "Mirko Petrović otvara Ognjište u staroj kamenoj kući na rubu Kotora, inspiran receptima svoje bake iz njeguških planina.",
  },
  {
    year: "1995",
    title: "Prva Nagrada",
    desc: "Ognjište dobija prvu nagradu za 'Najbolji Restoran Crnogorske Kuhinje' na festivalu hrane u Budvi.",
  },
  {
    year: "2003",
    title: "Proširenje",
    desc: "Otvaramo terasu sa pogledom na Boku Kotorsku. Kapacitet restorana raste na 120 mjesta uz zadržavanje intimne atmosfere.",
  },
  {
    year: "2012",
    title: "Nova Generacija",
    desc: "Sin osnivača, Nikola Đurović, preuzima kuhinju nakon školovanja u Parizu i Rimu – spajajući tradiciju sa savremenim tehnikama.",
  },
  {
    year: "2019",
    title: "Michelin Preporuka",
    desc: "Ognjište ulazi u Michelin vodič za Crnu Goru kao preporučeni restoran za autentičnu lokalnu gastronomiju.",
  },
  {
    year: "2024",
    title: "Danas",
    desc: "Tri generacije, isti recepti, isti oganj. Preko 15.000 zadovoljnih gostiju svake godine iz cijelog svijeta.",
  },
];

const team = [
  {
    name: "Nikola Đurović",
    role: "Šef Kuhinje",
    bio: "20+ godina iskustva. Školovan u Parizu, srcem Crnogorac.",
    initial: "N",
  },
  {
    name: "Ana Petrović",
    role: "Sous Chef",
    bio: "Čuvar tradicionalnih recepata porodice Petrović.",
    initial: "A",
  },
  {
    name: "Marko Vukić",
    role: "Sommelier",
    bio: "Ekspert za crnogorska vina – Vranac i Krstač.",
    initial: "M",
  },
];

const values = [
  {
    label: "Lokalnost",
    desc: "Sve namirnice nabavljamo od crnogorskih farmera u krugu 50km.",
  },
  {
    label: "Tradicija",
    desc: "Recepti koji su preživjeli generacije, bez kompromisa.",
  },
  {
    label: "Gostoprimstvo",
    desc: "Svaki gost ulazi kao stranac, a izlazi kao prijatelj.",
  },
  {
    label: "Kvalitet",
    desc: "Pršut sušimo 18 mjeseci, sir starimo sami, jagnjetinu biramo lično.",
  },
];

/* ─────────────────────────────────────────
   SHARED UTILS
───────────────────────────────────────── */
function useScrollReveal(
  threshold = 0.1
): React.MutableRefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-animate]").forEach((el, i) => {
              (el as HTMLElement).style.transitionDelay = `${i * 0.13}s`;
              el.classList.add("animate-in");
            });
          }
        });
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className ?? ""}
    >
      <path d="M1 19V1H19" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Diamond({ className }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 16 16"
      fill="none"
      className={className ?? "text-amber-400"}
    >
      <path
        d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function HRule() {
  return (
    <div className="flex items-center gap-4 opacity-30">
      <span className="h-px flex-1 bg-white/20" />
      <Diamond />
      <span className="h-px flex-1 bg-white/20" />
    </div>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function ONamaPage() {
  return (
    <main className="page-root bg-[#0f0d0b]">
      <Navbar />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <PageHero />

      {/* ══════════════════════════════════════
          INTRO — story split
      ══════════════════════════════════════ */}
      <IntroSection />

      {/* ══════════════════════════════════════
          TIMELINE
      ══════════════════════════════════════ */}
      <TimelineSection />

      {/* ══════════════════════════════════════
          VALUES
      ══════════════════════════════════════ */}
      <ValuesSection />

      {/* ══════════════════════════════════════
          TEAM
      ══════════════════════════════════════ */}
      <TeamSection />

      {/* ══════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════ */}
      <CtaBanner />

      <Footer />

      <style jsx global>{`
        .page-root {
          min-height: 100vh;
        }

        /* Grain texture */
        .grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
        }

        /* Universal reveal animation */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Stagger children */
        .reveal-child {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .reveal-child.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Hero entrance */
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}

/* ─────────────────────────────────────────
   SECTION: HERO
───────────────────────────────────────── */
function PageHero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!parallaxRef.current) return;
      parallaxRef.current.style.transform = `translateY(${
        window.scrollY * 0.35
      }px) scale(1.1)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      {/* Parallax bg */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/story.jpg"
          alt="O nama – Ognjište"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/65 to-[#0f0d0b]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay" />

      {/* Border frames */}
      <div className="absolute inset-6 border border-white/8 md:inset-10" />
      <div className="absolute inset-8 border border-white/4 md:inset-14" />

      {/* Corners */}
      <CornerOrnament className="absolute left-6 top-6 text-white/20 md:left-10 md:top-10" />
      <CornerOrnament className="absolute right-6 top-6 rotate-90 text-white/20 md:right-10 md:top-10" />
      <CornerOrnament className="absolute bottom-6 left-6 -rotate-90 text-white/20 md:bottom-10 md:left-10" />
      <CornerOrnament className="absolute bottom-6 right-6 rotate-180 text-white/20 md:bottom-10 md:right-10" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center md:px-10">
        <div
          className="mb-6 flex items-center justify-center gap-4"
          style={{ animation: "fadeSlideUp 0.8s ease 0.2s both" }}
        >
          <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
            Naša Priča
          </p>
          <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
        </div>

        <h1
          className="font-serif text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[1.06] tracking-tight text-white"
          style={{ animation: "fadeSlideUp 0.9s ease 0.4s both" }}
        >
          <span className="block">O Nama</span>
          <span className="block italic text-amber-100/80">
            Tradicija od 1987.
          </span>
        </h1>

        <div
          className="my-8 flex items-center justify-center gap-3 opacity-60"
          style={{ animation: "fadeIn 1s ease 0.7s both" }}
        >
          <span className="h-px w-12 bg-white/40" />
          <Diamond />
          <span className="h-px w-12 bg-white/40" />
        </div>

        <p
          className="mx-auto max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
          style={{ animation: "fadeSlideUp 0.9s ease 0.85s both" }}
        >
          Porodični restoran koji čuva dušu crnogorske kuhinje — od njeguških
          planina do jadranskog primorja.
        </p>

        {/* Scroll hint */}
        <div
          className="mt-14 flex flex-col items-center gap-2"
          style={{ animation: "fadeIn 1.2s ease 1.2s both" }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">
            Saznajte Više
          </span>
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/15 pt-1.5">
            <div className="h-1.5 w-0.5 animate-bounce rounded-full bg-amber-400/60" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SECTION: INTRO
───────────────────────────────────────── */
function IntroSection() {
  const ref = useScrollReveal(0.12);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#0f0d0b] py-24 lg:py-32"
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay" />
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-amber-950/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-28">
          {/* Text */}
          <div>
            <div data-animate className="reveal mb-6 flex items-center gap-4">
              <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
                Ko Smo Mi
              </p>
            </div>

            <h2
              data-animate
              className="reveal font-serif text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[1.1] tracking-tight text-white"
            >
              <span className="block">Porodica koja kuha</span>
              <span className="block italic text-amber-100/80">
                srcem, ne samo rukama
              </span>
            </h2>

            <div
              data-animate
              className="reveal my-8 flex items-center gap-3 opacity-50"
            >
              <span className="h-px w-12 bg-white/30" />
              <Diamond />
              <span className="h-px w-12 bg-white/30" />
            </div>

            <div
              data-animate
              className="reveal space-y-5 text-[15px] leading-[1.85] text-white/50"
            >
              <p>
                Ognjište nije samo restoran — to je živo nasljeđe jedne porodice
                i jednog naroda. Sve je počelo 1987. kada je Mirko Petrović sa
                suprugom Darinkom otvorio vrata stare kamene kuće, nudeći goste
                jelima koja su mirisala na njeguški dim i planinski vazduh.
              </p>
              <p>
                Tri decenije i tri generacije kasnije, isti oganj gori u istoj
                kuhinji. Recept za kačamak nije se promijenio. Pršut se i dalje
                suši 18 mjeseci u istom podrumu. Jedino što raste je naša
                zahvalnost prema gostima koji su sa nama od prvog dana.
              </p>
            </div>

            {/* Stats row */}
            <div
              data-animate
              className="reveal mt-10 grid grid-cols-3 gap-0 border border-white/8"
            >
              {[
                { val: "37+", lbl: "Godina" },
                { val: "3", lbl: "Generacije" },
                { val: "15k+", lbl: "Gostiju" },
              ].map((s, i) => (
                <div
                  key={s.lbl}
                  className={`py-6 text-center ${
                    i < 2 ? "border-r border-white/8" : ""
                  }`}
                >
                  <p className="font-serif text-3xl font-bold text-amber-400">
                    {s.val}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/35">
                    {s.lbl}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <div data-animate className="reveal relative">
            <div className="absolute -left-4 -top-4 h-full w-full border border-amber-400/12" />

            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/story.jpg"
                alt="Unutrašnjost restorana Ognjište"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating quote on image */}
            <div className="absolute -bottom-6 -left-6 hidden max-w-[200px] border border-amber-400/30 bg-[#0f0d0b]/90 p-5 backdrop-blur-sm lg:block">
              <Diamond className="mb-2 text-amber-400/60" />
              <p className="font-serif text-sm italic leading-snug text-white/70">
                "Svaki gost je gost u našoj kući."
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/30">
                — Mirko Petrović
              </p>
            </div>

            <CornerOrnament className="absolute left-0 top-0 text-amber-400/25" />
            <CornerOrnament className="absolute right-0 top-0 rotate-90 text-amber-400/25" />
            <CornerOrnament className="absolute bottom-0 left-0 -rotate-90 text-amber-400/25" />
            <CornerOrnament className="absolute bottom-0 right-0 rotate-180 text-amber-400/25" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SECTION: TIMELINE
───────────────────────────────────────── */
function TimelineSection() {
  const ref = useScrollReveal(0.08);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#0a0907] py-24 lg:py-32"
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-overlay" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-amber-950/15 blur-[120px]" />

      {/* Top rule */}
      <div className="absolute left-0 right-0 top-0 flex items-center gap-4 px-10 opacity-25">
        <span className="h-px flex-1 bg-white/20" />
        <Diamond />
        <span className="h-px flex-1 bg-white/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div
          data-animate
          className="reveal mb-20 flex flex-col items-center text-center"
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
              Naša Istorija
            </p>
            <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
          </div>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-white">
            <span className="block">Putovanje kroz</span>
            <span className="block italic text-amber-100/80">
              Decenije Ukusa
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-amber-400/30 via-amber-400/10 to-transparent lg:block" />

          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={item.year}
                  data-animate
                  className={`reveal relative grid gap-8 pb-16 lg:grid-cols-2 lg:gap-16`}
                >
                  {/* Left side */}
                  <div className={`${isLeft ? "lg:text-right" : "lg:order-2"}`}>
                    {isLeft && (
                      <div className="lg:pr-8">
                        <TimelineCard item={item} />
                      </div>
                    )}
                    {!isLeft && <div />}
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-1/2 top-6 hidden -translate-x-1/2 lg:flex">
                    <div className="flex h-10 w-10 items-center justify-center border border-amber-400/40 bg-[#0a0907]">
                      <Diamond className="h-3 w-3 text-amber-400" />
                    </div>
                  </div>

                  {/* Right side */}
                  <div className={`${!isLeft ? "lg:pl-8" : "lg:order-2"}`}>
                    {!isLeft && <TimelineCard item={item} />}
                    {isLeft && <div />}
                  </div>

                  {/* Mobile: always show */}
                  <div className="lg:hidden">
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-amber-400/40 bg-[#0a0907]">
                        <Diamond className="h-2.5 w-2.5 text-amber-400" />
                      </div>
                      <TimelineCard item={item} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ item }: { item: (typeof timeline)[0] }) {
  return (
    <div className="group">
      <span className="font-serif text-4xl font-bold text-amber-400/30 transition-colors duration-300 group-hover:text-amber-400/60">
        {item.year}
      </span>
      <h3 className="mt-2 font-serif text-xl font-bold text-white">
        {item.title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-white/45">
        {item.desc}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────
   SECTION: VALUES
───────────────────────────────────────── */
function ValuesSection() {
  const ref = useScrollReveal(0.1);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#0f0d0b] py-24 lg:py-32"
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay" />

      {/* Top rule */}
      <div className="absolute left-0 right-0 top-0 flex items-center gap-4 px-10 opacity-25">
        <span className="h-px flex-1 bg-white/20" />
        <Diamond />
        <span className="h-px flex-1 bg-white/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div
          data-animate
          className="reveal mb-20 flex flex-col items-center text-center"
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
              Naše Vrijednosti
            </p>
            <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
          </div>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-white">
            <span className="block">Na Čemu</span>
            <span className="block italic text-amber-100/80">Gradimo Sve</span>
          </h2>
        </div>

        {/* Values grid */}
        <div className="grid gap-0 border border-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div
              key={v.label}
              data-animate
              className={`reveal group relative overflow-hidden p-8 transition-all duration-500 hover:bg-amber-400/[0.04] ${
                i < values.length - 1
                  ? "border-b border-white/8 lg:border-b-0 lg:border-r"
                  : ""
              } ${
                i === 1
                  ? "sm:border-b sm:border-r-0 lg:border-b-0 lg:border-r"
                  : ""
              }`}
            >
              {/* Number */}
              <p className="font-serif text-5xl font-bold text-white/[0.06] transition-colors duration-500 group-hover:text-amber-400/10">
                0{i + 1}
              </p>

              {/* Diamond accent */}
              <div className="my-4">
                <Diamond className="text-amber-400/50" />
              </div>

              <h3 className="font-serif text-xl font-bold text-white">
                {v.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/40">
                {v.desc}
              </p>

              {/* Hover corner */}
              <CornerOrnament className="absolute right-0 top-0 rotate-90 text-amber-400/0 transition-colors duration-500 group-hover:text-amber-400/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SECTION: TEAM
───────────────────────────────────────── */
function TeamSection() {
  const ref = useScrollReveal(0.1);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#0a0907] py-24 lg:py-32"
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-overlay" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-amber-950/20 blur-[120px]" />

      {/* Top rule */}
      <div className="absolute left-0 right-0 top-0 flex items-center gap-4 px-10 opacity-25">
        <span className="h-px flex-1 bg-white/20" />
        <Diamond />
        <span className="h-px flex-1 bg-white/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div
          data-animate
          className="reveal mb-20 flex flex-col items-center text-center"
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
              Naš Tim
            </p>
            <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
          </div>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-white">
            <span className="block">Ljudi iza</span>
            <span className="block italic text-amber-100/80">
              Svakog Obroka
            </span>
          </h2>
        </div>

        {/* Team cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <div
              key={member.name}
              data-animate
              className="reveal group relative overflow-hidden border border-white/8 p-8 transition-all duration-500 hover:border-amber-400/25 hover:bg-white/[0.03]"
            >
              {/* Hover corner ornaments */}
              <CornerOrnament className="absolute left-0 top-0 text-amber-400/0 transition-colors duration-500 group-hover:text-amber-400/20" />
              <CornerOrnament className="absolute right-0 top-0 rotate-90 text-amber-400/0 transition-colors duration-500 group-hover:text-amber-400/20" />

              {/* Avatar */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center border border-amber-400/30 bg-amber-400/10">
                <span className="font-serif text-2xl font-bold text-amber-400">
                  {member.initial}
                </span>
              </div>

              {/* Divider */}
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-amber-400/30" />
                <Diamond className="text-amber-400/50" />
              </div>

              <h3 className="font-serif text-xl font-bold text-white">
                {member.name}
              </h3>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400/60">
                {member.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/40">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SECTION: CTA BANNER
───────────────────────────────────────── */
function CtaBanner() {
  const ref = useScrollReveal(0.15);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 lg:py-32">
      {/* BG image */}
      <Image
        src="/images/hero-bg.jpg"
        alt="Rezervacija"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/70 to-black/85" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay" />

      {/* Border frames */}
      <div className="absolute inset-6 border border-white/8 md:inset-10" />
      <div className="absolute inset-8 border border-white/4 md:inset-14" />
      <CornerOrnament className="absolute left-6 top-6 text-white/15 md:left-10 md:top-10" />
      <CornerOrnament className="absolute right-6 top-6 rotate-90 text-white/15 md:right-10 md:top-10" />
      <CornerOrnament className="absolute bottom-6 left-6 -rotate-90 text-white/15 md:bottom-10 md:left-10" />
      <CornerOrnament className="absolute bottom-6 right-6 rotate-180 text-white/15 md:bottom-10 md:right-10" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-10">
        <div
          data-animate
          className="reveal mb-5 flex items-center justify-center gap-4"
        >
          <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
            Dođite k Nama
          </p>
          <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
        </div>

        <h2
          data-animate
          className="reveal font-serif text-[clamp(2rem,5vw,3.8rem)] font-bold leading-[1.08] tracking-tight text-white"
        >
          <span className="block">Rezervišite Vaš</span>
          <span className="block italic text-amber-100/80">Sto Danas</span>
        </h2>

        <div
          data-animate
          className="reveal my-8 flex items-center justify-center gap-3 opacity-60"
        >
          <span className="h-px w-12 bg-white/40" />
          <Diamond />
          <span className="h-px w-12 bg-white/40" />
        </div>

        <p
          data-animate
          className="reveal mx-auto max-w-md text-[15px] leading-relaxed text-white/55"
        >
          Rezervišite sto za posebnu priliku, poslovni ručak ili porodičnu
          večeru. Dostupni smo svakog dana od 10:00 do 23:00.
        </p>

        <div
          data-animate
          className="reveal mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="/rezervacija"
            className="border border-amber-400 bg-amber-400 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-amber-400"
          >
            Napravite Rezervaciju
          </a>
          <a
            href="tel:+38220123456"
            className="border border-white/25 bg-transparent px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 transition-all duration-300 hover:border-white hover:text-white"
          >
            +382 20 123 456
          </a>
        </div>
      </div>
    </section>
  );
}
