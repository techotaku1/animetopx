import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            {/* Configura el ícono con tamaño 320x320 */}
            <Image 
              src="/favicon.ico" 
              alt="AnimeTopX Logo" 
              width={320} 
              height={320} 
              className="h-20 w-20" // Ajusta aquí para controlar el tamaño visual del ícono en pantalla
            />
            <span className="inline-block font-bold">AnimeTopX</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {/* Otros elementos del menú de navegación */}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
        </div>
      </div>
    </header>
  );
}
