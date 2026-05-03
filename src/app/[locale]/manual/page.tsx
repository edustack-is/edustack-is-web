import {useTranslations} from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {ArrowRight, UserCheck, Users, ShieldCheck, Sparkles, Terminal} from 'lucide-react';

export default function ManualPage() {
  const t = useTranslations('Manual');

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-1 px-4 py-16 md:py-24">
        <div className="container max-w-[64rem] mx-auto space-y-20">
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center rounded-full bg-brand-purple/10 px-4 py-1.5 text-sm font-bold text-brand-purple mb-4">
              <Terminal className="mr-2 h-4 w-4" /> {t('documentation')}
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white">{t('title')}</h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-[40rem] font-medium leading-relaxed">{t('intro')}</p>
          </div>
          
          <div className="grid gap-12">
            <section className="relative overflow-hidden rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-background p-10 md:p-16 shadow-sm">
              <div className="absolute top-0 right-0 p-8 text-slate-100 dark:text-slate-900 -z-10">
                <ShieldCheck className="h-64 w-64 rotate-12" />
              </div>
              <h2 className="text-4xl font-black mb-8 tracking-tight">{t('getStarted.title')}</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400">
                  {t('getStarted.description')}
                </p>
                <div className="flex gap-4 mt-10">
                  <div className="h-2 w-12 bg-brand-purple rounded-full" />
                  <div className="h-2 w-8 bg-brand-pink rounded-full opacity-50" />
                  <div className="h-2 w-4 bg-brand-orange rounded-full opacity-25" />
                </div>
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-4xl font-black tracking-tight text-center md:text-left">{t('roles.title')}</h2>
              <div className="grid gap-8 md:grid-cols-3">
                {[
                  {
                    title: t('roles.admin.title'),
                    desc: t('roles.admin.description'),
                    icon: ShieldCheck,
                    color: 'brand-purple'
                  },
                  {
                    title: t('roles.teacher.title'),
                    desc: t('roles.teacher.description'),
                    icon: UserCheck,
                    color: 'brand-teal'
                  },
                  {
                    title: t('roles.student.title'),
                    desc: t('roles.student.description'),
                    icon: Users,
                    color: 'brand-pink'
                  }
                ].map((role) => (
                  <div key={role.title} className="group flex flex-col rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-background p-10 transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className={`mb-8 inline-flex p-4 rounded-2xl bg-${role.color}/10 text-${role.color}`}>
                      <role.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight">{role.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{role.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[3rem] bg-slate-900 text-white p-10 md:p-16">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-purple/20 to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white font-bold backdrop-blur-md">
                  <span className="text-brand-orange">★</span> {t('ai.badge')}
                </div>
                <h2 className="text-4xl font-black tracking-tight">{t('ai.title')}</h2>
                <p className="text-xl text-slate-400 max-w-[42rem] leading-relaxed">
                  {t('ai.description')}
                </p>
                <div className="pt-8">
                  <button className="px-8 py-4 rounded-full bg-white text-slate-900 font-black flex items-center gap-2 hover:scale-105 transition-transform text-lg">
                    {t('ai.cta')} <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
