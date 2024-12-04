import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link className="flex items-center space-x-2" href="/">
            <Image
              alt="AnimeTopX Logo"
              height={80}
              sizes="(max-width: 768px) 80px, 160px"
              src="/favicon.ico"
              width={80}
            />
            <span className="font-bold">AnimeTopX</span>
          </Link>
          <nav className="hidden gap-6 md:flex">{/* Otros elementos del menú de navegación */}</nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4" />
      </div>
    </header>
  );
}
