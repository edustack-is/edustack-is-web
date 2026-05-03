import {useTranslations} from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {ArrowRight, BookOpen, Code, ShieldCheck} from 'lucide-react';

export default function IndexPage() {
  const t = useTranslations('Index');

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              {t('hero.title')}
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              {t('hero.subtitle')}
            </p>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg">
              {t('hero.description')}
            </p>
            <div className="space-x-4">
              <a href="#idea" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                Explore Idea <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Idea Section */}
        <section id="idea" className="container space-y-6 py-8 md:py-12 lg:py-24 bg-slate-50 dark:bg-slate-900 rounded-3xl">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
              {t('idea.title')}
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              {t('idea.description')}
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <ShieldCheck className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">{t('idea.point1')}</h3>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <BookOpen className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">{t('idea.point2')}</h3>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Code className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">{t('idea.point3')}</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Section */}
        <section id="tech" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
              {t('tech.title')}
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              {t('tech.description')}
            </p>
          </div>
          <div className="mx-auto grid max-w-[40rem] gap-4 py-8">
            <div className="grid gap-1">
              <h3 className="text-xl font-bold">{t('tech.stack')}</h3>
              <p className="text-muted-foreground">{t('tech.architecture')}</p>
            </div>
          </div>
        </section>

        {/* Rules Section */}
        <section id="rules" className="container py-8 md:py-12 lg:py-24 border-t">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
              {t('rules.title')}
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              {t('rules.description')}
            </p>
            <ul className="text-left space-y-2">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {t('rules.clause1')}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {t('rules.clause2')}
              </li>
            </ul>
            <p className="pt-4 font-medium italic">{t('rules.cta')}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
