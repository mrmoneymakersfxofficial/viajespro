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
  title: "ViajesPRO | Agencia de Viajes en Perú - Paquetes Turísticos a Machu Picchu, Cusco y más",
  description:
    "Tu agencia de viajes de confianza en Perú. Paquetes turísticos exclusivos a Machu Picchu, Cusco, Amazonía, Lago Titicaca, Valle Sagrado y más. Reserva ahora con atención 24/7.",
  keywords: [
    "agencia de viajes Perú",
    "Machu Picchu tours",
    "paquetes turísticos Perú",
    "travel agency Peru",
    "Cusco tours",
    "Amazon rainforest tours",
    "Lake Titicaca tours",
    "Sacred Valley Peru",
    "Rainbow Mountain",
    "Lima food tours",
    "viajes a Perú",
    "tour packages Peru",
    "Perú travel agency",
    "best travel agency Peru",
    "tour operator Peru",
  ],
  authors: [{ name: "ViajesPRO - Agencia de Viajes" }],
  creator: "Fast Page Pro",
  publisher: "Fast Page Pro",
  metadataBase: new URL("https://www.fastpagepro.com"),
  openGraph: {
    title: "ViajesPRO | Agencia de Viajes en Perú - Paquetes Turísticos Exclusivos",
    description:
      "Descubre Perú con paquetes turísticos exclusivos a Machu Picchu, Cusco, Amazonía y más. Los mejores precios y atención 24/7.",
    url: "https://www.fastpagepro.com",
    siteName: "ViajesPRO - Agencia de Viajes",
    type: "website",
    locale: "es_PE",
    alternateLocale: "en_US",
    images: [
      {
        url: "/images/hero-machupicchu.jpg",
        width: 1344,
        height: 768,
        alt: "Machu Picchu - ViajesPRO Agencia de Viajes Perú",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ViajesPRO | Agencia de Viajes en Perú",
    description:
      "Paquetes turísticos exclusivos a Machu Picchu, Cusco, Amazonía y más. Reserva ahora.",
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
