'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';
import {Menu, X} from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    {href: '/#idea', label: t('idea')},
    {href: '/#tech', label: t('tech')},
    {href: '/worksheets', label: t('worksheets')},
    {href: '/manual', label: t('manual')},
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4 md:px-8 mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-purple via-brand-pink to-brand-orange flex items-center justify-center text-white font-bold transition-transform group-hover:rotate-12">
              S
            </div>
            <span className="font-black text-xl md:text-2xl tracking-tighter inline-block text-slate-900 dark:text-white">
              EduStack <span className="text-brand-purple">IS</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center font-bold">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href as Parameters<typeof Link>[0]['href']} 
              className="text-sm tracking-tight text-slate-600 dark:text-slate-400 transition-colors hover:text-brand-purple relative group/link"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-purple transition-all group-hover/link:w-full" />
            </Link>
          ))}
          <div className="flex items-center gap-4 ml-4 pl-8 border-l border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 p-1 rounded-full bg-slate-100 dark:bg-slate-900">
              <Link 
                href={pathname} 
                locale="en" 
                className={`px-3 py-1 rounded-full text-xs transition-all ${pathname.includes('en') ? 'bg-white dark:bg-slate-800 shadow-sm text-brand-purple font-black' : 'text-slate-500 hover:text-slate-900'}`}
              >
                EN
              </Link>
              <Link 
                href={pathname} 
                locale="cs" 
                className={`px-3 py-1 rounded-full text-xs transition-all ${pathname.includes('cs') ? 'bg-white dark:bg-slate-800 shadow-sm text-brand-purple font-black' : 'text-slate-500 hover:text-slate-900'}`}
              >
                CZ
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white transition-transform active:scale-90"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-background/95 backdrop-blur-2xl z-40 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="container flex flex-col p-8 gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href as Parameters<typeof Link>[0]['href']} 
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white transition-colors hover:text-brand-purple"
              >
                {link.label}
              </Link>
            ))}
            
            <div className="mt-auto flex flex-col gap-6">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t('language')}</p>
              <div className="flex gap-4">
                <Link 
                  href={pathname} 
                  locale="en" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-2xl font-black ${pathname.includes('en') ? 'text-brand-purple' : 'text-slate-400'}`}
                >
                  English
                </Link>
                <Link 
                  href={pathname} 
                  locale="cs" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-2xl font-black ${pathname.includes('cs') ? 'text-brand-purple' : 'text-slate-400'}`}
                >
                  Čeština
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
