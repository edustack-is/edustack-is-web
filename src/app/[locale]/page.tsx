import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {ArrowRight, BookOpen, ShieldCheck, Cpu, Sparkles, Layers, Zap} from 'lucide-react';

export default function IndexPage() {
  const t = useTranslations('Index');

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-4 py-20 md:py-32 lg:py-48 overflow-hidden bg-grid-slate-100">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background" />
          
          {/* Decorative Blobs */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-brand-purple/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-20 -right-4 w-72 h-72 bg-brand-pink/20 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl" />

          <div className="container relative flex max-w-[64rem] flex-col items-center gap-8 text-center mx-auto">
            <div className="inline-flex items-center rounded-full border border-brand-purple/20 bg-brand-purple/5 px-4 py-1.5 text-sm font-medium text-brand-purple mb-4">
              <Sparkles className="mr-2 h-4 w-4" /> {t('description')}
            </div>
            
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple via-brand-pink to-brand-orange">
                {t('hero.title')}
              </span>
            </h1>
            
            <p className="max-w-[42rem] leading-normal text-slate-600 dark:text-slate-400 text-xl sm:text-2xl font-medium">
              {t('hero.subtitle')}
            </p>
            
            <p className="max-w-[38rem] leading-relaxed text-slate-500 dark:text-slate-400 text-lg">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <Link 
                href="/#idea" 
                className="group inline-flex items-center justify-center rounded-full bg-brand-purple px-10 py-4 text-lg font-bold text-white shadow-[0_10px_20px_rgba(109,40,217,0.3)] transition-all hover:bg-brand-purple/90 hover:scale-105 active:scale-95"
              >
                {t('hero.explore')} <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="/worksheets" 
                className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm px-10 py-4 text-lg font-bold shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-brand-purple/30"
              >
                {t('hero.worksheets')}
              </Link>
            </div>
          </div>
        </section>

        {/* Idea Section */}
        <section id="idea" className="relative px-4 py-24 md:py-32">
          <div className="container max-w-[64rem] mx-auto space-y-16">
            <div className="mx-auto flex flex-col items-center space-y-4 text-center">
              <h2 className="font-heading text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
                {t('idea.title')}
              </h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-brand-purple to-brand-pink rounded-full" />
              <p className="max-w-[85%] text-slate-600 dark:text-slate-400 text-xl font-medium pt-4">
                {t('idea.description')}
              </p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {icon: ShieldCheck, color: 'brand-purple', text: t('idea.point1')},
                {icon: BookOpen, color: 'brand-pink', text: t('idea.point2')},
                {icon: Layers, color: 'brand-orange', text: t('idea.point3')}
              ].map((item, i) => (
                <div key={i} className="group relative">
                  <div className={`absolute inset-0 bg-${item.color}/10 rounded-3xl blur-xl transition-opacity group-hover:opacity-100 opacity-0`} />
                  <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-background p-10 transition-all hover:shadow-2xl hover:-translate-y-2 h-full">
                    <div className={`mb-8 inline-flex p-4 rounded-2xl bg-${item.color}/10 text-${item.color}`}>
                      <item.icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                      {item.text}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Section */}
        <section id="tech" className="px-4 py-24 md:py-32 bg-slate-900 dark:bg-slate-950 text-white rounded-[3rem] md:rounded-[5rem] mx-4 my-8 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(109,40,217,0.15),transparent)] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.1),transparent)] pointer-events-none" />
          
          <div className="container max-w-[64rem] mx-auto relative z-10 space-y-16">
            <div className="mx-auto flex flex-col items-center space-y-4 text-center">
              <div className="p-3 rounded-2xl bg-brand-teal/20 text-brand-teal mb-2">
                <Cpu className="h-8 w-8" />
              </div>
              <h2 className="font-heading text-4xl md:text-6xl font-black tracking-tight">
                {t('tech.title')}
              </h2>
              <p className="max-w-[85%] text-slate-400 text-xl font-medium">
                {t('tech.description')}
              </p>
            </div>
            
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white leading-tight">
                    {t('tech.stack')}
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    {t('tech.architecture')}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {name: 'NestJS', color: 'brand-purple'},
                    {name: 'React', color: 'brand-teal'},
                    {name: 'D1 DB', color: 'brand-orange'},
                    {name: 'MCP AI', color: 'brand-pink'}
                  ].map((tech) => (
                    <div key={tech.name} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className={`h-3 w-3 rounded-full bg-${tech.color}`} />
                      <span className="font-bold">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-1 flex items-center justify-center">
                <div className="absolute inset-0 bg-grid-slate-100 opacity-10" />
                <Zap className="h-32 w-32 text-brand-orange animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Rules Section */}
        <section id="rules" className="px-4 py-24 md:py-32">
          <div className="container max-w-[64rem] mx-auto space-y-12">
            <div className="mx-auto flex flex-col items-center space-y-4 text-center">
              <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                {t('rules.title')}
              </h2>
              <p className="max-w-[85%] text-slate-600 dark:text-slate-400 text-xl font-medium pt-4">
                {t('rules.description')}
              </p>
            </div>
            
            <div className="mx-auto max-w-[48rem] grid gap-6">
              {[
                {text: t('rules.clause1'), color: 'brand-purple'},
                {text: t('rules.clause2'), color: 'brand-teal'}
              ].map((clause, i) => (
                <div key={i} className="flex items-start gap-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-background p-8 shadow-sm transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700">
                  <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-${clause.color}/10 text-${clause.color}`}>
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200 pt-1">{clause.text}</p>
                </div>
              ))}
              <div className="pt-12 text-center space-y-6">
                <Link 
                  href="/terms" 
                  className="inline-flex items-center text-brand-purple font-bold hover:underline underline-offset-4 decoration-2"
                >
                  {t('rules.viewTerms')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <p className="text-2xl font-black italic bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">
                  {t('rules.cta')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
