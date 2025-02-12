import React, { type JSX } from 'react';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
	href: string;
	label: string;
	icon?: LucideIcon;
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps): JSX.Element | null {
	if (items.length === 0) {
		return null;
	}

	return (
		<nav aria-label="Breadcrumb" className="mb-4">
			<ol className="flex items-center space-x-2 text-sm text-gray-500">
				{items.map((item, index) => {
					const isLast = index === items.length - 1;

					return (
						<li key={item.href} className="flex items-center">
							{index > 0 && <ChevronRight className="mx-1 h-4 w-4" />}
							{isLast ? (
								<span aria-current="page" className="font-medium text-gray-900">
									{item.icon && <item.icon className="mr-2 inline h-4 w-4" />}
									{item.label}
								</span>
							) : (
								<Link
									className="flex items-center hover:text-gray-700"
									href={item.href}
								>
									{item.icon && <item.icon className="mr-2 h-4 w-4" />}
									{item.label}
								</Link>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
