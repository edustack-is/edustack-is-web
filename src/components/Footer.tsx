import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {ROLE_COLORS_LIST} from '@/components/brand/roles';

export default function Footer() {
  const t = useTranslations('Index');
  const tFooter = useTranslations('Footer');

  return (
    <footer className="border-t border-line px-6 md:px-14">
      <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 py-8 font-mono text-xs text-muted">
        <span>{t('footerNote')}</span>
        <div className="flex items-center gap-5">
          <Link href="/privacy" className="hover:text-text transition-colors">
            {tFooter('privacy')}
          </Link>
          <Link href="/terms" className="hover:text-text transition-colors">
            {tFooter('terms')}
          </Link>
          <Link href="/manual" className="hover:text-text transition-colors">
            {tFooter('manual')}
          </Link>
          <div className="flex gap-1.5 ml-1">
            {ROLE_COLORS_LIST.map((c) => (
              <span
                key={c}
                className="w-1.5 h-1.5 rounded-full"
                style={{background: c}}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
