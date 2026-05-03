import {useTranslations} from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {GraduationCap, School, Code, CheckCircle2} from 'lucide-react';

export default function WorksheetsPage() {
  const t = useTranslations('Worksheets');

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-1 px-4 py-16 md:py-24">
        <div className="container max-w-[64rem] mx-auto space-y-16">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-[40rem] font-medium leading-relaxed">
              {t('description')}
            </p>
          </div>
          
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Primary School */}
            <div className="group flex flex-col rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-background p-10 shadow-sm transition-all hover:shadow-2xl hover:border-brand-orange/30">
              <div className="flex items-center gap-5 mb-10">
                <div className="p-4 rounded-2xl bg-brand-orange/10 text-brand-orange transition-transform group-hover:scale-110">
                  <School className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-black tracking-tight">{t('primary.title')}</h2>
              </div>
              <div className="space-y-8 flex-1">
                {[t('primary.lesson1'), t('primary.lesson2'), t('primary.lesson3')].map((lesson, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    <CheckCircle2 className="mt-1.5 h-6 w-6 shrink-0 text-brand-orange" />
                    <span className="text-xl leading-tight font-bold text-slate-800 dark:text-slate-200">{lesson}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary School */}
            <div className="group flex flex-col rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-background p-10 shadow-sm transition-all hover:shadow-2xl hover:border-brand-pink/30">
              <div className="flex items-center gap-5 mb-10">
                <div className="p-4 rounded-2xl bg-brand-pink/10 text-brand-pink transition-transform group-hover:scale-110">
                  <GraduationCap className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-black tracking-tight">{t('secondary.title')}</h2>
              </div>
              <div className="space-y-8 flex-1">
                {[t('secondary.lesson1'), t('secondary.lesson2'), t('secondary.lesson3')].map((lesson, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    <CheckCircle2 className="mt-1.5 h-6 w-6 shrink-0 text-brand-pink" />
                    <span className="text-xl leading-tight font-bold text-slate-800 dark:text-slate-200">{lesson}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* High School */}
            <div className="group flex flex-col rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-background p-10 shadow-sm transition-all hover:shadow-2xl hover:border-brand-purple/30">
              <div className="flex items-center gap-5 mb-10">
                <div className="p-4 rounded-2xl bg-brand-purple/10 text-brand-purple transition-transform group-hover:scale-110">
                  <Code className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-black tracking-tight">{t('high.title')}</h2>
              </div>
              <div className="space-y-8 flex-1">
                {[t('high.lesson1'), t('high.lesson2'), t('high.lesson3')].map((lesson, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    <CheckCircle2 className="mt-1.5 h-6 w-6 shrink-0 text-brand-purple" />
                    <span className="text-xl leading-tight font-bold text-slate-800 dark:text-slate-200">{lesson}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
