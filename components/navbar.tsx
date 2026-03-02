"use client";

import { useState, useEffect } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Početna", href: "/" },
    { label: "O Nama", href: "/o-nama" },
    { label: "Menu", href: "/menu" },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="relative z-50 bg-amber-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 md:px-10">
          <div className="hidden items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70 md:flex">
            <a
              href="mailto:info@ognjiste.me"
              className="flex items-center gap-2 transition-colors hover:text-black"
            >
              <MailIcon />
              info@ognjiste.me
            </a>
            <span className="h-3 w-px bg-black/20" />
            <span className="flex items-center gap-2">
              <ClockIcon />
              Pon – Ned: 10:00 – 23:00
            </span>
          </div>
          <a
            href="tel:+38220123456"
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-70"
          >
            <PhoneIcon />
            +382 20 123 456
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 border-b border-white/8 bg-[#0f0d0b] ${
          scrolled ? "shadow-[0_4px_40px_rgba(0,0,0,0.6)]" : ""
        }`}
      >
        {/* Grain overlay */}
        <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          {/* Logo */}
          <a href="/" className="group flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center border border-amber-400/40 transition-colors duration-300 group-hover:border-amber-400">
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
            <span className="font-serif text-xl font-bold tracking-wider text-white transition-colors duration-300 group-hover:text-amber-100">
              Ognjište
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link relative text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 hover:text-amber-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="/rezervacija"
            className="hidden border border-amber-400 bg-amber-400 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-amber-400 md:inline-block"
          >
            Rezervišite Sto
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex h-9 w-9 items-center justify-center border border-white/10 text-white/60 transition-colors duration-300 hover:border-amber-400/40 hover:text-amber-400 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`absolute block h-px w-4 bg-current transition-all duration-300 ${
                isOpen ? "rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              className={`absolute block h-px bg-current transition-all duration-300 ${
                isOpen ? "w-0 opacity-0" : "w-4 opacity-100"
              }`}
            />
            <span
              className={`absolute block h-px w-4 bg-current transition-all duration-300 ${
                isOpen ? "-rotate-45" : "translate-y-1"
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="relative border-t border-white/8 bg-[#0f0d0b] px-6 pb-8 pt-6">
            {/* Grain in mobile menu */}
            <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" />

            <ul className="relative flex flex-col gap-1">
              {links.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between border-b border-white/5 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 hover:text-amber-400"
                  >
                    <span>{link.label}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="opacity-30"
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
                </li>
              ))}
            </ul>

            <div className="relative mt-6 flex flex-col gap-3">
              <a
                href="/rezervacija"
                onClick={() => setIsOpen(false)}
                className="border border-amber-400 bg-amber-400 py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-amber-400"
              >
                Rezervišite Sto
              </a>
              <a
                href="tel:+38220123456"
                className="flex items-center justify-center gap-2 border border-white/10 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 transition-colors duration-300 hover:border-amber-400/30 hover:text-amber-400"
              >
                <PhoneIcon />
                +382 20 123 456
              </a>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: #fbbf24;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
}

/* ── Inline icon components (no Lucide dependency) ── */
function PhoneIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  );
}
