'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

export function Breadcrumbs() {
  const pathname = usePathname()
  const isNewsDetail = pathname.startsWith('/noticias/') && pathname.split('/').length > 2

  let breadcrumbs = [
    { href: '/', label: 'Inicio', icon: Home },
    { href: '/noticias', label: 'Noticias' },
  ]

  if (isNewsDetail) {
    const newsId = pathname.split('/').pop()
    breadcrumbs.push({ href: pathname, label: `Noticia ${newsId}` })
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1

          return (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && <ChevronRight className="w-4 h-4 mx-1" />}
              {isLast ? (
                <span className="font-medium text-gray-900" aria-current="page">
                  {crumb.icon && <crumb.icon className="w-4 h-4 mr-2 inline" />}
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="flex items-center hover:text-gray-700">
                  {crumb.icon && <crumb.icon className="w-4 h-4 mr-2" />}
                  {crumb.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

