import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "A Cor da Lavanda — Anatomia de um Filme em 120 Segundos",
  description:
    "Entre a memória de Proust e a sombra de Jung. Uma curta-metragem de 120 segundos sobre a memória, o vazio e a anestesia digital. A ideia... morreu no vidro.",
  keywords: [
    "A Cor da Lavanda",
    "curta-metragem",
    "Jung",
    "Proust",
    "sombra",
    "memória",
    "cinema",
    "anatomia cinematográfica",
  ],
  authors: [{ name: "A Cor da Lavanda" }],
  openGraph: {
    title: "A Cor da Lavanda",
    description:
      "Entre a memória de Proust e a sombra de Jung. 120 segundos. Quatro fases. Uma ideia que morreu no vidro.",
    type: "video.movie",
  },
  twitter: {
    card: "summary_large_image",
    title: "A Cor da Lavanda",
    description:
      "Entre a memória de Proust e a sombra de Jung. 120 segundos de cinema sobre a anestesia digital.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
