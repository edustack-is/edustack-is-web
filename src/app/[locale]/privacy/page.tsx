import {useTranslations} from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {Shield} from 'lucide-react';

export default function PrivacyPage() {
  const t = useTranslations('Privacy');

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-1 px-4 py-16 md:py-24">
        <div className="container max-w-[48rem] mx-auto space-y-12 bg-white dark:bg-slate-900 p-8 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-2xl bg-brand-teal/10 text-brand-teal">
              <Shield className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('title')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">
              {t('lastUpdated')}
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-10">
            <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-medium italic border-l-4 border-brand-teal pl-6">
              {t('intro')}
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                1. {t('section1.title')}
              </h2>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {t('section1.content')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                2. {t('section2.title')}
              </h2>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {t('section2.content')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                3. {t('section3.title')}
              </h2>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {t('section3.content')}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
