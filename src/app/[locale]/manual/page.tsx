'use client';

import {useState, useEffect} from 'react';
import {useTranslations} from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ManualSidebar from '@/components/ManualSidebar';
import ScreenshotPlaceholder from '@/components/ScreenshotPlaceholder';
import {Info, Laptop, Settings, LogIn, ShieldCheck, School, Search, UserCheck, GraduationCap, Users, CheckCircle2, Heart, ChevronLeft, ChevronRight} from 'lucide-react';

const roleColorMap: Record<string, string> = {
  systemAdmin: 'brand-purple',
  schoolAdmin: 'brand-slate',
  headmaster: 'brand-blue',
  deputy: 'brand-pink',
  teacher: 'brand-teal',
  parent: 'rose-500',
  student: 'brand-orange',
};

const bgLightMap: Record<string, string> = {
  'brand-purple': 'bg-brand-purple/10',
  'brand-slate': 'bg-brand-slate/10',
  'brand-blue': 'bg-brand-blue/10',
  'brand-pink': 'bg-brand-pink/10',
  'brand-teal': 'bg-brand-teal/10',
  'rose-500': 'bg-rose-500/10',
  'brand-orange': 'bg-brand-orange/10',
};

const textMap: Record<string, string> = {
  'brand-purple': 'text-brand-purple',
  'brand-slate': 'text-brand-slate',
  'brand-blue': 'text-brand-blue',
  'brand-pink': 'text-brand-pink',
  'brand-teal': 'text-brand-teal',
  'rose-500': 'text-rose-500',
  'brand-orange': 'text-brand-orange',
};

const borderMap: Record<string, string> = {
  'brand-purple': 'border-brand-purple',
  'brand-slate': 'border-brand-slate',
  'brand-blue': 'border-brand-blue',
  'brand-pink': 'border-brand-pink',
  'brand-teal': 'border-brand-teal',
  'rose-500': 'border-rose-500',
  'brand-orange': 'border-brand-orange',
};

const bgFullMap: Record<string, string> = {
  'brand-purple': 'bg-brand-purple',
  'brand-slate': 'bg-brand-slate',
  'brand-blue': 'bg-brand-blue',
  'brand-pink': 'bg-brand-pink',
  'brand-teal': 'bg-brand-teal',
  'rose-500': 'bg-rose-500',
  'brand-orange': 'bg-brand-orange',
};

const systemAdminGallery = [
  { id: 'dashboard', src: '/images/documentation/system-admin/00_dashboard.png' },
  { id: 'school_management', src: '/images/documentation/system-admin/01_school_management.png' },
  { id: 'create_new_school', src: '/images/documentation/system-admin/02_create_new_school.png' },
  { id: 'edit_school', src: '/images/documentation/system-admin/03_edit_school.png' },
  { id: 'behalf_of_mode', src: '/images/documentation/system-admin/04_behalf_of_mode.png' },
  { id: 'system_users', src: '/images/documentation/system-admin/05_system_users.png' },
  { id: 'create_new_system_user', src: '/images/documentation/system-admin/06_create_new_system_user.png' },
  { id: 'ai_management', src: '/images/documentation/system-admin/07_system_setting_ai_management.png' },
  { id: 'sso_setting', src: '/images/documentation/system-admin/08_system_setting_sso_setting.png' },
  { id: 'set_new_sso_provider', src: '/images/documentation/system-admin/09_system_setting_set_new_sso_provider.png' },
  { id: 'monitoring', src: '/images/documentation/system-admin/10_system_setting_monitoring.png' },
  { id: 'system_params', src: '/images/documentation/system-admin/11_system_setting_system_params.png' },
  { id: 'generate_data', src: '/images/documentation/system-admin/12_system_setting_generate_data.png' },
  { id: 'backup_restore', src: '/images/documentation/system-admin/13_system_settings_backup_restore.png' },
];

const roleWorkflowImages: Record<string, Record<number, string[]>> = {
  systemAdmin: {
    1: [
      '/images/documentation/system-admin/00_dashboard.png',
      '/images/documentation/system-admin/01_school_management.png',
      '/images/documentation/system-admin/02_create_new_school.png',
      '/images/documentation/system-admin/03_edit_school.png',
    ],
    2: ['/images/documentation/system-admin/05_system_users.png', '/images/documentation/system-admin/06_create_new_system_user.png'],
    3: ['/images/documentation/system-admin/10_system_setting_monitoring.png', '/images/documentation/system-admin/13_system_settings_backup_restore.png'],
  }
};

export default function ManualPage() {
  const t = useTranslations('Manual');
  const [activeSection, setActiveSection] = useState('development');
  const [workflowImageIndices, setWorkflowImageIndices] = useState<Record<string, number>>({});

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

  const getWorkflowImage = (roleId: string, workflowId: number) => {
    const images = roleWorkflowImages[roleId]?.[workflowId] || [];
    const activeIndex = workflowImageIndices[`${roleId}-${workflowId}`] || 0;
    return images[activeIndex] || images[0];
  };

  const setWorkflowImage = (roleId: string, workflowId: number, index: number) => {
    const images = roleWorkflowImages[roleId]?.[workflowId] || [];
    if (images.length === 0) return;
    
    // Wrap around logic
    const newIndex = (index + images.length) % images.length;
    
    setWorkflowImageIndices(prev => ({
      ...prev,
      [`${roleId}-${workflowId}`]: newIndex
    }));
  };

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
          <div className="max-w-[80rem] mx-auto space-y-32">
            
            {/* Header ... */}
            {/* ... */}
            
            {/* Roles Section */}
            <div className="space-y-32 pt-20 border-t border-slate-100 dark:border-slate-800">
              <div className="space-y-6 text-center md:text-left">
                <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
                  {t('roles.title')}
                </h2>
                <div className="h-2 w-32 bg-brand-purple rounded-full md:mx-0 mx-auto" />
                <p className="text-2xl md:text-4xl text-slate-500 dark:text-slate-400 font-medium max-w-[48rem]">
                  Comprehensive guide to specific procedures and features for each system identity.
                </p>
              </div>

              <div className="space-y-64">
                {[
                  { id: 'systemAdmin', icon: ShieldCheck },
                  { id: 'schoolAdmin', icon: School },
                  { id: 'headmaster', icon: Search },
                  { id: 'deputy', icon: UserCheck },
                  { id: 'teacher', icon: GraduationCap },
                  { id: 'parent', icon: Heart },
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
                          <ScreenshotPlaceholder 
                            roleColor={color} 
                            src={role.id === 'systemAdmin' ? '/images/documentation/system-admin/00_dashboard.png' : undefined}
                            className="relative z-10 aspect-video shadow-2xl" 
                          />
                        </div>
                      </div>

                      {/* Detailed Workflows */}
                      <div className="space-y-32">
                        <div className="flex items-center gap-6">
                           <h4 className="text-3xl font-black tracking-tight uppercase opacity-30 italic">{t('roles.workflows')}</h4>
                           <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                        </div>

                        <div className="grid gap-48">
                          {[1, 2, 3].map((w) => {
                            const images = roleWorkflowImages[role.id]?.[w] || [];
                            const activeIndex = workflowImageIndices[`${role.id}-${w}`] || 0;
                            
                            return (
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
                                    <div className="relative group/carousel">
                                      <ScreenshotPlaceholder 
                                        roleColor={color} 
                                        src={getWorkflowImage(role.id, w)}
                                        className="aspect-video shadow-2xl rounded-[3rem]" 
                                      />
                                      
                                      {/* Carousel Controls */}
                                      {images.length > 1 && (
                                        <>
                                          <button 
                                            onClick={() => setWorkflowImage(role.id, w, activeIndex - 1)}
                                            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-white/20 active:scale-95 z-20"
                                            aria-label="Previous image"
                                          >
                                            <ChevronLeft size={24} strokeWidth={3} />
                                          </button>
                                          <button 
                                            onClick={() => setWorkflowImage(role.id, w, activeIndex + 1)}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-white/20 active:scale-95 z-20"
                                            aria-label="Next image"
                                          >
                                            <ChevronRight size={24} strokeWidth={3} />
                                          </button>
                                          
                                          {/* Counter */}
                                          <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-slate-950/40 backdrop-blur-md text-[10px] font-black text-white uppercase tracking-widest z-20">
                                            {activeIndex + 1} / {images.length}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    
                                    {/* Multi-image indicators */}
                                    {images.length > 1 ? (
                                      <div className="flex gap-4 h-2">
                                         {images.map((_, idx) => (
                                           <button
                                             key={idx}
                                             onClick={() => setWorkflowImage(role.id, w, idx)}
                                             className={`flex-1 rounded-full ${bgFullMap[color]} transition-all duration-300 ${activeIndex === idx ? 'opacity-100' : 'opacity-20 hover:opacity-50'}`}
                                             aria-label={`Show image ${idx + 1}`}
                                           />
                                         ))}
                                      </div>
                                    ) : (
                                      <div className="grid grid-cols-3 gap-4 h-2">
                                         <div className={`rounded-full ${bgFullMap[color]} opacity-100`} />
                                         <div className={`rounded-full ${bgFullMap[color]} opacity-40`} />
                                         <div className={`rounded-full ${bgFullMap[color]} opacity-10`} />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Feature Gallery (Specific for System Admin) */}
                      {role.id === 'systemAdmin' && (
                        <div className="space-y-32 pt-32">
                          <div className="flex items-center gap-6">
                            <h4 className="text-3xl font-black tracking-tight uppercase opacity-30 italic">Platform Core Gallery</h4>
                            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                          </div>
                          
                          <div className="grid gap-32">
                            {systemAdminGallery.map((item, idx) => (
                              <div key={item.id} className={`grid lg:grid-cols-2 gap-16 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className={`space-y-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                                  <h5 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                                    {translate(`gallery.${item.id}.title`)}
                                  </h5>
                                  <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                    {translate(`gallery.${item.id}.description`)}
                                  </p>
                                </div>
                                <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                                  <ScreenshotPlaceholder 
                                    src={item.src} 
                                    alt={translate(`gallery.${item.id}.title`)}
                                    roleColor={color} 
                                    className="shadow-xl"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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
