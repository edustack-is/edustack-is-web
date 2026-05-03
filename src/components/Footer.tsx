import {ExternalLink, Heart} from 'lucide-react';
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="border-t bg-slate-50 dark:bg-slate-950 pt-16 pb-8 px-4">
      <div className="container max-w-[64rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-left">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center justify-center md:justify-start space-x-3 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-purple via-brand-pink to-brand-orange flex items-center justify-center text-white text-xs font-bold">
                S
              </div>
              <span className="font-black text-xl tracking-tighter text-slate-900 dark:text-white">
                EduStack <span className="text-brand-purple">IS</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm mx-auto md:mx-0">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-xs">{t('resources')}</h4>
            <ul className="space-y-4 font-medium text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/worksheets" className="hover:text-brand-purple transition-colors">Working Sheets</Link>
              </li>
              <li>
                <Link href="/manual" className="hover:text-brand-purple transition-colors">User Manual</Link>
              </li>
              <li>
                <a href="#tech" className="hover:text-brand-purple transition-colors">Technical Stack</a>
              </li>
            </ul>
          </div>

          {/* Social / Open Source */}
          <div className="space-y-6">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-xs">{t('openSource')}</h4>
            <ul className="space-y-4 font-medium text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a 
                  href="https://github.com/petrvich/edu-stack-is-sandbox" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-brand-purple transition-colors"
                >
                  <ExternalLink className="h-4 w-4" /> {t('github')}
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex items-center gap-2 hover:text-brand-purple transition-colors">
                  {t('documentation')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2026 Petr Vích</span>
            <span className="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              {t('builtWith')} <Heart className="h-3.5 w-3.5 text-brand-pink fill-brand-pink" /> {t('forEducation')}
            </span>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t('privacy')}</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t('terms')}</a>
            <div className="flex gap-4">
               {/* Small accent dots from logo */}
               <div className="h-2 w-2 rounded-full bg-brand-purple" />
               <div className="h-2 w-2 rounded-full bg-brand-pink" />
               <div className="h-2 w-2 rounded-full bg-brand-orange" />
               <div className="h-2 w-2 rounded-full bg-brand-teal" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
