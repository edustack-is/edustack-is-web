'use client';

import {useRouter, usePathname} from '@/i18n/routing';
import {useLocale} from 'next-intl';

const LOCALES = ['en', 'cs'] as const;

export function LangToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div className="flex p-0.5 rounded-full bg-chip font-mono text-xs font-semibold">
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => {
            const hash = typeof window !== 'undefined' ? window.location.hash : '';
            router.replace(pathname + hash, {locale: l, scroll: false});
          }}
          className={`px-3 py-1.5 rounded-full uppercase tracking-wider transition-colors ${
            locale === l ? 'bg-brand-gradient text-white' : 'text-muted'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
