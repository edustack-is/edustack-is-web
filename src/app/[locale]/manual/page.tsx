'use client';

import {useState, useEffect} from 'react';
import {useTranslations} from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ManualSidebar from '@/components/ManualSidebar';
import ScreenshotPlaceholder from '@/components/ScreenshotPlaceholder';
import {Info, Laptop, Settings, LogIn, ShieldCheck, School, Search, UserCheck, GraduationCap, Users} from 'lucide-react';

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

const bgFullMap: Record<string, string> = {
  'brand-purple': 'bg-brand-purple',
  'brand-slate': 'bg-brand-slate',
  'brand-blue': 'bg-brand-blue',
  'brand-pink': 'bg-brand-pink',
  'brand-teal': 'bg-brand-teal',
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
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
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
          <div className="max-w-[54rem] mx-auto space-y-32">
            
            {/* Header */}
            <div className="space-y-6 text-center md:text-left border-b border-slate-100 dark:border-slate-800 pb-16">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
                {t('title')}
              </h1>
              <p className="text-xl md:text-3xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[42rem]">
                {t('intro')}
              </p>
            </div>

            {/* Chapters Section */}
            <div className="space-y-40">
              
              {/* Local Development */}
              <section id="development" className="scroll-mt-32 space-y-12">
                <div className="space-y-6">
                  <div className="inline-flex p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white">
                    <Laptop className="h-8 w-8" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tight">{t('development.title')}</h2>
                  <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('development.description')}
                  </p>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white font-bold text-sm">
                          {i}
                        </div>
                        <p className="font-bold text-slate-700 dark:text-slate-300 pt-1">
                          {translate(`development.step${i}`)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <ScreenshotPlaceholder roleColor="brand-purple" />
                </div>
              </section>

              {/* System Setup */}
              <section id="setup" className="scroll-mt-32 space-y-12">
                <div className="space-y-6">
                  <div className="inline-flex p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white">
                    <Settings className="h-8 w-8" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tight">{t('setup.title')}</h2>
                  <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('setup.description')}
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex flex-col gap-6 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                      <h3 className="text-2xl font-black tracking-tight text-brand-purple">{translate(`setup.option${i}.title`)}</h3>
                      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{translate(`setup.option${i}.description`)}</p>
                      <ScreenshotPlaceholder roleColor="brand-purple" className="aspect-[4/3]" />
                    </div>
                  ))}
                </div>
              </section>

              {/* User Authentication */}
              <section id="login" className="scroll-mt-32 space-y-12">
                <div className="space-y-6">
                  <div className="inline-flex p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white">
                    <LogIn className="h-8 w-8" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tight">{t('login.title')}</h2>
                  <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('login.description')}
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="grid gap-6 md:grid-cols-3">
                    {['helper', 'credentials', 'sso'].map((type) => (
                      <div key={type} className="p-6 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
                        <h4 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">{translate(`login.${type}.title`)}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{translate(`login.${type}.description`)}</p>
                      </div>
                    ))}
                  </div>
                  <ScreenshotPlaceholder roleColor="brand-purple" />
                </div>
              </section>

            </div>

            {/* Roles Section */}
            <div className="space-y-40 pt-20 border-t border-slate-100 dark:border-slate-800">
              <div className="space-y-4 text-center md:text-left">
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">{t('roles.title')}</h2>
                <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">Deep dive into permissions and functionalities for every user identity.</p>
              </div>

              <div className="space-y-64">
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
                    <section id={role.id} key={role.id} className="scroll-mt-32 group">
                      <div className="grid gap-12 lg:grid-cols-2">
                        <div className="space-y-8">
                          <div className="space-y-4">
                            <div className={`inline-flex p-4 rounded-3xl ${bgLightMap[color]} ${textMap[color]} transition-transform group-hover:scale-110`}>
                              <role.icon className="h-10 w-10" />
                            </div>
                            <h3 className={`text-4xl md:text-6xl font-black tracking-tight ${textMap[color]}`}>
                              {translate(`roles.${role.id}.title`)}
                            </h3>
                          </div>
                          
                          <div className="space-y-6">
                            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
                              {translate(`roles.${role.id}.description`)}
                            </p>
                            
                            <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 space-y-4">
                              <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400">
                                <Info size={14} /> Core Functions
                              </h4>
                              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">
                                &quot;{translate(`roles.${role.id}.functions`)}&quot;
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-6">
                          <ScreenshotPlaceholder roleColor={color} className="flex-1" />
                          <div className="grid grid-cols-2 gap-4">
                            <div className={`h-2 rounded-full ${bgFullMap[color]} opacity-100`} />
                            <div className={`h-2 rounded-full ${bgFullMap[color]} opacity-30`} />
                          </div>
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
