import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ognjište | Crnogorski Restoran - Tradicija i Ukus",
  description:
    "Autentična crnogorska kuhinja u srcu Crne Gore. Njeguški pršut, jagnjetina ispod sača, svježi jadranski plodovi mora i domaća vina.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr-Latn-ME">
      <body
        className={`${playfair.variable} ${lato.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
