import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {ArrowRight, Laptop, Mail} from 'lucide-react';
import {ROLE_COLORS, BRAND_GRADIENT} from '@/components/brand/roles';
import {Section} from './Section';

export default function DemoSection() {
  const t = useTranslations('Index');
  const email = t('demo.email');
  const mailto = `mailto:${email}?subject=${encodeURIComponent(t('demo.requestSubject'))}`;

  return (
    <Section
      id="demo"
      eyebrow={t('demo.eyebrow')}
      eyebrowColor={ROLE_COLORS.orange}
    >
      <div
        className="relative px-8 md:px-12 py-10 md:py-12 rounded-3xl overflow-hidden text-white"
        style={{background: BRAND_GRADIENT}}
      >
        {Array.from({length: 10}).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/30 hy-pulse pointer-events-none"
            style={{
              top: `${((i * 13) % 85) + 5}%`,
              left: `${((i * 17) % 85) + 5}%`,
              width: 6 + (i % 4) * 5,
              height: 6 + (i % 4) * 5,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + (i % 3)}s`
            }}
          />
        ))}
        <div className="relative">
          <h2 className="font-display text-3xl md:text-[48px] leading-[1.05] tracking-[-0.025em] mb-4 text-balance max-w-[760px] font-bold">
            {t('demo.title')}
          </h2>
          <p className="font-body text-base md:text-lg leading-[1.5] opacity-90 max-w-[640px] mb-8">
            {t('demo.sub')}
          </p>

          <div className="grid md:grid-cols-2 gap-3.5">
            {/* Run it locally — the primary path */}
            <div className="relative flex flex-col gap-3 p-5 md:p-6 rounded-2xl bg-white text-[#171120] shadow-[0_12px_30px_rgba(0,0,0,0.2)]">
              <div className="flex items-center justify-between gap-3">
                <span
                  className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white"
                  style={{
                    background: `linear-gradient(135deg, ${ROLE_COLORS.purple}, ${ROLE_COLORS.magenta})`
                  }}
                >
                  <Laptop size={18} />
                </span>
                <span
                  className="font-mono text-[10px] tracking-[0.08em] uppercase px-2 py-1 rounded-md text-white"
                  style={{background: ROLE_COLORS.green}}
                >
                  {t('demo.localBadge')}
                </span>
              </div>
              <div className="font-display text-xl font-bold">
                {t('demo.localTitle')}
              </div>
              <p className="font-body text-sm leading-[1.55] text-[#171120]/75">
                {t('demo.localBody')}
              </p>
              <Link
                href="/manual#development"
                className="mt-auto inline-flex items-center gap-2 self-start font-body text-[15px] font-bold px-5 py-3 rounded-xl text-white no-underline"
                style={{
                  background: `linear-gradient(135deg, ${ROLE_COLORS.purple}, ${ROLE_COLORS.magenta})`,
                  boxShadow: `0 8px 20px ${ROLE_COLORS.purple}40`
                }}
              >
                {t('demo.localCta')} <ArrowRight size={16} />
              </Link>
            </div>

            {/* Hosted demo on request */}
            <div className="relative flex flex-col gap-3 p-5 md:p-6 rounded-2xl bg-white/12 border border-white/25 backdrop-blur-sm">
              <span className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-white/20 text-white">
                <Mail size={18} />
              </span>
              <div className="font-display text-xl font-bold">
                {t('demo.requestTitle')}
              </div>
              <p className="font-body text-sm leading-[1.55] opacity-90">
                {t('demo.requestBody')}
              </p>
              <a
                href={mailto}
                className="mt-auto inline-flex items-center gap-2 self-start font-body text-[15px] font-bold px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 transition-colors no-underline"
              >
                {t('demo.requestCta')} <span aria-hidden>↗</span>
              </a>
            </div>
          </div>

          <div className="mt-9 pt-7 border-t border-white/20">
            <p className="font-body text-base md:text-lg font-bold mb-4">
              {t('demo.feedbackTitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={t('demo.feedbackStudentUrl')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-body text-sm md:text-base font-bold no-underline border border-white/25 transition-colors"
              >
                {t('demo.feedbackStudent')} <span aria-hidden>↗</span>
              </a>
              <a
                href={t('demo.feedbackTeacherUrl')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-body text-sm md:text-base font-bold no-underline border border-white/25 transition-colors"
              >
                {t('demo.feedbackTeacher')} <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
