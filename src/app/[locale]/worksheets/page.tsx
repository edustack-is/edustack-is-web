import {useTranslations} from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {BookCheck, GraduationCap, School, Code} from 'lucide-react';

export default function WorksheetsPage() {
  const t = useTranslations('Worksheets');

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-12">
        <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
        
        <div className="grid gap-8 md:grid-cols-3">
          {/* Primary School */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <School className="h-8 w-8 text-primary" />
              <h2 className="text-xl font-bold">{t('primary.title')}</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <BookCheck className="h-5 w-5 text-muted-foreground shrink-0" />
                <span>{t('primary.lesson1')}</span>
              </li>
              <li className="flex gap-3">
                <BookCheck className="h-5 w-5 text-muted-foreground shrink-0" />
                <span>{t('primary.lesson2')}</span>
              </li>
              <li className="flex gap-3">
                <BookCheck className="h-5 w-5 text-muted-foreground shrink-0" />
                <span>{t('primary.lesson3')}</span>
              </li>
            </ul>
          </div>

          {/* Secondary School */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h2 className="text-xl font-bold">{t('secondary.title')}</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <BookCheck className="h-5 w-5 text-muted-foreground shrink-0" />
                <span>{t('secondary.lesson1')}</span>
              </li>
              <li className="flex gap-3">
                <BookCheck className="h-5 w-5 text-muted-foreground shrink-0" />
                <span>{t('secondary.lesson2')}</span>
              </li>
              <li className="flex gap-3">
                <BookCheck className="h-5 w-5 text-muted-foreground shrink-0" />
                <span>{t('secondary.lesson3')}</span>
              </li>
            </ul>
          </div>

          {/* High School */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-8 w-8 text-primary" />
              <h2 className="text-xl font-bold">{t('high.title')}</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <BookCheck className="h-5 w-5 text-muted-foreground shrink-0" />
                <span>{t('high.lesson1')}</span>
              </li>
              <li className="flex gap-3">
                <BookCheck className="h-5 w-5 text-muted-foreground shrink-0" />
                <span>{t('high.lesson2')}</span>
              </li>
              <li className="flex gap-3">
                <BookCheck className="h-5 w-5 text-muted-foreground shrink-0" />
                <span>{t('high.lesson3')}</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
