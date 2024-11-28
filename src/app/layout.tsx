import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css"; // Asegúrate de que aquí tienes los estilos globales
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import { NavigationEvents } from "@/components/navigation-events";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CustomProgressBar from "@/components/ProgressBar";
import Script from "next/script";
import { Shantell_Sans, Grandstander } from "next/font/google";
import { Breadcrumbs } from './components/ui/breadcrumbs'


const shantellSans = Shantell_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-shantell-sans',
    weight: ['700'],

});

const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grandstander',
  weight: ['400'],  

  
});

export const metadata: Metadata = {
  title: "AnimeTopX",
  description:
    "Tu fuente confiable para las últimas noticias y actualizaciones del mundo del anime",
  keywords:
    "anime, noticias, manga, japón, otaku, top animes, animes verano, animes primavera, animes otoño, animes invierno",
  openGraph: {
    title: "AnimeTopX",
    description:
      "Tu fuente confiable para las últimas noticias y actualizaciones del mundo del anime",
    url: "https://animetopx.vercel.app",
    siteName: "AnimeTopX",
    images: [
      {
        url: "https://animetopx.vercel.app/PORTADA-PRINCIPAL.webp",
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
    images: ["https://animetopx.vercel.app/PORTADA-PRINCIPAL.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${shantellSans.variable} ${grandstander.variable}`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="AGpNPOb2L1Z4p1pOdNGsInrVPMiVKBk020FAa0TxGV0"
        />
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive" // Ejecuta después de que la página se haya cargado
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AnimeTopX",
              url: "https://animetopx.vercel.app",
              description:
                "Tu fuente confiable para las últimas noticias y actualizaciones del mundo del anime",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://animetopx.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <CustomProgressBar />
          <main className="flex-grow container mx-auto px-4 py-8">
          <Breadcrumbs />
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
