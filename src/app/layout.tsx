import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AnimeTopX',
  description: 'Tu fuente confiable para las últimas noticias y actualizaciones del mundo del anime',
  keywords: 'anime, noticias, manga, japón, otaku',
  openGraph: {
    title: 'AnimeTopX',
    description: 'Tu fuente confiable para las últimas noticias y actualizaciones del mundo del anime',
    url: 'https://animenewshub.com',
    siteName: 'Anime News Hub',
    images: [
      {
        url: 'https://animenewshub.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AnimeTopX',
    description: 'Tu fuente confiable para las últimas noticias y actualizaciones del mundo del anime',
    images: ['https://animenewshub.com/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}