import Link from "next/link";
import {SiFacebook, SiInstagram, SiTiktok, SiYoutube} from "react-icons/si"; // Usando react-icons como alternativa

export function Footer(): JSX.Element {
  return (
    <footer className="border-t bg-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4">Sobre Nosotros</h3>
            <p className="text-sm text-muted-foreground">
              AnimeTopX es tu fuente confiable para las últimas noticias y actualizaciones del mundo
              del anime.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-muted-foreground hover:text-foreground" href="/noticias">
                  Noticias
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:text-foreground" href="/reseñas">
                  Reseñas
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:text-foreground" href="/calendario">
                  Calendario
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4">Contacto</h3>
            <p className="text-sm text-muted-foreground">Email: jsdg1818@gmail.com</p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Síguenos</h3>
            <div className="flex space-x-4">
              <Link
                aria-label="Facebook"
                className="text-muted-foreground hover:text-foreground"
                href="https://www.facebook.com/techotaku1"
                target="_blank"
              >
                <SiFacebook className="h-6 w-6" />
              </Link>
              <Link
                aria-label="Instagram"
                className="text-muted-foreground hover:text-foreground"
                href="https://www.instagram.com/techotaku1"
                target="_blank"
              >
                <SiInstagram className="h-6 w-6" />
              </Link>
              <Link
                aria-label="TikTok"
                className="text-muted-foreground hover:text-foreground"
                href="https://www.tiktok.com/@techotaku1"
                target="_blank"
              >
                <SiTiktok className="h-6 w-6" />
              </Link>
              <Link
                aria-label="YouTube"
                className="text-muted-foreground hover:text-foreground"
                href="https://www.youtube.com/@techotaku1"
                target="_blank"
              >
                <SiYoutube className="h-6 w-6" />
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
