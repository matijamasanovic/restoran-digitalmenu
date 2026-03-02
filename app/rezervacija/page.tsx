"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
type FormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  note: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

/* ─────────────────────────────────────────
   SHARED UTILS
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function RezervacijaPage() {
  return (
    <main className="rezervacija-root bg-[#0f0d0b]">
      <Navbar />
      <PageHero />
      <FormSection />
      <InfoStrip />
      <Footer />

      <style jsx global>{`
        .rezervacija-root {
          min-height: 100vh;
        }

        .grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
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

        /* Form field base */
        .field-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.85);
          font-size: 13px;
          padding: 14px 16px;
          outline: none;
          transition: border-color 0.3s ease, background 0.3s ease;
          appearance: none;
          -webkit-appearance: none;
        }
        .field-input::placeholder {
          color: rgba(255, 255, 255, 0.25);
        }
        .field-input:focus {
          border-color: rgba(251, 191, 36, 0.5);
          background: rgba(255, 255, 255, 0.05);
        }
        .field-input option {
          background: #1a1713;
          color: rgba(255, 255, 255, 0.85);
        }

        /* Reveal */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
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
        window.scrollY * 0.3
      }px) scale(1.1)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden">
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/hero-bg.jpg"
          alt="Rezervacija – Ognjište"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/65 to-[#0f0d0b]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay" />

      <div className="absolute inset-6 border border-white/8 md:inset-10" />
      <div className="absolute inset-8 border border-white/4 md:inset-14" />
      <CornerOrnament className="absolute left-6 top-6 text-white/20 md:left-10 md:top-10" />
      <CornerOrnament className="absolute right-6 top-6 rotate-90 text-white/20 md:right-10 md:top-10" />
      <CornerOrnament className="absolute bottom-6 left-6 -rotate-90 text-white/20 md:bottom-10 md:left-10" />
      <CornerOrnament className="absolute bottom-6 right-6 rotate-180 text-white/20 md:bottom-10 md:right-10" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center md:px-10">
        <div
          className="mb-6 flex items-center justify-center gap-4"
          style={{ animation: "fadeSlideUp 0.8s ease 0.2s both" }}
        >
          <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
            Ognjište
          </p>
          <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
        </div>

        <h1
          className="font-serif text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.06] tracking-tight text-white"
          style={{ animation: "fadeSlideUp 0.9s ease 0.4s both" }}
        >
          <span className="block">Rezervacija</span>
          <span className="block italic text-amber-100/80">Stola</span>
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
          className="mx-auto max-w-md text-[15px] leading-relaxed text-white/50"
          style={{ animation: "fadeSlideUp 0.9s ease 0.85s both" }}
        >
          Rezervišite sto i osigurajte sebi nezaboravan gastronomski doživljaj u
          srcu crnogorske tradicije.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SECTION: FORM
───────────────────────────────────────── */
function FormSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    occasion: "",
    note: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-animate]").forEach((el, i) => {
              (el as HTMLElement).style.transitionDelay = `${i * 0.1}s`;
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

  const update =
    (field: keyof FormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate async submit
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0f0d0b] py-20 lg:py-28"
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-amber-950/20 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_420px] lg:gap-24">
          {/* ── Form ── */}
          <div>
            <div data-animate className="reveal mb-10">
              <div className="mb-5 flex items-center gap-4">
                <span className="h-px w-8 bg-amber-400/70 sm:w-16" />
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
                  Napravite Rezervaciju
                </p>
              </div>
              <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight text-white">
                <span className="block">Popunite Formu</span>
                <span className="block italic text-amber-100/70">
                  Odgovorićemo u 24h
                </span>
              </h2>
            </div>

            {status === "success" ? (
              <SuccessState />
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Row 1: Name + Email */}
                <div data-animate className="reveal grid gap-4 sm:grid-cols-2">
                  <FieldGroup label="Ime i Prezime" required>
                    <input
                      className="field-input"
                      type="text"
                      placeholder="Npr. Milena Vukčević"
                      value={form.name}
                      onChange={update("name")}
                      required
                    />
                  </FieldGroup>
                  <FieldGroup label="Email Adresa" required>
                    <input
                      className="field-input"
                      type="email"
                      placeholder="vas@email.com"
                      value={form.email}
                      onChange={update("email")}
                      required
                    />
                  </FieldGroup>
                </div>

                {/* Row 2: Phone + Guests */}
                <div
                  data-animate
                  className="reveal mt-4 grid gap-4 sm:grid-cols-2"
                >
                  <FieldGroup label="Broj Telefona" required>
                    <input
                      className="field-input"
                      type="tel"
                      placeholder="+382 XX XXX XXX"
                      value={form.phone}
                      onChange={update("phone")}
                      required
                    />
                  </FieldGroup>
                  <FieldGroup label="Broj Gostiju" required>
                    <select
                      className="field-input"
                      value={form.guests}
                      onChange={update("guests")}
                      required
                    >
                      <option value="">Odaberite broj gostiju</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "gost" : n < 5 ? "gosta" : "gostiju"}
                        </option>
                      ))}
                      <option value="11+">
                        11+ gostiju (grupna rezervacija)
                      </option>
                    </select>
                  </FieldGroup>
                </div>

                {/* Row 3: Date + Time */}
                <div
                  data-animate
                  className="reveal mt-4 grid gap-4 sm:grid-cols-2"
                >
                  <FieldGroup label="Datum" required>
                    <input
                      className="field-input"
                      type="date"
                      value={form.date}
                      onChange={update("date")}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </FieldGroup>
                  <FieldGroup label="Vrijeme" required>
                    <select
                      className="field-input"
                      value={form.time}
                      onChange={update("time")}
                      required
                    >
                      <option value="">Odaberite termin</option>
                      {[
                        "10:00",
                        "11:00",
                        "12:00",
                        "13:00",
                        "14:00",
                        "15:00",
                        "16:00",
                        "17:00",
                        "18:00",
                        "19:00",
                        "20:00",
                        "21:00",
                        "22:00",
                      ].map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </FieldGroup>
                </div>

                {/* Row 4: Occasion */}
                <div data-animate className="reveal mt-4">
                  <FieldGroup label="Posebna Prilika">
                    <select
                      className="field-input"
                      value={form.occasion}
                      onChange={update("occasion")}
                    >
                      <option value="">Nijedna posebna prilika</option>
                      <option value="birthday">Rođendan</option>
                      <option value="anniversary">Godišnjica</option>
                      <option value="business">Poslovni ručak / večera</option>
                      <option value="wedding">Proslava vjenčanja</option>
                      <option value="other">Ostalo</option>
                    </select>
                  </FieldGroup>
                </div>

                {/* Row 5: Note */}
                <div data-animate className="reveal mt-4">
                  <FieldGroup label="Napomena">
                    <textarea
                      className="field-input resize-none"
                      rows={4}
                      placeholder="Alergije, posebni zahtjevi, dekoracija..."
                      value={form.note}
                      onChange={update("note")}
                    />
                  </FieldGroup>
                </div>

                {/* Submit */}
                <div data-animate className="reveal mt-8">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="relative overflow-hidden border border-amber-400 bg-amber-400 px-12 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-amber-400 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <span className="flex items-center gap-3">
                        <LoadingSpinner />
                        Slanje...
                      </span>
                    ) : (
                      "Pošaljite Rezervaciju"
                    )}
                  </button>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.15em] text-white/25">
                    * Potvrda stiže na email u roku od 24 sata
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* ── Sidebar info ── */}
          <div data-animate className="reveal">
            <div className="sticky top-24 flex flex-col gap-6">
              {/* Contact card */}
              <div className="relative border border-white/10 bg-white/[0.03] p-7">
                <CornerOrnament className="absolute left-0 top-0 text-amber-400/20" />
                <CornerOrnament className="absolute right-0 top-0 rotate-90 text-amber-400/20" />

                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-400">
                  Direktan Kontakt
                </p>

                <div className="flex flex-col gap-5">
                  <a
                    href="tel:+38220123456"
                    className="group flex items-center gap-4"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-white/10 text-amber-400/70 transition-colors duration-300 group-hover:border-amber-400/40 group-hover:text-amber-400">
                      <PhoneIcon />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                        Telefon
                      </p>
                      <p className="mt-0.5 font-serif text-sm font-bold text-white/80 transition-colors duration-300 group-hover:text-amber-400">
                        +382 20 123 456
                      </p>
                    </div>
                  </a>

                  <div className="h-px bg-white/6" />

                  <a
                    href="mailto:rezervacije@ognjiste.me"
                    className="group flex items-center gap-4"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-white/10 text-amber-400/70 transition-colors duration-300 group-hover:border-amber-400/40 group-hover:text-amber-400">
                      <MailIcon />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                        Email
                      </p>
                      <p className="mt-0.5 font-serif text-sm font-bold text-white/80 transition-colors duration-300 group-hover:text-amber-400">
                        rezervacije@ognjiste.me
                      </p>
                    </div>
                  </a>

                  <div className="h-px bg-white/6" />

                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-white/10 text-amber-400/70">
                      <MapPinIcon />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                        Adresa
                      </p>
                      <p className="mt-0.5 text-sm leading-snug text-white/60">
                        Stari Grad bb,
                        <br />
                        85330 Kotor
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours card */}
              <div className="relative border border-white/10 bg-white/[0.03] p-7">
                <CornerOrnament className="absolute left-0 top-0 text-amber-400/20" />
                <CornerOrnament className="absolute right-0 top-0 rotate-90 text-amber-400/20" />

                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-400">
                  Radno Vrijeme
                </p>

                {[
                  { days: "Pon – Pet", hours: "10:00 – 23:00" },
                  { days: "Sub – Ned", hours: "09:00 – 00:00" },
                ].map((row) => (
                  <div
                    key={row.days}
                    className="flex items-center justify-between border-b border-white/6 py-3.5 last:border-b-0"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/45">
                      {row.days}
                    </span>
                    <span className="font-serif text-sm font-bold text-amber-400">
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>

              {/* Note card */}
              <div className="border-l-2 border-amber-400/40 bg-amber-400/[0.04] py-5 pl-5 pr-6">
                <Diamond className="mb-3 text-amber-400/50" />
                <p className="text-[13px] italic leading-relaxed text-white/50">
                  Za grupe od 10 ili više osoba nudimo do 20% popusta.
                  Kontaktirajte nas direktno za grupne rezervacije.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SECTION: INFO STRIP
───────────────────────────────────────── */
function InfoStrip() {
  const items = [
    {
      icon: <CalendarIcon />,
      label: "Besplatno otkazivanje",
      desc: "Do 24h unaprijed",
    },
    { icon: <UsersIcon />, label: "Grupe dobrodošle", desc: "Do 120 mjesta" },
    {
      icon: <StarIcon />,
      label: "Posebne prilike",
      desc: "Dekoracija po dogovoru",
    },
    {
      icon: <ClockIcon />,
      label: "Svaki dan otvoreno",
      desc: "Od 10:00 do ponoći",
    },
  ];

  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-animate]").forEach((el, i) => {
              (el as HTMLElement).style.transitionDelay = `${i * 0.1}s`;
              el.classList.add("animate-in");
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-white/6 bg-[#0a0907] py-16"
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-0 border border-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.label}
              data-animate
              className={`reveal group flex items-start gap-4 p-7 transition-all duration-500 hover:bg-amber-400/[0.04] ${
                i < items.length - 1
                  ? "border-b border-white/8 lg:border-b-0 lg:border-r"
                  : ""
              } ${
                i === 1
                  ? "sm:border-b sm:border-r-0 lg:border-b-0 lg:border-r"
                  : ""
              }`}
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-white/10 text-amber-400/60 transition-all duration-300 group-hover:border-amber-400/30 group-hover:text-amber-400">
                {item.icon}
              </div>
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-white/70">
                  {item.label}
                </p>
                <p className="mt-1 text-[12px] text-white/35">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────── */
function FieldGroup({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
        {label}
        {required && <span className="ml-1 text-amber-400">*</span>}
      </label>
      {children}
    </div>
  );
}

function SuccessState() {
  return (
    <div className="flex flex-col items-start gap-6 border border-amber-400/20 bg-amber-400/[0.04] p-10">
      <div className="flex h-14 w-14 items-center justify-center border border-amber-400/40 bg-amber-400/10">
        <svg
          width="22"
          height="18"
          viewBox="0 0 22 18"
          fill="none"
          className="text-amber-400"
        >
          <path
            d="M1 9L8 16L21 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <h3 className="font-serif text-2xl font-bold text-white">
          Rezervacija Primljena!
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-white/50">
          Hvala vam na rezervaciji. Potvrdu ćete dobiti na vašu email adresu u
          roku od 24 sata. Radujemo se vašem dolasku!
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Diamond className="text-amber-400/50" />
        <span className="text-[11px] uppercase tracking-[0.2em] text-amber-400/70">
          Ognjište vas čeka
        </span>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────
   INLINE ICONS
───────────────────────────────────────── */
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
function MapPinIcon() {
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
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function CalendarIcon() {
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
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function UsersIcon() {
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
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className="text-current"
    >
      <path
        d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}
function ClockIcon() {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  );
}
