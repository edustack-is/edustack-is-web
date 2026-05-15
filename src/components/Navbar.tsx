'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';
import {Menu, X} from 'lucide-react';
import {LogoWordmark} from '@/components/brand/Logo';
import {LangToggle} from '@/components/LangToggle';
import {ThemeToggle} from '@/components/ThemeToggle';

const NAV_KEYS = ['idea', 'how', 'learn', 'tour', 'teachers', 'method', 'downloads'] as const;

export default function Navbar() {
  const t = useTranslations('Index');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isLanding = pathname === '/';

  const renderAnchor = (
    key: string,
    label: string,
    className: string,
    onClick?: () => void
  ) => {
    if (isLanding) {
      return (
        <a key={key} href={`#${key}`} className={className} onClick={onClick}>
          {label}
        </a>
      );
    }
    return (
      <Link
        key={key}
        href={`/#${key}`}
        className={className}
        onClick={onClick}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-line bg-bg/85 backdrop-blur-xl px-6 md:px-[5vw]">
      <div className="flex items-center justify-between py-4 md:py-5">
        <Link href="/" className="flex items-center" aria-label="EduStack IS">
          <LogoWordmark />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-5 xl:gap-6 font-body text-sm text-muted">
          {NAV_KEYS.map((k) =>
            renderAnchor(k, t(`nav.${k}`), 'hover:text-text transition-colors')
          )}
          <Link href="/manual" className="hover:text-text transition-colors">
            {t('nav.manual')}
          </Link>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-2.5">
            <LangToggle />
            <ThemeToggle />
          </div>
          {renderAnchor(
            'demo',
            t('nav.demo'),
            'hidden md:inline-flex items-center gap-2 font-body text-sm font-bold px-4 py-2.5 rounded-full text-white bg-brand-gradient shadow-[0_6px_18px_rgba(123,63,228,0.2)]'
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-xl bg-chip text-text"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-line bg-bg/95 backdrop-blur-xl">
          <div className="flex flex-col p-6 gap-5">
            {NAV_KEYS.map((k) =>
              renderAnchor(
                k,
                t(`nav.${k}`),
                'font-display text-2xl font-bold text-text',
                () => setOpen(false)
              )
            )}
            <Link
              href="/manual"
              onClick={() => setOpen(false)}
              className="font-display text-2xl font-bold text-text"
            >
              {t('nav.manual')}
            </Link>
            {renderAnchor(
              'demo',
              t('nav.demo'),
              'mt-2 inline-flex items-center justify-center gap-2 font-body text-base font-bold px-5 py-3 rounded-full text-white bg-brand-gradient',
              () => setOpen(false)
            )}
            <div className="flex items-center gap-3 pt-3 border-t border-line">
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
