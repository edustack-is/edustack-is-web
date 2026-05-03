'use client';

import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';
import {Globe} from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold inline-block">Edu Stack IS</span>
          </Link>
          <div className="hidden md:flex gap-6">
            <Link href="/#idea" className="text-sm font-medium transition-colors hover:text-primary">
              {t('idea')}
            </Link>
            <Link href="/#tech" className="text-sm font-medium transition-colors hover:text-primary">
              {t('tech')}
            </Link>
            <Link href="/worksheets" className="text-sm font-medium transition-colors hover:text-primary">
              {t('worksheets')}
            </Link>
            <Link href="/manual" className="text-sm font-medium transition-colors hover:text-primary">
              {t('manual')}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <Link 
              href={pathname} 
              locale="en" 
              className={`text-xs ${pathname.includes('en') ? 'font-bold' : ''}`}
            >
              EN
            </Link>
            <span className="text-xs text-muted-foreground">|</span>
            <Link 
              href={pathname} 
              locale="cs" 
              className={`text-xs ${pathname.includes('cs') ? 'font-bold' : ''}`}
            >
              CZ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
