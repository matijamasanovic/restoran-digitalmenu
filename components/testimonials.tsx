"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Milena Vukčević",
    location: "Podgorica",
    text: "Najbolja jagnjetina ispod sača koju sam probala! Osjećaš pravi ukus Crne Gore u svakom zalogaju. Atmosfera je predivna, a osoblje izuzetno ljubazno.",
    rating: 5,
  },
  {
    name: "Marco Rossi",
    location: "Italija",
    text: "Amazing experience! The seafood was incredibly fresh, and the view of the bay was breathtaking. We will definitely come back next summer. Highly recommended!",
    rating: 5,
  },
  {
    name: "Dragan Popović",
    location: "Kotor",
    text: "Već godinama dolazimo u Ognjište za porodične proslave. Kačamak sa skorupom je fenomenalan, a njeguški štek je uvijek savršen. Pravo crnogorsko uživanje!",
    rating: 5,
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-animate]").forEach((el, i) => {
              (el as HTMLElement).style.transitionDelay = `${i * 0.15}s`;
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
      className="testimonials-section relative overflow-hidden py-24 lg:py-36"
    >
      {/* Background image */}
      <Image
        src="/images/testimonial-bg.jpg"
        alt="Terasa restorana"
        fill
        className="object-cover"
      />

      {/* Layered overlays — matches Hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/75 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

      {/* Grain overlay */}
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay" />

      {/* Decorative border lines — matches Hero */}
      <div className="absolute inset-6 border border-white/8 md:inset-10" />
      <div className="absolute inset-8 border border-white/4 md:inset-14" />

      {/* Corner ornaments */}
      <CornerOrnament className="absolute left-6 top-6 text-white/15 md:left-10 md:top-10" />
      <CornerOrnament className="absolute right-6 top-6 rotate-90 text-white/15 md:right-10 md:top-10" />
      <CornerOrnament className="absolute bottom-6 left-6 -rotate-90 text-white/15 md:bottom-10 md:left-10" />
      <CornerOrnament className="absolute bottom-6 right-6 rotate-180 text-white/15 md:bottom-10 md:right-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Header */}
        <div
          data-animate
          className="testi-animate mb-20 flex flex-col items-center text-center"
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
            <p className="font-display text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
              Svjedočanstva
            </p>
            <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
          </div>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.8rem)] font-bold leading-[1.08] tracking-tight text-white">
            <span className="block">Šta Naši Gosti</span>
            <span className="block italic text-amber-100/80">
              Kažu o Ognjištu
            </span>
          </h2>
          <div className="my-8 flex items-center justify-center gap-3 opacity-60">
            <span className="h-px w-12 bg-white/40" />
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="text-amber-400"
            >
              <path
                d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
                fill="currentColor"
              />
            </svg>
            <span className="h-px w-12 bg-white/40" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              data-animate
              className="testi-animate group relative overflow-hidden border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-500 hover:border-amber-400/30 hover:bg-white/[0.08]"
            >
              {/* Hover amber wash */}
              <div className="absolute inset-0 bg-amber-400/0 transition-all duration-500 group-hover:bg-amber-400/[0.03]" />

              {/* Corner ornament — appears on hover */}
              <CornerOrnament className="absolute left-0 top-0 text-amber-400/0 transition-colors duration-500 group-hover:text-amber-400/25" />
              <CornerOrnament className="absolute right-0 top-0 rotate-90 text-amber-400/0 transition-colors duration-500 group-hover:text-amber-400/25" />

              <div className="relative">
                {/* Large quote mark */}
                <div className="mb-5 flex items-center justify-between">
                  <svg
                    width="32"
                    height="24"
                    viewBox="0 0 32 24"
                    fill="none"
                    className="text-amber-400/60"
                  >
                    <path
                      d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0L16 2.4C11.2 3.6 8.4 6.4 8 11.2H14.4V24H0ZM17.6 24V14.4C17.6 6.4 22.4 1.6 32 0L33.6 2.4C28.8 3.6 26 6.4 25.6 11.2H32V24H17.6Z"
                      fill="currentColor"
                    />
                  </svg>
                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <svg
                        key={idx}
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
                    ))}
                  </div>
                </div>

                {/* Quote text */}
                <p className="text-[15px] italic leading-[1.8] text-white/60">
                  "{t.text}"
                </p>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                  <span className="h-px flex-1 bg-white/10" />
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-amber-400/40"
                  >
                    <path
                      d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  {/* Monogram avatar */}
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-amber-400/30 bg-amber-400/10">
                    <span className="font-serif text-sm font-bold text-amber-400">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-serif text-base font-bold leading-snug text-white">
                      {t.name}
                    </p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-white/35">
                      {t.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom rule */}
        <div className="mt-20 flex items-center gap-4 opacity-30">
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

        .testi-animate {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }

        .testi-animate.animate-in {
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
