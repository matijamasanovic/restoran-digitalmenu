"use client";

import { useEffect, useRef } from "react";

export function MenuOfTheDay() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-animate]").forEach((el, i) => {
              (el as HTMLElement).style.animationDelay = `${i * 0.1}s`;
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

  const menuItems = [
    {
      category: "Predjela",
      icon: "✦",
      items: [
        {
          name: "Njeguški Pršut sa Sirom",
          desc: "Domaći sušeni pršut iz Njeguša sa njeguškm sirom, maslinama i domaćim hljebom",
          price: "8.50",
        },
        {
          name: "Priganice sa Medom i Sirom",
          desc: "Tradicionalne crnogorske priganice prelivene medom i posute domaćim svježim sirom",
          price: "5.50",
        },
        {
          name: "Japrak (Sarma od Lozova Lista)",
          desc: "Listovi vinove loze punjeni miješanim mesom i pirinačem, kuvani na lagano",
          price: "7.00",
        },
      ],
    },
    {
      category: "Glavna Jela",
      icon: "✦",
      items: [
        {
          name: "Jagnjetina Ispod Sača",
          desc: "Mlada jagnjetina pečena ispod sača sa krompirima i povrćem, savršeno mekana",
          price: "16.00",
        },
        {
          name: "Njeguški Štek",
          desc: "Teleći štek punjen njeguškm pršutom i sirom, na žaru, sa prilogom",
          price: "14.50",
        },
        {
          name: "Ćevapi sa Kajmakom",
          desc: "10 komada domaćih ćevapa sa kajmakom, lukom i domaćom lepinjom",
          price: "9.00",
        },
      ],
    },
    {
      category: "Morski Specijaliteti",
      icon: "✦",
      items: [
        {
          name: "Orada na Žaru",
          desc: "Svježa jadranska orada pečena na žaru sa limunom, maslinovim uljem i travama",
          price: "18.00",
        },
        {
          name: "Crni Rižoto",
          desc: "Tradicionalni jadranski crni rižoto sa plodovima mora i maslinovim uljem",
          price: "13.50",
        },
        {
          name: "Buzara od Škampi",
          desc: "Jadransku škampi u tradicinalnom buzara sosu sa bijelim vinom i česnjakom",
          price: "22.00",
        },
      ],
    },
  ];

  return (
    <section
      id="jelovnik"
      ref={sectionRef}
      className="menu-section relative overflow-hidden bg-[#0f0d0b] py-24 lg:py-36"
    >
      {/* Grain overlay */}
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-950/30 blur-[140px]" />

      {/* Top decorative rule */}
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
          className="menu-animate mb-20 flex flex-col items-center text-center"
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
            <p className="font-display text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
              Nedeljni Specijaliteti
            </p>
            <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
          </div>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.8rem)] font-bold leading-[1.08] tracking-tight text-white">
            <span className="block">Jelovnik</span>
            <span className="block italic text-amber-100/80">Dana</span>
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
          <p className="max-w-md text-sm leading-relaxed text-white/40 uppercase tracking-[0.15em]">
            Svaki dan biramo svježe namirnice od lokalnih proizvođača
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid gap-0 lg:grid-cols-3">
          {menuItems.map((category, colIdx) => (
            <div
              key={category.category}
              data-animate
              className={`menu-animate relative px-0 lg:px-10 ${
                colIdx > 0 ? "lg:border-l lg:border-white/10" : ""
              } ${
                colIdx < menuItems.length - 1
                  ? "mb-16 border-b border-white/10 pb-16 lg:mb-0 lg:border-b-0 lg:pb-0"
                  : ""
              }`}
            >
              {/* Category Header */}
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-amber-400/40">
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
                </div>
                <h3 className="font-serif text-lg font-bold uppercase tracking-[0.15em] text-white">
                  {category.category}
                </h3>
              </div>

              {/* Items */}
              <div className="flex flex-col gap-0">
                {category.items.map((item, itemIdx) => (
                  <div
                    key={item.name}
                    data-animate
                    className={`menu-animate group relative py-7 ${
                      itemIdx < category.items.length - 1
                        ? "border-b border-dashed border-white/10"
                        : ""
                    }`}
                  >
                    {/* Hover accent line */}
                    <div className="absolute left-0 top-0 h-full w-0 bg-amber-400/5 transition-all duration-500 group-hover:w-full" />

                    <div className="relative">
                      {/* Name + Price row */}
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="font-serif text-[15px] font-semibold leading-snug text-white/90 transition-colors duration-300 group-hover:text-amber-100">
                          {item.name}
                        </h4>
                        {/* Dotted leader + price */}
                        <div className="mt-0.5 flex flex-shrink-0 items-center gap-2">
                          <span className="hidden w-12 border-b border-dashed border-white/15 sm:block" />
                          <span className="font-serif text-base font-bold text-amber-400">
                            €{item.price}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-2 text-[13px] leading-relaxed text-white/35">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          data-animate
          className="menu-animate mt-20 flex flex-col items-center gap-6 text-center"
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
          <p className="text-xs uppercase tracking-[0.3em] text-white/30">
            Cijene su izražene u eurima · PDV uključen
          </p>
          <a
            href="#rezervacija"
            className="border border-amber-400 bg-amber-400 px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-amber-400"
          >
            Rezervišite Sto
          </a>
        </div>
      </div>

      <style jsx>{`
        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
        }

        .menu-animate {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }

        .menu-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
