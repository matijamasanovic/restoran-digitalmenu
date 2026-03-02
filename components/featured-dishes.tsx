"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const dishes = [
  {
    name: "Njeguški Štek",
    image: "/images/dish-1.jpg",
    rating: 4.9,
    reviews: 128,
    price: "14.50",
    tag: "Chef's Choice",
  },
  {
    name: "Ćevapi sa Kajmakom",
    image: "/images/dish-2.jpg",
    rating: 4.8,
    reviews: 215,
    price: "9.00",
    tag: "Najpopularnije",
  },
  {
    name: "Orada na Žaru",
    image: "/images/dish-3.jpg",
    rating: 4.9,
    reviews: 97,
    price: "18.00",
    tag: "Svježe Danas",
  },
  {
    name: "Kačamak sa Skorupom",
    image: "/images/dish-4.jpg",
    rating: 4.7,
    reviews: 163,
    price: "8.00",
    tag: "Tradicionalno",
  },
];

export function FeaturedDishes() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-animate]").forEach((el, i) => {
              (el as HTMLElement).style.transitionDelay = `${i * 0.12}s`;
              el.classList.add("animate-in");
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="specijaliteti"
      ref={sectionRef}
      className="dishes-section relative overflow-hidden bg-[#100e0c] py-24 lg:py-36"
    >
      {/* Grain overlay */}
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-amber-950/25 blur-[130px]" />

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
        {/* Section Header */}
        <div
          data-animate
          className="dishes-animate mb-20 flex flex-col items-center text-center"
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
            <p className="font-display text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
              Naš Meni
            </p>
            <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
          </div>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.8rem)] font-bold leading-[1.08] tracking-tight text-white">
            <span className="block">Naši Najtraženiji</span>
            <span className="block italic text-amber-100/80">
              Specijaliteti
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

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dishes.map((dish, i) => (
            <div
              key={dish.name}
              data-animate
              className="dishes-animate group relative overflow-hidden border border-white/8 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-amber-400/30 hover:bg-white/[0.06]"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Tag badge */}
                <div className="absolute left-0 top-5">
                  <span className="bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                    {dish.tag}
                  </span>
                </div>

                {/* Price — overlaid on image bottom */}
                <div className="absolute bottom-4 right-4">
                  <span className="font-serif text-2xl font-bold text-amber-400 drop-shadow-lg">
                    €{dish.price}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold leading-snug text-white transition-colors duration-300 group-hover:text-amber-100">
                  {dish.name}
                </h3>

                {/* Stars */}
                <div className="mt-3 flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <StarIcon
                        key={idx}
                        filled={idx < Math.floor(dish.rating)}
                        half={
                          idx === Math.floor(dish.rating) &&
                          dish.rating % 1 >= 0.5
                        }
                      />
                    ))}
                  </div>
                  <span className="font-serif text-sm font-bold text-amber-400">
                    {dish.rating}
                  </span>
                  <span className="text-xs text-white/30">
                    ({dish.reviews})
                  </span>
                </div>

                {/* Bottom divider + CTA hint */}
                <div className="mt-4 flex items-center gap-3 border-t border-white/8 pt-4">
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 transition-colors duration-300 group-hover:text-amber-400/60">
                    Pogledaj
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-400/60"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Corner ornaments */}
              <CornerOrnament className="absolute left-0 top-0 text-amber-400/0 transition-colors duration-500 group-hover:text-amber-400/20" />
              <CornerOrnament className="absolute right-0 top-0 rotate-90 text-amber-400/0 transition-colors duration-500 group-hover:text-amber-400/20" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          data-animate
          className="dishes-animate mt-16 flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-4 opacity-30">
            <span className="h-px w-16 bg-white/20" />
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
            <span className="h-px w-16 bg-white/20" />
          </div>
          <a
            href="#jelovnik"
            className="border border-white/20 bg-transparent px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white/60 transition-all duration-300 hover:border-amber-400 hover:text-amber-400"
          >
            Cijeli Jelovnik
          </a>
        </div>
      </div>

      <style jsx>{`
        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
        }

        .dishes-animate {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }

        .dishes-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}

function StarIcon({ filled, half }: { filled: boolean; half?: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      className="flex-shrink-0"
    >
      <path
        d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
        fill={filled || half ? "#FBBF24" : "transparent"}
        stroke="#FBBF24"
        strokeWidth={filled || half ? "0" : "0.8"}
        opacity={filled ? 1 : half ? 0.5 : 0.25}
      />
    </svg>
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
