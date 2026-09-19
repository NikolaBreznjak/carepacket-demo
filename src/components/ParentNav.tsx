'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/parent/', label: 'Care Notebook' },
  { href: '/parent/share/', label: 'Share packets' },
  { href: '/parent/timeline/', label: 'Timeline' },
];

export function ParentNav() {
  const pathname = usePathname();
  return (
    <header className="border-b border-line bg-warm-50/80 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto max-w-dash px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="font-semibold text-brand-700 text-lg tracking-tight">
          CarePacket
        </Link>
        <nav className="flex flex-wrap gap-1">
          {links.map((l) => {
            const active = pathname === l.href || pathname?.startsWith(l.href.replace(/\/$/, ''));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? 'bg-brand-100 text-brand-700' : 'text-ink-muted hover:bg-brand-100/60'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/provider/" className="text-sm text-ink-muted hover:text-brand-600">
          Switch to provider →
        </Link>
      </div>
    </header>
  );
}
