"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrollY = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${
        scrollY * 0.4
      }px) scale(1.1)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="pocetna"
      className="hero-section relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 scale-110 transition-none"
      >
        <Image
          src="/images/hero-bg.jpg"
          alt="Crnogorski restoran Ognjište"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Layered Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

      {/* Decorative grain texture */}
      <div className="grain-overlay absolute inset-0 opacity-[0.15] mix-blend-overlay" />

      {/* Decorative border lines */}
      <div className="absolute inset-6 border border-white/10 md:inset-10" />
      <div className="absolute inset-8 border border-white/5 md:inset-14" />

      {/* Corner ornaments */}
      <CornerOrnament className="absolute left-6 top-6 md:left-10 md:top-10" />
      <CornerOrnament className="absolute right-6 top-6 rotate-90 md:right-10 md:top-10" />
      <CornerOrnament className="absolute bottom-6 left-6 -rotate-90 md:bottom-10 md:left-10" />
      <CornerOrnament className="absolute bottom-6 right-6 rotate-180 md:bottom-10 md:right-10" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center md:px-10">
        {/* Eyebrow */}
        <div className="hero-eyebrow mb-6 flex items-center justify-center gap-4">
          <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
          <p className="font-display text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
            Dobrodošli u Ognjište
          </p>
          <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
        </div>

        {/* Headline */}
        <h1 className="hero-title font-serif text-[clamp(2.4rem,7vw,5.5rem)] font-bold leading-[1.08] tracking-tight text-white">
          <span className="block hero-line-1">Služimo Najbolje</span>
          <span className="block hero-line-2 italic text-amber-100/90">
            Od Crnogorske
          </span>
          <span className="block hero-line-3">Kuhinje</span>
        </h1>

        {/* Divider ornament */}
        <div className="hero-divider my-8 flex items-center justify-center gap-3 opacity-60">
          <span className="h-px w-12 bg-white/50" />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-amber-400"
          >
            <path
              d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
              fill="currentColor"
            />
          </svg>
          <span className="h-px w-12 bg-white/50" />
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle mx-auto max-w-xl text-base leading-relaxed text-white/65 sm:text-lg md:text-xl">
          Uživajte u autentičnim crnogorskim specijalitetima pripremljenim po
          tradicionalnim receptima, uz najljepši pogled na planine i more.
        </p>

        {/* CTAs */}
        <div className="hero-ctas mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#jelovnik"
            className="group relative overflow-hidden rounded-none border border-amber-400 bg-amber-400 px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-amber-400"
          >
            <span className="relative z-10">Pogledajte Jelovnik</span>
          </a>
          <a
            href="#o-nama"
            className="group relative overflow-hidden rounded-none border border-white/40 bg-transparent px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white/80 transition-all duration-300 hover:border-white hover:text-white hover:bg-white/10"
          >
            Naša Priča
          </a>
        </div>

        {/* Scroll hint */}
      </div>

      <style jsx>{`
        /* Grain texture */
        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
        }

        /* Entrance animations */
        .hero-eyebrow {
          animation: fadeSlideUp 0.8s ease both;
          animation-delay: 0.2s;
        }
        .hero-line-1 {
          animation: fadeSlideUp 0.9s ease both;
          animation-delay: 0.35s;
        }
        .hero-line-2 {
          animation: fadeSlideUp 0.9s ease both;
          animation-delay: 0.5s;
        }
        .hero-line-3 {
          animation: fadeSlideUp 0.9s ease both;
          animation-delay: 0.65s;
        }
        .hero-divider {
          animation: fadeIn 1s ease both;
          animation-delay: 0.8s;
        }
        .hero-subtitle {
          animation: fadeSlideUp 0.9s ease both;
          animation-delay: 0.9s;
        }
        .hero-ctas {
          animation: fadeSlideUp 0.9s ease both;
          animation-delay: 1.1s;
        }
        .hero-scroll {
          animation: fadeIn 1.2s ease both;
          animation-delay: 1.5s;
        }

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

        /* Scroll dot animation */
        .scroll-dot {
          animation: scrollBounce 1.8s ease-in-out infinite;
        }
        @keyframes scrollBounce {
          0%,
          100% {
            transform: translateY(0);
            opacity: 1;
          }
          80% {
            transform: translateY(14px);
            opacity: 0;
          }
        }

        /* Ensure font-serif and font-display are mapped in tailwind config or via @font-face */
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
      className={`text-white/20 ${className ?? ""}`}
    >
      <path d="M1 19V1H19" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
