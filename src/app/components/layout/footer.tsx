import Link from 'next/link';
import { SiFacebook, SiInstagram, SiTiktok, SiYoutube } from 'react-icons/si'; // Usando react-icons como alternativa

export function Footer() {
  return (
    <footer className="border-t bg-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="mb-4">Sobre Nosotros</h3>
            <p className="text-sm text-muted-foreground">
              AnimeTopX es tu fuente confiable para las últimas noticias y actualizaciones del mundo del anime.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/noticias" className="text-muted-foreground hover:text-foreground">Noticias</Link></li>
              <li><Link href="/reseñas" className="text-muted-foreground hover:text-foreground">Reseñas</Link></li>
              <li><Link href="/calendario" className="text-muted-foreground hover:text-foreground">Calendario</Link></li>
            </ul>
          </div>
          <div>
            <h3 className=" mb-4">Contacto</h3>
            <p className="text-sm text-muted-foreground">Email: jsdg1818@gmail.com</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/techotaku1" target="_blank" className="text-muted-foreground hover:text-foreground" aria-label="Facebook">
                <SiFacebook className="w-6 h-6" />
              </Link>
              <Link href="https://www.instagram.com/techotaku1" target="_blank" className="text-muted-foreground hover:text-foreground" aria-label="Instagram">
                <SiInstagram className="w-6 h-6" />
              </Link>
              <Link href="https://www.tiktok.com/@techotaku1" target="_blank" className="text-muted-foreground hover:text-foreground" aria-label="TikTok">
                <SiTiktok className="w-6 h-6" />
              </Link>
              <Link href="https://www.youtube.com/@techotaku1" target="_blank" className="text-muted-foreground hover:text-foreground" aria-label="YouTube">
                <SiYoutube className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AnimeTopX. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
