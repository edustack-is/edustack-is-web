'use client';

import {useState, useEffect} from 'react';
import {useTranslations} from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ManualSidebar from '@/components/ManualSidebar';
import ScreenshotPlaceholder from '@/components/ScreenshotPlaceholder';
import {Info, Laptop, Settings, LogIn, ShieldCheck, School, Search, UserCheck, GraduationCap, Users, Zap, CheckCircle2} from 'lucide-react';

const roleColorMap: Record<string, string> = {
  systemAdmin: 'brand-purple',
  schoolAdmin: 'brand-slate',
  headmaster: 'brand-blue',
  deputy: 'brand-pink',
  teacher: 'brand-teal',
  student: 'brand-orange',
};

const bgLightMap: Record<string, string> = {
  'brand-purple': 'bg-brand-purple/10',
  'brand-slate': 'bg-brand-slate/10',
  'brand-blue': 'bg-brand-blue/10',
  'brand-pink': 'bg-brand-pink/10',
  'brand-teal': 'bg-brand-teal/10',
  'brand-orange': 'bg-brand-orange/10',
};

const textMap: Record<string, string> = {
  'brand-purple': 'text-brand-purple',
  'brand-slate': 'text-brand-slate',
  'brand-blue': 'text-brand-blue',
  'brand-pink': 'text-brand-pink',
  'brand-teal': 'text-brand-teal',
  'brand-orange': 'text-brand-orange',
};

const borderMap: Record<string, string> = {
  'brand-purple': 'border-brand-purple',
  'brand-slate': 'border-brand-slate',
  'brand-blue': 'border-brand-blue',
  'brand-pink': 'border-brand-pink',
  'brand-teal': 'border-brand-teal',
  'brand-orange': 'border-brand-orange',
};

const bgFullMap: Record<string, string> = {
  'brand-purple': 'bg-brand-purple',
  'brand-slate': 'bg-brand-slate',
  'brand-blue': 'bg-brand-blue',
  'brand-pink': 'bg-brand-pink',
  'brand-teal': 'brand-teal', // Note: Tailwind doesn't always handle full opacity bg with variables perfectly if not set in theme
  'brand-orange': 'bg-brand-orange',
};

export default function ManualPage() {
  const t = useTranslations('Manual');
  const [activeSection, setActiveSection] = useState('development');

  // Helper for dynamic translations to avoid ESLint any errors
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const translate = (key: string) => t(key as any);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-100px 0px -70% 0px' }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />
      
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="hidden md:block">
          <ManualSidebar activeSection={activeSection} />
        </div>

        {/* Content */}
        <main className="flex-1 px-4 md:px-12 py-16 md:py-24 overflow-hidden">
          <div className="max-w-[60rem] mx-auto space-y-48">
            
            {/* Header */}
            <div className="space-y-6 text-center md:text-left border-b border-slate-100 dark:border-slate-800 pb-20">
              <h1 className="text-5xl md:text-9xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
                {t('title')}
              </h1>
              <p className="text-2xl md:text-4xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[48rem]">
                {t('intro')}
              </p>
            </div>

            {/* Chapters Section */}
            <div className="space-y-64">
              
              {/* Local Development */}
              <section id="development" className="scroll-mt-32 space-y-16">
                <div className="space-y-6">
                  <div className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                    <Laptop className="h-10 w-10" />
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tight">{t('development.title')}</h2>
                  <p className="text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-[45rem]">
                    {t('development.description')}
                  </p>
                </div>
                
                <div className="grid gap-12 lg:grid-cols-2">
                  <div className="space-y-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex gap-6 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 transition-all hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:scale-[1.02]">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-purple text-white font-black text-lg shadow-lg shadow-brand-purple/20">
                          {i}
                        </div>
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-200 pt-1.5 leading-snug">
                          {translate(`development.step${i}`)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-6">
                    <ScreenshotPlaceholder roleColor="brand-purple" className="h-full" />
                  </div>
                </div>
              </section>

              {/* System Setup */}
              <section id="setup" className="scroll-mt-32 space-y-16">
                <div className="space-y-6">
                  <div className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                    <Settings className="h-10 w-10" />
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tight">{t('setup.title')}</h2>
                  <p className="text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-[45rem]">
                    {t('setup.description')}
                  </p>
                </div>

                <div className="grid gap-10 md:grid-cols-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="group flex flex-col gap-8 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-2xl">
                      <div className="space-y-4">
                        <h3 className="text-3xl font-black tracking-tight text-brand-purple">{translate(`setup.option${i}.title`)}</h3>
                        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{translate(`setup.option${i}.description`)}</p>
                      </div>
                      <ScreenshotPlaceholder roleColor="brand-purple" className="aspect-[4/3] group-hover:scale-[1.03] transition-transform" />
                    </div>
                  ))}
                </div>
              </section>

              {/* User Authentication */}
              <section id="login" className="scroll-mt-32 space-y-16">
                <div className="space-y-6">
                  <div className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                    <LogIn className="h-10 w-10" />
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tight">{t('login.title')}</h2>
                  <p className="text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-[45rem]">
                    {t('login.description')}
                  </p>
                </div>

                <div className="space-y-12">
                  <div className="grid gap-8 md:grid-cols-3">
                    {['helper', 'credentials', 'sso'].map((type) => (
                      <div key={type} className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-4 hover:bg-white dark:hover:bg-slate-900 transition-colors hover:shadow-xl">
                        <h4 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">{translate(`login.${type}.title`)}</h4>
                        <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{translate(`login.${type}.description`)}</p>
                      </div>
                    ))}
                  </div>
                  <ScreenshotPlaceholder roleColor="brand-purple" className="shadow-2xl" />
                </div>
              </section>

            </div>

            {/* Roles Section */}
            <div className="space-y-[64rem] pt-20 border-t border-slate-100 dark:border-slate-800">
              <div className="space-y-6 text-center md:text-left">
                <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
                  {t('roles.title')}
                </h2>
                <div className="h-2 w-32 bg-brand-purple rounded-full md:mx-0 mx-auto" />
                <p className="text-2xl md:text-4xl text-slate-500 dark:text-slate-400 font-medium max-w-[48rem]">
                  Comprehensive guide to specific procedures and features for each system identity.
                </p>
              </div>

              <div className="space-y-[48rem]">
                {[
                  { id: 'systemAdmin', icon: ShieldCheck },
                  { id: 'schoolAdmin', icon: School },
                  { id: 'headmaster', icon: Search },
                  { id: 'deputy', icon: UserCheck },
                  { id: 'teacher', icon: GraduationCap },
                  { id: 'student', icon: Users },
                ].map((role) => {
                  const color = roleColorMap[role.id];
                  return (
                    <section id={role.id} key={role.id} className="scroll-mt-32 space-y-48 group">
                      {/* Role Introduction */}
                      <div className="grid gap-16 lg:grid-cols-2 items-center">
                        <div className="space-y-10">
                          <div className="space-y-6">
                            <div className={`inline-flex p-6 rounded-[2.5rem] ${bgLightMap[color]} ${textMap[color]} transition-all group-hover:scale-110 group-hover:rotate-6 shadow-xl`}>
                              <role.icon className="h-16 w-10" />
                            </div>
                            <h3 className={`text-6xl md:text-8xl font-black tracking-tighter ${textMap[color]} uppercase leading-none`}>
                              {translate(`roles.${role.id}.title`)}
                            </h3>
                          </div>
                          
                          <div className="space-y-8">
                            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
                              {translate(`roles.${role.id}.description`)}
                            </p>
                            
                            <div className="p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 space-y-6 relative overflow-hidden">
                              <div className={`absolute top-0 right-0 h-full w-2 ${bgFullMap[color]}`} />
                              <h4 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-slate-400">
                                <Info size={16} /> {t('roles.coreFunctions')}
                              </h4>
                              <p className="text-xl text-slate-600 dark:text-slate-400 font-bold leading-relaxed">
                                {translate(`roles.${role.id}.functions`)}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className={`absolute -inset-4 bg-${color}/10 blur-3xl rounded-full opacity-50`} />
                          <ScreenshotPlaceholder roleColor={color} className="relative z-10 aspect-video shadow-2xl" />
                        </div>
                      </div>

                      {/* Detailed Workflows */}
                      <div className="space-y-32">
                        <div className="flex items-center gap-6">
                           <h4 className="text-3xl font-black tracking-tight uppercase opacity-30 italic">{t('roles.workflows')}</h4>
                           <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                        </div>

                        <div className="grid gap-48">
                          {[1, 2, 3].map((w) => (
                            <div key={w} className="space-y-12">
                              <div className="grid lg:grid-cols-5 gap-16 items-start">
                                <div className="lg:col-span-2 space-y-8">
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border-2 ${borderMap[color]} ${textMap[color]} font-black text-xl shadow-lg`}>
                                        {w}
                                      </div>
                                      <h5 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                                        {translate(`roles.${role.id}.workflow${w}.title`)}
                                      </h5>
                                    </div>
                                    <p className="text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed pl-16">
                                      {translate(`roles.${role.id}.workflow${w}.description`)}
                                    </p>
                                  </div>

                                  <div className="pl-16 space-y-6">
                                    <div className="flex items-center gap-3">
                                      <div className={`h-px w-8 ${bgFullMap[color]}`} />
                                      <span className={`text-xs font-black uppercase tracking-widest ${textMap[color]}`}>{t('roles.procedure')}</span>
                                    </div>
                                    <div className="grid gap-4">
                                      {[1, 2, 3, 4].map((s) => (
                                        <div key={s} className="flex gap-4 group/step transition-all hover:translate-x-1">
                                          <CheckCircle2 className={`h-6 w-6 shrink-0 ${textMap[color]} opacity-20 group-hover/step:opacity-100 transition-opacity`} />
                                          <p className="text-lg font-bold text-slate-700 dark:text-slate-300 leading-tight">
                                            {translate(`roles.${role.id}.workflow${w}.step${s}`)}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="lg:col-span-3 space-y-8">
                                  <ScreenshotPlaceholder roleColor={color} className="aspect-video shadow-2xl rounded-[3rem]" />
                                  <div className="grid grid-cols-3 gap-4 h-2">
                                     <div className={`rounded-full ${bgFullMap[color]}`} />
                                     <div className={`rounded-full ${bgFullMap[color]} opacity-40`} />
                                     <div className={`rounded-full ${bgFullMap[color]} opacity-10`} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
