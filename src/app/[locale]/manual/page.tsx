'use client';

import {useState, useEffect} from 'react';
import {useTranslations} from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ManualSidebar from '@/components/ManualSidebar';
import ScreenshotPlaceholder from '@/components/ScreenshotPlaceholder';
import Lightbox from '@/components/Lightbox';
import {COMPETENCY_MATRIX, COMPETENCY_ROLES, type RoleId} from '@/lib/competencyMatrix';
import {ENV_GROUPS, FRONTEND_URLS, type Required as EnvRequired} from '@/lib/envConfig';
import {Info, Laptop, Settings, LogIn, ShieldCheck, School, Search, UserCheck, GraduationCap, Users, CheckCircle2, Heart, ChevronLeft, ChevronRight, Cpu, Layers, ExternalLink, ZoomIn, Box, Database, Workflow, Network, KeyRound, Check, Minus, Terminal, Globe} from 'lucide-react';

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
  const [activeSection, setActiveSection] = useState('tech-stack');
  const [workflowImageIndices, setWorkflowImageIndices] = useState<Record<string, number>>({});
  const [diagramLightbox, setDiagramLightbox] = useState<{src: string; alt: string} | null>(null);

  const openDiagram = (src: string, alt: string) => setDiagramLightbox({src, alt});

  // Helper for dynamic translations to avoid ESLint any errors
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const translate = (key: string) => t(key as any);

  // Sync the sidebar highlight with the URL hash on mount (and whenever
  // it changes), so deep-linking from outside the page (e.g. the landing
  // methodology cards) marks the right item before the first scroll event.
  useEffect(() => {
    const applyHash = () => {
      const id = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
      if (id && document.getElementById(id)) {
        setActiveSection(id);
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  // Track the active section via scroll position: pick the last section
  // whose top is above the navbar bottom. This is more reliable than an
  // IntersectionObserver band at the page edges — at scrollY=0 the header
  // would occupy the band and no section would intersect, leaving the
  // default highlight stale.
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('section[id]'),
    );
    if (sections.length === 0) return;

    // Navbar + a small buffer; matches the scroll-mt-32 on each section.
    const offset = 140;

    const update = () => {
      const scrollY = window.scrollY;
      let current = sections[0].id;
      for (const s of sections) {
        if (s.offsetTop - offset <= scrollY) {
          current = s.id;
        } else {
          break;
        }
      }
      setActiveSection(current);
    };

    update();
    window.addEventListener('scroll', update, {passive: true});
    return () => window.removeEventListener('scroll', update);
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
        <main className="flex-1 px-4 md:px-10 lg:px-16 py-16 md:py-24 overflow-hidden">
          <div className="max-w-[100rem] mx-auto space-y-32">

            {/* Header */}
            <div className="space-y-6 text-center md:text-left border-b border-slate-100 dark:border-slate-800 pb-20">
              <h1 className="font-display text-4xl sm:text-5xl md:text-[58px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.02]">
                {t('title')}
              </h1>
              <p className="text-base md:text-[19px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[56rem]">
                {t('intro')}
              </p>
            </div>

            {/* Chapters Section */}
            <div className="space-y-64">

              {/* Tech Stack */}
              <section id="tech-stack" className="scroll-mt-32 space-y-16">
                <div className="space-y-6">
                  <div className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                    <Cpu className="h-10 w-10" />
                  </div>
                  <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">{t('tech_stack.title')}</h2>
                  <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                    {t('tech_stack.description')}
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {['nestjs', 'react', 'cloudflare_d1', 'mcp', 'nextjs', 'tailwind'].map((key) => (
                    <a
                      key={key}
                      href={translate(`tech_stack.items.${key}.link`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl hover:border-brand-purple/30 transition-all hover:-translate-y-1"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <h4 className="font-display text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-brand-purple transition-colors">
                          {translate(`tech_stack.items.${key}.title`)}
                        </h4>
                        <ExternalLink size={20} className="text-slate-300 group-hover:text-brand-purple transition-colors" />
                      </div>
                      <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        {translate(`tech_stack.items.${key}.description`)}
                      </p>
                    </a>
                  ))}
                </div>
              </section>

              {/* Application Modules */}
              <section id="modules" className="scroll-mt-32 space-y-16">
                <div className="space-y-6">
                  <div className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                    <Layers className="h-10 w-10" />
                  </div>
                  <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">{t('modules.title')}</h2>
                  <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                    {t('modules.description')}
                  </p>
                </div>

                <div className="space-y-10">
                  {['admin', 'auth', 'registry', 'schedule', 'grading', 'ai', 'mcp'].map((key) => (
                    <div key={key} className="group p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl transition-all">
                      <div className="grid lg:grid-cols-3 gap-12">
                        <div className="space-y-4">
                          <div className="inline-flex p-3 rounded-2xl bg-brand-purple/10 text-brand-purple mb-2">
                             <Box size={24} />
                          </div>
                          <h4 className="font-display text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-brand-purple transition-colors">
                            {translate(`modules.list.${key}.title`)}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {translate(`modules.list.${key}.tech`).split(', ').map((tag: string) => (
                              <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-10">
                          <div className="space-y-3">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">How it&apos;s built</span>
                            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
                              {translate(`modules.list.${key}.built`)}
                            </p>
                          </div>
                          <div className="space-y-3">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Core Benefit</span>
                            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                              {translate(`modules.list.${key}.benefit`)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Data Model */}
              <section id="data-model" className="scroll-mt-32 space-y-16">
                <div className="space-y-6">
                  <div className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                    <Database className="h-10 w-10" />
                  </div>
                  <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">{t('data_model.title')}</h2>
                  <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                    {t('data_model.description')}
                  </p>
                </div>

                <div className="grid gap-10 md:grid-cols-2">
                  {[
                    { id: 'tenancy', file: '01-tenancy-identity' },
                    { id: 'academic', file: '02-academic-structure' },
                    { id: 'workload', file: '03-workload-space' },
                    { id: 'schedule', file: '04-schedule' },
                    { id: 'grading', file: '05-attendance-grading' },
                    { id: 'planning', file: '06-planning-materials' },
                    { id: 'communication', file: '07-communication' },
                    { id: 'system', file: '08-system-ai' },
                  ].map((d, idx) => {
                    const base = `/images/documentation/architecture/er-domains/${d.file}`;
                    return (
                      <figure key={d.id} className="group flex flex-col rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl hover:border-brand-purple/30 transition-all overflow-hidden">
                        <div className="flex items-center gap-3 px-8 pt-7 pb-4">
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-purple/10 text-brand-purple font-bold text-sm">
                            {idx + 1}
                          </span>
                          <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {translate(`data_model.domains.${d.id}.title`)}
                          </h3>
                        </div>
                        <p className="px-8 pb-5 text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                          {translate(`data_model.domains.${d.id}.description`)}
                        </p>
                        <button
                          type="button"
                          onClick={() => openDiagram(`${base}.png`, translate(`data_model.domains.${d.id}.title`))}
                          aria-label={t('data_model.openFull')}
                          className="relative block w-full text-left border-t border-slate-100 dark:border-slate-800 bg-white overflow-hidden cursor-zoom-in"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`${base}.png`}
                            alt={translate(`data_model.domains.${d.id}.title`)}
                            className="block w-full h-auto bg-white transition-transform duration-500 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                          <span className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            {t('data_model.openFull')}
                            <ZoomIn size={12} />
                          </span>
                        </button>
                      </figure>
                    );
                  })}
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                  {t('data_model.caption')}
                </p>

                {/* Full consolidated diagram */}
                <div className="space-y-8 pt-12 border-t border-slate-100 dark:border-slate-800">
                  <div className="space-y-4">
                    <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {t('data_model.fullTitle')}
                    </h3>
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                      {t('data_model.fullDescription')}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => openDiagram('/images/documentation/architecture/er-diagram.png', t('data_model.fullTitle'))}
                    aria-label={t('data_model.openFull')}
                    className="group relative block w-full text-left rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl hover:border-brand-purple/30 transition-all overflow-hidden cursor-zoom-in"
                  >
                    <div className="overflow-auto max-h-[80vh]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/documentation/architecture/er-diagram.png"
                        alt={t('data_model.fullTitle')}
                        className="block h-auto max-w-none bg-white"
                        style={{ width: '6000px' }}
                        loading="lazy"
                      />
                    </div>
                    <div className="pointer-events-none absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest">
                      {t('data_model.fullScrollHint')}
                    </div>
                    <span className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      {t('data_model.openFull')}
                      <ZoomIn size={12} />
                    </span>
                  </button>
                </div>
              </section>

              {/* Competency Matrix */}
              <section id="competency-matrix" className="scroll-mt-32 space-y-16">
                <div className="space-y-6">
                  <div className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                    <KeyRound className="h-10 w-10" />
                  </div>
                  <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">{t('competency_matrix.title')}</h2>
                  <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                    {t('competency_matrix.description')}
                  </p>
                  <div className="flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-brand-purple/15 text-brand-purple">
                        <Check size={14} strokeWidth={3} />
                      </span>
                      {t('competency_matrix.legend.allowed')}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400">
                        <Minus size={14} strokeWidth={3} />
                      </span>
                      {t('competency_matrix.legend.denied')}
                    </span>
                  </div>
                </div>

                <div className="space-y-10">
                  {COMPETENCY_MATRIX.map((domain, dIdx) => (
                    <div
                      key={domain.id}
                      className="rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 px-8 pt-7 pb-4">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-purple/10 text-brand-purple font-bold text-sm">
                            {dIdx + 1}
                          </span>
                          <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {translate(`competency_matrix.domains.${domain.id}`)}
                          </h3>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          {domain.operations.length} {t('competency_matrix.legend.domainOps')}
                        </span>
                      </div>

                      <div className="overflow-x-auto border-t border-slate-100 dark:border-slate-800">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-50/60 dark:bg-slate-950/40">
                            <tr>
                              <th
                                scope="col"
                                className="sticky left-0 z-10 bg-slate-50/60 dark:bg-slate-950/40 px-6 py-4 text-left font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 min-w-[300px]"
                              >
                                Operation
                              </th>
                              {COMPETENCY_ROLES.map((r) => (
                                <th
                                  key={r}
                                  scope="col"
                                  className="px-2 py-4 text-center font-bold text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 whitespace-nowrap"
                                  title={translate(`competency_matrix.roles.${r}`)}
                                >
                                  <span className="hidden md:inline">{translate(`competency_matrix.roles.${r}`)}</span>
                                  <span className="md:hidden">{translate(`competency_matrix.rolesShort.${r}`)}</span>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {domain.operations.map((op, opIdx) => (
                              <tr
                                key={op.id}
                                className={opIdx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/30 dark:bg-slate-950/20'}
                              >
                                <th
                                  scope="row"
                                  className="sticky left-0 z-[5] bg-inherit px-6 py-3 text-left font-medium text-slate-700 dark:text-slate-300"
                                >
                                  {translate(`competency_matrix.ops.${op.id}`)}
                                </th>
                                {COMPETENCY_ROLES.map((r: RoleId) => {
                                  const allowed = op.roles.includes(r);
                                  return (
                                    <td key={r} className="px-2 py-3 text-center">
                                      <span
                                        className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${allowed ? 'bg-brand-purple/15 text-brand-purple' : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600'}`}
                                        aria-label={allowed ? t('competency_matrix.legend.allowed') : t('competency_matrix.legend.denied')}
                                      >
                                        {allowed ? <Check size={14} strokeWidth={3} /> : <Minus size={14} strokeWidth={3} />}
                                      </span>
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* System Architecture */}
              <section id="system-architecture" className="scroll-mt-32 space-y-16">
                <div className="space-y-6">
                  <div className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                    <Network className="h-10 w-10" />
                  </div>
                  <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">{t('system_architecture.title')}</h2>
                  <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                    {t('system_architecture.description')}
                  </p>
                </div>

                <div className="space-y-12">
                  {[
                    { id: 'components', title: t('system_architecture.componentsTitle'), description: t('system_architecture.componentsDescription'), file: 'components' },
                    { id: 'actors', title: t('system_architecture.actorsTitle'), description: t('system_architecture.actorsDescription'), file: 'actors' },
                  ].map((d) => {
                    const src = `/images/documentation/architecture/components/${d.file}.png`;
                    return (
                      <figure key={d.id} className="group flex flex-col rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl hover:border-brand-purple/30 transition-all overflow-hidden">
                        <div className="px-8 pt-7 pb-3 space-y-3">
                          <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {d.title}
                          </h3>
                          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            {d.description}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => openDiagram(src, d.title)}
                          aria-label={t('system_architecture.openFull')}
                          className="relative block w-full text-left border-t border-slate-100 dark:border-slate-800 bg-white overflow-hidden cursor-zoom-in"
                        >
                          <div className="overflow-x-auto">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={d.title}
                              className="block h-auto max-w-none bg-white transition-transform duration-500 group-hover:scale-[1.01]"
                              style={{ width: '100%', minWidth: d.id === 'components' ? '1800px' : '900px' }}
                              loading="lazy"
                            />
                          </div>
                          <span className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            {t('system_architecture.openFull')}
                            <ZoomIn size={12} />
                          </span>
                        </button>
                      </figure>
                    );
                  })}
                </div>
              </section>

              {/* Key Processes (sequence diagrams) */}
              <section id="processes" className="scroll-mt-32 space-y-16">
                <div className="space-y-6">
                  <div className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                    <Workflow className="h-10 w-10" />
                  </div>
                  <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">{t('processes.title')}</h2>
                  <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                    {t('processes.description')}
                  </p>
                </div>

                <div className="space-y-10">
                  {[
                    { id: 'init-setup', file: 'seq-init-setup' },
                    { id: 'login', file: 'seq-login' },
                    { id: 'generate-data', file: 'seq-generate-data' },
                    { id: 'backup-restore', file: 'seq-backup-restore' },
                    { id: 'ai-generation', file: 'seq-ai-generation' },
                    { id: 'substitution', file: 'seq-substitution' },
                    { id: 'absence-excuse', file: 'seq-absence-excuse' },
                  ].map((d, idx) => {
                    const src = `/images/documentation/architecture/sequences/${d.file}.png`;
                    return (
                      <figure key={d.id} className="group flex flex-col rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl hover:border-brand-purple/30 transition-all overflow-hidden">
                        <div className="flex items-center gap-3 px-8 pt-7 pb-3">
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-purple/10 text-brand-purple font-bold text-sm">
                            {idx + 1}
                          </span>
                          <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {translate(`processes.list.${d.id}.title`)}
                          </h3>
                        </div>
                        <p className="px-8 pb-5 pl-20 text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                          {translate(`processes.list.${d.id}.description`)}
                        </p>
                        <button
                          type="button"
                          onClick={() => openDiagram(src, translate(`processes.list.${d.id}.title`))}
                          aria-label={t('processes.openFull')}
                          className="relative block w-full text-left border-t border-slate-100 dark:border-slate-800 bg-white overflow-hidden cursor-zoom-in"
                        >
                          <div className="overflow-x-auto">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={translate(`processes.list.${d.id}.title`)}
                              className="block h-auto max-w-none bg-white"
                              style={{ width: '100%', minWidth: '1600px' }}
                              loading="lazy"
                            />
                          </div>
                          <span className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            {t('processes.openFull')}
                            <ZoomIn size={12} />
                          </span>
                        </button>
                      </figure>
                    );
                  })}
                </div>
              </section>

              {/* Local Development */}
              <section id="development" className="scroll-mt-32 space-y-16">
                <div className="space-y-6">
                  <div className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                    <Laptop className="h-10 w-10" />
                  </div>
                  <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">{t('development.title')}</h2>
                  <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                    {t('development.description')}
                  </p>
                </div>

                {/* Prerequisites */}
                <div className="space-y-6">
                  <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {t('development.prereqsTitle')}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {(['node', 'npm', 'wrangler'] as const).map((p) => (
                      <div key={p} className="p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                        <h4 className="font-display text-base font-bold text-slate-900 dark:text-white mb-2">
                          {translate(`development.prereqs.${p}.label`)}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                          {translate(`development.prereqs.${p}.description`)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick start steps */}
                <div className="space-y-6">
                  <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {t('development.stepsTitle')}
                  </h3>
                  <div className="space-y-4">
                    {(['clone', 'env', 'secrets', 'install', 'db', 'dev'] as const).map((s, idx) => (
                      <div key={s} className="flex gap-4 p-5 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple font-bold text-sm">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                          <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                            {translate(`development.steps.${s}.title`)}
                          </h4>
                          <pre className="overflow-x-auto rounded-xl bg-slate-950 text-slate-100 px-4 py-3 text-xs md:text-sm font-mono leading-relaxed">
                            <code>{translate(`development.steps.${s}.command`)}</code>
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Default URLs */}
                <div className="space-y-6">
                  <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {t('development.urlsTitle')}
                  </h3>
                  <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {FRONTEND_URLS.map((u) => (
                          <tr key={u.id}>
                            <th scope="row" className="px-6 py-3 text-left font-medium text-slate-700 dark:text-slate-300 inline-flex items-center gap-2">
                              <Globe size={14} className="text-slate-400" />
                              {translate(`development.urls.${u.id}`)}
                            </th>
                            <td className="px-6 py-3 font-mono text-xs md:text-sm text-brand-purple">
                              {u.url}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Frontend note */}
                <div className="rounded-[2rem] border border-brand-purple/20 bg-brand-purple/5 dark:bg-brand-purple/10 p-6 md:p-8 space-y-3">
                  <h4 className="font-display text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Info size={18} className="text-brand-purple" />
                    {t('development.frontendNoteTitle')}
                  </h4>
                  <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    {t('development.frontendNote')}
                  </p>
                </div>

                {/* .env reference */}
                <div className="space-y-6 pt-8 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <Terminal className="h-6 w-6 text-brand-purple" />
                    <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {t('development.env.title')}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                    {t('development.env.description')}
                  </p>

                  <div className="space-y-8">
                    {ENV_GROUPS.map((g, gIdx) => (
                      <div key={g.id} className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                        <div className="flex items-center gap-3 px-6 pt-5 pb-3">
                          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple font-bold text-xs">
                            {gIdx + 1}
                          </span>
                          <h4 className="font-display text-base md:text-lg font-bold text-slate-900 dark:text-white">
                            {translate(`development.env.groups.${g.id}`)}
                          </h4>
                        </div>
                        <div className="overflow-x-auto border-t border-slate-100 dark:border-slate-800">
                          <table className="w-full text-sm">
                            <thead className="bg-slate-50/60 dark:bg-slate-950/40">
                              <tr>
                                <th scope="col" className="px-4 py-3 text-left font-bold text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 min-w-[180px]">
                                  {t('development.env.columnName')}
                                </th>
                                <th scope="col" className="px-4 py-3 text-left font-bold text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 min-w-[180px]">
                                  {t('development.env.columnExample')}
                                </th>
                                <th scope="col" className="px-4 py-3 text-left font-bold text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                  {t('development.env.columnDescription')}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                              {g.vars.map((v) => {
                                const badge: Record<EnvRequired, string> = {
                                  required: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
                                  recommended: 'bg-brand-purple/15 text-brand-purple',
                                  optional: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
                                };
                                return (
                                  <tr key={v.id} className="align-top">
                                    <th scope="row" className="px-4 py-3 text-left">
                                      <code className="font-mono text-xs md:text-sm text-slate-900 dark:text-slate-100 break-all">
                                        {v.name}
                                      </code>
                                      <div className="mt-1.5">
                                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest ${badge[v.required]}`}>
                                          {t(`development.env.${v.required}`)}
                                        </span>
                                      </div>
                                    </th>
                                    <td className="px-4 py-3">
                                      {v.example ? (
                                        <code className="font-mono text-xs text-slate-600 dark:text-slate-400 break-all whitespace-pre-wrap">
                                          {v.example}
                                        </code>
                                      ) : (
                                        <span className="text-slate-300 dark:text-slate-600">—</span>
                                      )}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                      {translate(`development.env.vars.${v.id}`)}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* System Setup */}
              <section id="setup" className="scroll-mt-32 space-y-16">
                <div className="space-y-6">
                  <div className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                    <Settings className="h-10 w-10" />
                  </div>
                  <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">{t('setup.title')}</h2>
                  <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                    {t('setup.description')}
                  </p>
                </div>

                <div className="grid gap-10 md:grid-cols-2">
                  <div className="group flex flex-col gap-8 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-2xl">
                    <div className="space-y-4">
                      <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-brand-purple">{translate('setup.option1.title')}</h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{translate('setup.option1.description')}</p>
                    </div>
                    <ScreenshotPlaceholder 
                      src="/images/documentation/system-setup/01_system_setupm_upload_bachup_file.png" 
                      alt="Restore from Backup" 
                      roleColor="brand-purple" 
                      className="aspect-[4/3] group-hover:scale-[1.03] transition-transform" 
                    />
                  </div>
                  <div className="group flex flex-col gap-8 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-2xl">
                    <div className="space-y-4">
                      <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-brand-purple">{translate('setup.option2.title')}</h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{translate('setup.option2.description')}</p>
                    </div>
                    <ScreenshotPlaceholder 
                      src="/images/documentation/system-setup/00_system_setup_from_scratch.png" 
                      alt="System Setup from Scratch" 
                      roleColor="brand-purple" 
                      className="aspect-[4/3] group-hover:scale-[1.03] transition-transform" 
                    />
                  </div>
                </div>
              </section>

              {/* User Authentication */}
              <section id="login" className="scroll-mt-32 space-y-16">
                <div className="space-y-6">
                  <div className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                    <LogIn className="h-10 w-10" />
                  </div>
                  <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">{t('login.title')}</h2>
                  <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                    {t('login.description')}
                  </p>
                </div>

                <div className="space-y-24">
                  <div className="grid gap-12 lg:grid-cols-2 items-center">
                    <div className="space-y-8">
                      {['helper', 'credentials', 'sso'].map((type) => (
                        <div key={type} className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-4 hover:bg-white dark:hover:bg-slate-900 transition-colors hover:shadow-xl group">
                          <h4 className="font-display text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-brand-purple transition-colors">{translate(`login.${type}.title`)}</h4>
                          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{translate(`login.${type}.description`)}</p>
                        </div>
                      ))}
                    </div>
                    <ScreenshotPlaceholder 
                      src="/images/documentation/login/00_login_with_helper.png" 
                      alt="Login with Developer Helper" 
                      roleColor="brand-purple" 
                      className="shadow-2xl"
                    />
                  </div>
                  <div className="space-y-8 text-center">
                    <h4 className="font-display text-lg md:text-xl font-bold tracking-tight">Standard Secure Login</h4>
                    <ScreenshotPlaceholder 
                      src="/images/documentation/login/01_login_without_helper.png" 
                      alt="Standard Login Screen" 
                      roleColor="brand-purple" 
                      className="max-w-3xl mx-auto shadow-2xl"
                    />
                  </div>
                </div>
              </section>

            </div>

            {/* Roles Section */}
            <div className="space-y-32 pt-20 border-t border-slate-100 dark:border-slate-800">
              <div className="space-y-6 text-center md:text-left">
                <h2 className="font-display text-4xl sm:text-5xl md:text-[58px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.02]">
                  {t('roles.title')}
                </h2>
                <div className="h-2 w-32 bg-brand-purple rounded-full md:mx-0 mx-auto" />
                <p className="text-base md:text-[19px] text-slate-500 dark:text-slate-400 font-medium max-w-[56rem]">
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
                            <h3 className={`font-display text-3xl md:text-[46px] font-bold tracking-tight ${textMap[color]} leading-[1.05]`}>
                              {translate(`roles.${role.id}.title`)}
                            </h3>
                          </div>
                          
                          <div className="space-y-8">
                            <p className="font-display text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-200 leading-snug text-balance">
                              {translate(`roles.${role.id}.description`)}
                            </p>
                            
                            <div className="p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 space-y-6 relative overflow-hidden">
                              <div className={`absolute top-0 right-0 h-full w-2 ${bgFullMap[color]}`} />
                              <h4 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                                <Info size={16} /> {t('roles.coreFunctions')}
                              </h4>
                              <p className="text-base md:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
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
                           <h4 className="font-display text-base md:text-lg font-bold tracking-[0.08em] uppercase opacity-30 italic">{t('roles.workflows')}</h4>
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
                                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border-2 ${borderMap[color]} ${textMap[color]} font-bold text-xl shadow-lg`}>
                                          {w}
                                        </div>
                                        <h5 className="font-display text-xl md:text-[23px] font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                                          {translate(`roles.${role.id}.workflow${w}.title`)}
                                        </h5>
                                      </div>
                                      <p className="text-base md:text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed pl-16">
                                        {translate(`roles.${role.id}.workflow${w}.description`)}
                                      </p>
                                    </div>

                                    <div className="pl-16 space-y-6">
                                      <div className="flex items-center gap-3">
                                        <div className={`h-px w-8 ${bgFullMap[color]}`} />
                                        <span className={`text-xs font-bold uppercase tracking-widest ${textMap[color]}`}>{t('roles.procedure')}</span>
                                      </div>
                                      <div className="grid gap-4">
                                        {[1, 2, 3, 4].map((s) => (
                                          <div key={s} className="flex gap-4 group/step transition-all hover:translate-x-1">
                                            <CheckCircle2 className={`h-6 w-6 shrink-0 ${textMap[color]} opacity-20 group-hover/step:opacity-100 transition-opacity`} />
                                            <p className="text-sm md:text-[15px] font-medium text-slate-700 dark:text-slate-300 leading-snug">
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
                                          <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-slate-950/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest z-20">
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
                            <h4 className="font-display text-base md:text-lg font-bold tracking-[0.08em] uppercase opacity-30 italic">Platform Core Gallery</h4>
                            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                          </div>
                          
                          <div className="grid gap-32">
                            {systemAdminGallery.map((item, idx) => (
                              <div key={item.id} className={`grid lg:grid-cols-2 gap-16 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className={`space-y-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                                  <h5 className="font-display text-xl md:text-[23px] font-bold tracking-tight text-slate-900 dark:text-white">
                                    {translate(`gallery.${item.id}.title`)}
                                  </h5>
                                  <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
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

      <Lightbox
        src={diagramLightbox?.src ?? ''}
        alt={diagramLightbox?.alt ?? ''}
        isOpen={diagramLightbox !== null}
        onClose={() => setDiagramLightbox(null)}
        fit="native"
      />
    </div>
  );
}
