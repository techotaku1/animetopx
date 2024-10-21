import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import { NavigationEvents } from "@/components/navigation-events";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AnimeTopX",
  description:
    "Tu fuente confiable para las últimas noticias y actualizaciones del mundo del anime",
  keywords:
    "anime, noticias, manga, japón, otaku, top animes,top, animes verano, animes primavera, animes otoño, animes invierno",
  openGraph: {
    title: "AnimeTopX",
    description:
      "Tu fuente confiable para las últimas noticias y actualizaciones del mundo del anime",
    url: "https://animetopx.vercel.app",
    siteName: "AnimeTopX",
    images: [
      {
        url: "https://animetopx.vercel.app/OTOÑO-2024/PORTADA1.webp",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnimeTopX",
    description:
      "Tu fuente confiable para las últimas noticias y actualizaciones del mundo del anime",
    images: ["https://animetopx.vercel.app/OTOÑO-2024/PORTADA1.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
            <Suspense fallback={null}>
              <NavigationEvents />
            </Suspense>
            <Analytics />
            <SpeedInsights />
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
