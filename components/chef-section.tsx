"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const features = [
  "100% lokalni i organski sastojci",
  "Tradicionalna priprema na ognjištu i ispod sača",
  "Sezonski meni sa svježim jadranskim plodovima mora",
  "Domaća vina iz crnogorskih vinograda (Vranac, Krstač)",
];

export function ChefSection() {
  const sectionRef = useRef<HTMLElement>(null);

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="chef-section relative overflow-hidden bg-[#0f0d0b] py-24 lg:py-36"
    >
      {/* Grain overlay */}
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />

      {/* Ambient glow — right side to complement image on left */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-amber-950/25 blur-[130px]" />

      {/* Top rule */}
      <div className="absolute left-0 right-0 top-0 flex items-center gap-4 px-10 opacity-30">
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

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* ── Left: Image ── */}
          <div data-animate className="chef-animate relative">
            {/* Offset decorative frame */}
            <div className="absolute -left-4 -top-4 h-full w-full border border-amber-400/15" />

            {/* Main image */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/chef.jpg"
                alt="Šef kuhinje Ognjišta – Nikola Đurović"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating label on image */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="border border-white/15 bg-black/50 px-5 py-4 backdrop-blur-sm">
                  <p className="font-serif text-lg font-bold text-white">
                    Nikola Đurović
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Šef Kuhinje · 20+ Godina Iskustva
                  </p>
                </div>
              </div>
            </div>

            {/* Discount badge */}
            <div className="absolute -right-4 -bottom-4 hidden border border-amber-400/40 bg-amber-400 px-7 py-5 lg:block">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">
                Do 20% Popusta
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-black/60">
                Za Grupe od 10+
              </p>
            </div>

            {/* Corner ornaments */}
            <CornerOrnament className="absolute left-0 top-0 text-amber-400/30" />
            <CornerOrnament className="absolute right-0 top-0 rotate-90 text-amber-400/30" />
            <CornerOrnament className="absolute bottom-0 left-0 -rotate-90 text-amber-400/30" />
            <CornerOrnament className="absolute bottom-0 right-0 rotate-180 text-amber-400/30" />
          </div>

          {/* ── Right: Content ── */}
          <div>
            {/* Eyebrow */}
            <div
              data-animate
              className="chef-animate mb-6 flex items-center gap-4"
            >
              <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
                Posebna Ponuda
              </p>
            </div>

            {/* Headline */}
            <h2
              data-animate
              className="chef-animate font-serif text-[clamp(1.9rem,4vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-white"
            >
              <span className="block">Otkrijte Poseban Ukus</span>
              <span className="block italic text-amber-100/80">
                i Najbolji Kvalitet
              </span>
            </h2>

            {/* Divider */}
            <div
              data-animate
              className="chef-animate my-8 flex items-center gap-3 opacity-50"
            >
              <span className="h-px w-12 bg-white/30" />
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                className="text-amber-400"
              >
                <path
                  d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
                  fill="currentColor"
                />
              </svg>
              <span className="h-px w-12 bg-white/30" />
            </div>

            {/* Body */}
            <p
              data-animate
              className="chef-animate text-[15px] leading-[1.85] text-white/50"
            >
              Naš šef kuhinje, Nikola Đurović, sa preko 20 godina iskustva u
              kulinarstvu, kombinuje tradicionalne crnogorske recepte sa
              modernim tehnikama pripreme. Svaki obrok je pažljivo osmišljen da
              pruži nezaboravan gastronomski doživljaj.
            </p>

            {/* Feature list */}
            <ul className="mt-8 flex flex-col gap-0">
              {features.map((feat, i) => (
                <li
                  key={feat}
                  data-animate
                  className="chef-animate flex items-start gap-4 border-b border-white/6 py-4 last:border-b-0"
                >
                  {/* Check icon */}
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center border border-amber-400/50 bg-amber-400/10">
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 12 10"
                      fill="none"
                      className="text-amber-400"
                    >
                      <path
                        d="M1 5L4.5 8.5L11 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-[14px] leading-relaxed text-white/55">
                    {feat}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div
              data-animate
              className="chef-animate mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="/rezervacija"
                className="border border-amber-400 bg-amber-400 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-amber-400"
              >
                Napravite Rezervaciju
              </a>
              <a
                href="/jelovnik"
                className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 transition-colors duration-300 hover:text-amber-400"
              >
                <span>Naš Jelovnik</span>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
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

        {/* Bottom rule */}
        <div className="mt-24 flex items-center gap-4 opacity-25">
          <span className="h-px flex-1 bg-white/20" />
          <svg
            width="8"
            height="8"
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
        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
        }

        .chef-animate {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }

        .chef-animate.animate-in {
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
