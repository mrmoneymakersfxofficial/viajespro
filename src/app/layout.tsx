import type { Metadata } from "next";
import { Inter, Playfair_Display, Cinzel } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/context/language-context";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Viajeros VIP | Agencia de Viajes Premium en Perú - Paquetes Exclusivos",
  description:
    "Tu agencia de viajes premium en Perú. Experiencias exclusivas a Machu Picchu, Cusco, Amazonía, Lago Titicaca, Valle Sagrado y más. Reserva ahora con atención VIP 24/7.",
  keywords: [
    "Viajeros VIP",
    "agencia de viajes premium Perú",
    "Machu Picchu tours VIP",
    "paquetes turísticos exclusivos Perú",
    "travel agency Peru",
    "Cusco tours",
    "Amazon rainforest tours",
    "Lake Titicaca tours",
    "Sacred Valley Peru",
    "Rainbow Mountain",
    "Lima food tours",
    "viajes VIP a Perú",
    "luxury tour packages Peru",
    "Perú travel agency",
    "best travel agency Peru",
    "tour operator Peru",
  ],
  authors: [{ name: "Viajeros VIP - Agencia de Viajes Premium" }],
  creator: "Fast Page Pro",
  publisher: "Fast Page Pro",
  metadataBase: new URL("https://www.fastpagepro.com"),
  openGraph: {
    title: "Viajeros VIP | Agencia de Viajes Premium en Perú - Experiencias Exclusivas",
    description:
      "Descubre Perú con experiencias exclusivas VIP a Machu Picchu, Cusco, Amazonía y más. Atención premium 24/7.",
    url: "https://www.fastpagepro.com",
    siteName: "Viajeros VIP - Agencia de Viajes Premium",
    type: "website",
    locale: "es_PE",
    alternateLocale: "en_US",
    images: [
      {
        url: "/images/hero-machupicchu.jpg",
        width: 1344,
        height: 768,
        alt: "Machu Picchu - Viajeros VIP Agencia de Viajes Premium Perú",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viajeros VIP | Agencia de Viajes Premium en Perú",
    description:
      "Experiencias exclusivas VIP a Machu Picchu, Cusco, Amazonía y más. Reserva ahora.",
    images: ["/images/hero-machupicchu.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${cinzel.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
