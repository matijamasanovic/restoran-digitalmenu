"use client";

export function Footer() {
  const quickLinks = [
    { label: "Početna", href: "/" },
    { label: "O Nama", href: "/o-nama" },
    { label: "Menu", href: "/menu" },
  ];

  return (
    <footer
      id="kontakt"
      className="footer-section relative overflow-hidden bg-[#0a0907]"
    >
      {/* Grain overlay */}
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-overlay" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-amber-950/20 blur-[120px]" />

      {/* Top decorative rule */}
      <div className="relative flex items-center gap-4 px-10 opacity-40">
        <span className="h-px flex-1 bg-white/15" />
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
        <span className="h-px flex-1 bg-white/15" />
      </div>

      {/* Main content */}
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-28">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4">
          {/* ── Brand ── */}
          <div>
            <a href="/" className="group flex items-center gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-amber-400/40 transition-colors duration-300 group-hover:border-amber-400">
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
              <span className="font-serif text-xl font-bold tracking-wider text-white">
                Ognjište
              </span>
            </a>

            <p className="mt-5 text-sm leading-relaxed text-white/40">
              Autentična crnogorska kuhinja u srcu Boke Kotorske. Tradicija,
              kvalitet i nezaboravni ukusi od 1987. godine.
            </p>

            {/* Social icons */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group/icon flex h-9 w-9 items-center justify-center border border-white/10 text-white/40 transition-all duration-300 hover:border-amber-400/40 hover:text-amber-400"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group/icon flex h-9 w-9 items-center justify-center border border-white/10 text-white/40 transition-all duration-300 hover:border-amber-400/40 hover:text-amber-400"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-400">
              Brzi Linkovi
            </h4>
            <div className="mb-6 mt-3 h-px w-8 bg-amber-400/30" />
            <ul className="flex flex-col gap-0">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center justify-between border-b border-white/5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40 transition-colors duration-300 hover:text-amber-400"
                  >
                    <span>{link.label}</span>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="opacity-40"
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
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-400">
              Kontakt
            </h4>
            <div className="mb-6 mt-3 h-px w-8 bg-amber-400/30" />
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center border border-white/10 text-amber-400/70">
                  <MapPinIcon />
                </div>
                <span className="text-sm leading-relaxed text-white/40">
                  Stari Grad bb, 85330 Kotor,
                  <br />
                  Crna Gora
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center border border-white/10 text-amber-400/70">
                  <PhoneIcon />
                </div>
                <a
                  href="tel:+38220123456"
                  className="text-sm text-white/40 transition-colors hover:text-amber-400"
                >
                  +382 20 123 456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center border border-white/10 text-amber-400/70">
                  <MailIcon />
                </div>
                <a
                  href="mailto:info@ognjiste.me"
                  className="text-sm text-white/40 transition-colors hover:text-amber-400"
                >
                  info@ognjiste.me
                </a>
              </li>
            </ul>
          </div>

          {/* ── Working Hours ── */}
          <div>
            <h4 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-400">
              Radno Vrijeme
            </h4>
            <div className="mb-6 mt-3 h-px w-8 bg-amber-400/30" />
            <ul className="flex flex-col gap-0">
              {[
                { days: "Pon – Pet", hours: "10:00 – 23:00" },
                { days: "Sub – Ned", hours: "09:00 – 00:00" },
              ].map((row) => (
                <li
                  key={row.days}
                  className="flex items-center justify-between border-b border-white/5 py-4"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
                    {row.days}
                  </span>
                  <span className="font-serif text-sm font-bold text-amber-400">
                    {row.hours}
                  </span>
                </li>
              ))}
            </ul>

            {/* Reservation CTA */}
            <a
              href="/rezervacija"
              className="mt-8 block border border-amber-400 bg-amber-400 py-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-amber-400"
            >
              Rezervišite Sto
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-[11px] uppercase tracking-[0.15em] text-white/25 md:flex-row md:px-10">
          <p>© 2026 Ognjište. Sva prava zadržana.</p>
          <div className="flex items-center gap-3">
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
            <p>Napravljeno sa ljubavlju u Crnoj Gori</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
        }
      `}</style>
    </footer>
  );
}

/* ── Inline SVG icons ── */
function InstagramIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="11"
      height="11"
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
      width="11"
      height="11"
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
