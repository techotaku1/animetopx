import Link from 'next/link'
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">AnimeTopX</span>
          </Link>
          <nav className="hidden md:flex gap-6">
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          
            <ModeToggle />
          
        </div>
      </div>
    </header>
  )
}