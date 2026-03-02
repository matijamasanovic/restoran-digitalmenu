"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-animate]").forEach((el, i) => {
              (el as HTMLElement).style.animationDelay = `${i * 0.15}s`;
              el.classList.add("animate-in");
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="o-nama"
      ref={sectionRef}
      className="story-section relative overflow-hidden bg-[#0f0d0b] py-24 lg:py-36"
    >
      {/* Grain overlay */}
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-amber-900/20 blur-[120px]" />

      {/* Decorative vertical rule */}
      <div className="absolute left-1/2 top-0 hidden h-32 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-amber-400/30 lg:block" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Header */}
        <div
          data-animate
          className="story-animate mb-20 flex flex-col items-center text-center"
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
            <p className="font-display text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
              Naša Priča
            </p>
            <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
          </div>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.8rem)] font-bold leading-[1.08] tracking-tight text-white">
            <span className="block">Tradicija i Moderni Ukus</span>
            <span className="block italic text-amber-100/80">
              Od 1987. godine
            </span>
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* ── Left: Image column ── */}
          <div className="relative order-2 lg:order-1">
            {/* Decorative frame offset */}
            <div
              data-animate
              className="story-animate absolute -left-4 -top-4 h-full w-full border border-amber-400/15"
            />

            {/* Main image */}
            <div
              data-animate
              className="story-animate relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src="/images/story.jpg"
                alt="Naš restoran – kamena kuća u crnogorskom stilu"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Year badge */}
            <div
              data-animate
              className="story-animate absolute -bottom-6 -right-4 border border-amber-400/40 bg-[#0f0d0b] px-8 py-5 lg:-right-8"
            >
              <div className="flex items-center gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="flex-shrink-0 text-amber-400"
                >
                  <path
                    d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
                    fill="currentColor"
                  />
                </svg>
                <div>
                  <p className="font-serif text-3xl font-bold leading-none text-amber-400">
                    1987
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50">
                    Godina Osnivanja
                  </p>
                </div>
              </div>
            </div>

            {/* Corner ornaments on image */}
            <CornerOrnament className="absolute left-0 top-0 text-amber-400/30" />
            <CornerOrnament className="absolute right-0 top-0 rotate-90 text-amber-400/30" />
            <CornerOrnament className="absolute bottom-0 left-0 -rotate-90 text-amber-400/30" />
            <CornerOrnament className="absolute bottom-0 right-0 rotate-180 text-amber-400/30" />
          </div>

          {/* ── Right: Text column ── */}
          <div className="order-1 lg:order-2">
            {/* Pull-quote / intro */}
            <blockquote
              data-animate
              className="story-animate relative mb-10 border-l-2 border-amber-400/60 pl-6"
            >
              <p className="font-serif text-xl italic leading-relaxed text-white/80 md:text-2xl">
                "Sačuvati autentični ukus crnogorske kuhinje i ponuditi ga u
                toplijem, savremenijem ambijentu."
              </p>
              <footer className="mt-3 text-xs uppercase tracking-[0.2em] text-amber-400/70">
                — Mirko Petrović, osnivač
              </footer>
            </blockquote>

            {/* Body copy */}
            <div
              data-animate
              className="story-animate space-y-5 text-[15px] leading-[1.8] text-white/55"
            >
              <p>
                Restoran Ognjište osnovan je 1987. godine u srcu Crne Gore,
                inspirisan receptima bake osnivača iz njeguških planina. Ono što
                je počelo kao porodična večera pretvorilo se u jedno od
                najprepoznatljivijih mjesta crnogorske gastronomije.
              </p>
              <p>
                Danas, tri generacije kasnije, i dalje koristimo iste
                tradicionalne recepte, lokalne sastojke i pripremu na ognjištu
                koja jelima daje neponovljiv ukus. Njeguški pršut sušimo sami,
                sir pravimo po starinskim receptima, a jagnjetinu biramo samo od
                lokalnih farmera.
              </p>
            </div>

            {/* Divider */}
            <div
              data-animate
              className="story-animate my-10 flex items-center gap-4"
            >
              <span className="h-px flex-1 bg-white/10" />
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                className="text-amber-400/60"
              >
                <path
                  d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
                  fill="currentColor"
                />
              </svg>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            {/* Stats */}
            <div data-animate className="story-animate grid grid-cols-3 gap-0">
              {[
                { value: "37+", label: "Godina\nTradicije" },
                { value: "50+", label: "Jela u\nPonudi" },
                { value: "15k+", label: "Zadovoljnih\nGostiju" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`py-6 text-center ${
                    i < 2 ? "border-r border-white/10" : ""
                  }`}
                >
                  <p className="font-serif text-[2.2rem] font-bold leading-none text-amber-400">
                    {stat.value}
                  </p>
                  <p className="mt-2 whitespace-pre-line text-xs uppercase leading-snug tracking-[0.15em] text-white/40">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              data-animate
              className="story-animate mt-10 flex items-center gap-6"
            >
              <a
                href="#jelovnik"
                className="group relative overflow-hidden border border-amber-400 bg-amber-400 px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-amber-400"
              >
                Pogledajte Jelovnik
              </a>
              <a
                href="#galerija"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 hover:text-amber-400"
              >
                <span>Galerija</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom decorative rule */}
        <div className="mt-24 flex items-center gap-4 opacity-30">
          <span className="h-px flex-1 bg-white/20" />
          <svg
            width="10"
            height="10"
            viewBox="0 0 16 16"
            fill="none"
            className="text-amber-400"
          >
            <path
              d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
              fill="currentColor"
            />
          </svg>
          <span className="h-px flex-1 bg-white/20" />
        </div>
      </div>

      <style jsx>{`
        /* Grain texture — matches hero */
        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
        }

        /* Base state: hidden */
        .story-animate {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }

        /* Triggered state */
        .story-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
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
