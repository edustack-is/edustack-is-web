import {useTranslations} from 'next-intl';
import {ROLE_COLORS, BRAND_GRADIENT} from '@/components/brand/roles';
import {Section} from './Section';

export default function DemoSection() {
  const t = useTranslations('Index');
  const url = t('demo.url');

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
          <p className="font-body text-base md:text-lg leading-[1.5] opacity-90 max-w-[560px] mb-7">
            {t('demo.sub')}
          </p>
          <a
            href={`https://${url}`}
            className="inline-flex items-center gap-3 px-5 md:px-7 py-3.5 md:py-4 rounded-xl bg-white text-[#171120] font-body text-base font-bold no-underline shadow-[0_12px_30px_rgba(0,0,0,0.2)]"
          >
            {url} <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </Section>
  );
}
