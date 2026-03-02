"use client"

import { useState } from "react"

export function ReservationForm() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="rezervacija" className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-primary">
            Rezervacija
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Rezervišite Vaš Sto
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Osigurajte svoje mjesto za nezaboravan gastronomski doživljaj. Za veće
            grupe ili posebne događaje, pozovite nas direktno.
          </p>
        </div>

        {submitted ? (
          <div className="mt-12 rounded-sm bg-card p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl">{'✓'}</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground">
              Hvala Vam!
            </h3>
            <p className="mt-2 text-muted-foreground">
              Vaša rezervacija je primljena. Potvrdićemo je putem telefona u
              najkraćem roku.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
            className="mt-12 rounded-sm bg-card p-8 shadow-sm lg:p-10"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-foreground">
                  Ime i Prezime
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Vaše ime"
                  className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-foreground">
                  Telefon
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="+382 ..."
                  className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="date" className="mb-2 block text-sm font-semibold text-foreground">
                  Datum
                </label>
                <input
                  id="date"
                  type="date"
                  required
                  className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="time" className="mb-2 block text-sm font-semibold text-foreground">
                  Vrijeme
                </label>
                <select
                  id="time"
                  required
                  className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Izaberite vrijeme</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                </select>
              </div>
              <div>
                <label htmlFor="guests" className="mb-2 block text-sm font-semibold text-foreground">
                  Broj Gostiju
                </label>
                <select
                  id="guests"
                  required
                  className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Izaberite</option>
                  <option value="1">1 Osoba</option>
                  <option value="2">2 Osobe</option>
                  <option value="3">3 Osobe</option>
                  <option value="4">4 Osobe</option>
                  <option value="5">5 Osoba</option>
                  <option value="6">6 Osoba</option>
                  <option value="8">8 Osoba</option>
                  <option value="10+">10+ Osoba</option>
                </select>
              </div>
              <div>
                <label htmlFor="occasion" className="mb-2 block text-sm font-semibold text-foreground">
                  Povod
                </label>
                <select
                  id="occasion"
                  className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Izaberite (opcionalno)</option>
                  <option value="birthday">Rođendan</option>
                  <option value="anniversary">Godišnjica</option>
                  <option value="business">Poslovni Ručak</option>
                  <option value="family">Porodično Okupljanje</option>
                  <option value="other">Drugo</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="message" className="mb-2 block text-sm font-semibold text-foreground">
                Napomena
              </label>
              <textarea
                id="message"
                rows={3}
                placeholder="Posebni zahtjevi, alergije na hranu, itd."
                className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="mt-8 w-full rounded-sm bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Pošaljite Rezervaciju
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
