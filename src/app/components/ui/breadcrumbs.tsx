import Link from 'next/link'
import { ChevronRight, Home, type LucideIcon } from 'lucide-react'

interface BreadcrumbItem {
  href: string;
  label: string;
  icon?: LucideIcon;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && <ChevronRight className="w-4 h-4 mx-1" />}
              {isLast ? (
                <span className="font-medium text-gray-900" aria-current="page">
                  {item.icon && <item.icon className="w-4 h-4 mr-2 inline" />}
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="flex items-center hover:text-gray-700">
                  {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

