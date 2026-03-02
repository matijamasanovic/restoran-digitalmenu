"use client";

import React, { useState, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

type MenuItem = {
  name: string;
  desc: string;
  price: string;
  tag?: string;
  image_url?: string | null;
};

type MenuCategory = {
  id: string;
  label: string;
  subtitle: string;
  items: MenuItem[];
};

const TAG_STYLES: Record<string, string> = {
  Bestseller: "bg-amber-400 text-black",
  "Chef's Choice": "bg-white/10 text-white/80 border border-white/20",
  Tradicija: "bg-amber-950/80 text-amber-400 border border-amber-400/30",
  Svježe: "bg-emerald-950/80 text-emerald-400 border border-emerald-400/30",
  Sezonski: "bg-emerald-950/80 text-emerald-400 border border-emerald-400/30",
  Premium: "bg-white/5 text-white/60 border border-white/15",
  "Za Dvoje": "bg-amber-950/80 text-amber-400 border border-amber-400/30",
  Domaće: "bg-amber-950/80 text-amber-400 border border-amber-400/30",
  Signature: "bg-amber-400 text-black",
  Popularno: "bg-amber-400/20 text-amber-300 border border-amber-400/30",
  Specijalitet: "bg-white/10 text-white/80 border border-white/20",
};

function Diamond({ className }: { className?: string }) {
  return (
    <svg
      width="8"
      height="8"
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

export default function MenuClient({ menu }: { menu: MenuCategory[] }) {
  const [active, setActive] = useState(menu[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const contentRef = useRef<HTMLDivElement | null>(null);

  const filtered = search.trim()
    ? menu
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (item) =>
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.desc.toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter((cat) => cat.items.length > 0)
    : null;

  const handleCategoryClick = (id: string) => {
    setActive(id);
    setSearch("");
    setTimeout(() => {
      contentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const activeCategory = menu.find((c) => c.id === active) ?? menu[0];

  if (menu.length === 0) {
    return (
      <main className="min-h-screen w-full overflow-x-hidden bg-[#0f0d0b]">
        <Navbar />
        <div className="flex items-center justify-center py-40">
          <div className="text-center">
            <Diamond className="mx-auto mb-4 text-amber-400/25" />
            <p className="text-sm text-white/30">Jelovnik se priprema...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#0f0d0b]">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a0907] px-4 pb-10 pt-12 text-center sm:pt-20 sm:pb-14">
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-full max-w-[500px] -translate-x-1/2 rounded-full bg-amber-950/30 blur-[90px]" />
        <div className="relative mx-auto max-w-2xl">
          <div
            className="mb-4 flex items-center justify-center gap-3"
            style={{ animation: "fsu 0.7s ease 0.1s both" }}
          >
            <span className="h-px w-8 bg-amber-400/60" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-amber-400">
              Ognjište · Kotor
            </p>
            <span className="h-px w-8 bg-amber-400/60" />
          </div>
          <h1
            className="font-serif text-[clamp(2rem,8vw,3.8rem)] font-bold leading-[1.06] tracking-tight text-white"
            style={{ animation: "fsu 0.8s ease 0.25s both" }}
          >
            <span className="block">Jelovnik</span>
            <span className="block italic text-amber-100/75">Naša Ponuda</span>
          </h1>
          <p
            className="mx-auto mt-4 max-w-sm text-[13px] leading-relaxed text-white/40"
            style={{ animation: "fsu 0.8s ease 0.4s both" }}
          >
            Cijene u eurima · PDV uključen · Svježe lokalne namirnice svaki dan
          </p>
        </div>
      </section>

      {/* STICKY NAV STRIP */}
      <div className="sticky top-0 z-30 border-b border-white/8 bg-[#0f0d0b]/97 backdrop-blur-md">
        {/* Search row */}
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative flex items-center border-b border-white/6">
            <svg
              className="absolute left-0 h-4 w-4 shrink-0 text-white/25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pretražite jelovnik..."
              className="w-full bg-transparent py-3 pl-7 pr-8 text-[13px] text-white/70 outline-none placeholder:text-white/25"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-0 p-2 text-white/30 active:text-white/60"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category pills */}
        {!search && (
          <div className="scrollbar-hide w-full overflow-x-auto">
            <div className="flex">
              {menu.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`shrink-0 border-b-2 px-3.5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-200 sm:px-5 sm:text-[11px] ${
                    active === cat.id && !search
                      ? "border-amber-400 text-amber-400"
                      : "border-transparent text-white/30 active:text-white/60"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MAIN LAYOUT */}
      <div className="mx-auto w-full max-w-7xl overflow-hidden lg:flex">
        {/* Desktop sidebar */}
        <aside className="hidden w-52 shrink-0 border-r border-white/6 lg:block">
          <div className="sticky top-[113px] py-8 pl-6 pr-4">
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-amber-400/40">
              Kategorije
            </p>
            <nav className="flex flex-col">
              {menu.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`flex items-center justify-between py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.13em] transition-colors duration-200 ${
                    active === cat.id
                      ? "text-amber-400"
                      : "text-white/30 hover:text-white/65"
                  }`}
                >
                  <span>{cat.label}</span>
                  {active === cat.id && <Diamond className="text-amber-400" />}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div
          ref={contentRef}
          className="w-full min-w-0 flex-1 scroll-mt-28 overflow-hidden px-4 pb-20 pt-8 sm:px-6 lg:px-10"
        >
          {filtered ? (
            <SearchResults categories={filtered} query={search} />
          ) : (
            <CategoryView category={activeCategory} />
          )}
        </div>
      </div>

      <Footer />

      <style jsx global>{`
        .grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
        }
        * {
          box-sizing: border-box;
        }
        body {
          overflow-x: hidden;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes fsu {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes itemIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .item-in {
          animation: itemIn 0.32s ease both;
        }
      `}</style>
    </main>
  );
}

function CategoryView({ category }: { category: MenuCategory }) {
  return (
    <div>
      <div className="mb-6 border-b border-white/8 pb-5">
        {category.subtitle && (
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-amber-400/60">
            {category.subtitle}
          </p>
        )}
        <h2 className="font-serif text-[clamp(1.6rem,5vw,2.5rem)] font-bold leading-tight text-white">
          {category.label}
        </h2>
      </div>
      <div className="flex flex-col">
        {category.items.map((item, i) => (
          <MenuItemRow key={item.name} item={item} index={i} />
        ))}
      </div>
      <div className="mb-8 mt-10 flex items-start gap-3 border-t border-white/6 pt-6">
        <Diamond className="mt-0.5 shrink-0 text-amber-400/25" />
        <p className="text-[11px] italic leading-relaxed text-white/25">
          Obavijestite osoblje o alergijama. Jela možemo prilagoditi po vašim
          potrebama.
        </p>
      </div>
    </div>
  );
}

function SearchResults({
  categories,
  query,
}: {
  categories: MenuCategory[];
  query: string;
}) {
  const total = categories.reduce((acc, c) => acc + c.items.length, 0);
  if (total === 0) {
    return (
      <div className="py-20 text-center">
        <Diamond className="mx-auto mb-4 text-amber-400/25" />
        <p className="text-sm text-white/30">Nema rezultata za „{query}"</p>
      </div>
    );
  }
  return (
    <div>
      <div className="mb-6 border-b border-white/8 pb-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/30">
          {total} rezultat{total !== 1 ? "a" : ""} za{" "}
          <span className="text-amber-400/60">„{query}"</span>
        </p>
      </div>
      {categories.map((cat) => (
        <div key={cat.id} className="mb-8">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-400/50">
            {cat.label}
          </p>
          {cat.items.map((item, i) => (
            <MenuItemRow key={item.name} item={item} index={i} />
          ))}
        </div>
      ))}
    </div>
  );
}

function MenuItemRow({ item, index }: { item: MenuItem; index: number }) {
  return (
    <div
      className="item-in group relative border-b border-dashed border-white/[0.06] py-4 last:border-b-0"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-amber-400/40 transition-transform duration-300 group-hover:scale-y-100" />
      <div className="pl-3 pr-3 sm:pl-5 sm:pr-5">
        <div className="flex items-start gap-3">
          {/* Thumbnail — only shown if image exists */}
          {item.image_url && (
            <img
              src={item.image_url}
              alt={item.name}
              className="h-14 w-14 shrink-0 rounded-md object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1 overflow-hidden">
                <h3 className="break-words font-serif text-[14px] font-bold leading-snug text-white/90 group-hover:text-amber-50">
                  {item.name}
                </h3>
                {item.tag && (
                  <span
                    className={`mt-1 inline-block rounded-[2px] px-1.5 py-px text-[9px] font-bold uppercase tracking-[0.1em] ${
                      TAG_STYLES[item.tag] ?? "bg-white/10 text-white/60"
                    }`}
                  >
                    {item.tag}
                  </span>
                )}
              </div>
              {item.price && (
                <span className="ml-2 shrink-0 font-serif text-[14px] font-bold text-amber-400">
                  €{item.price}
                </span>
              )}
            </div>
            {item.desc && (
              <p className="mt-2 text-[12px] leading-relaxed text-white/30">
                {item.desc}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
