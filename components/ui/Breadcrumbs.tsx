"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  isEnglish: boolean;
}

export default function Breadcrumbs({ items, isEnglish }: BreadcrumbsProps) {
  return (
    <nav dir={isEnglish ? "ltr" : "rtl"} className="flex items-center gap-1.5 text-[10px] text-accent-gold/40 mb-4 overflow-x-auto scrollbar-none whitespace-nowrap">
      <Link href="/" className="hover:text-accent-gold transition-colors">
        <i className="fas fa-home text-[10px]" />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="text-accent-gold/20">/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-accent-gold transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-accent-gold/60">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
