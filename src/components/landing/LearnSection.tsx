import {useTranslations} from 'next-intl';
import {ROLE_COLORS} from '@/components/brand/roles';
import {Section} from './Section';

type Tier = {
  label: string;
  grade: string;
  verb: string;
  body: string;
};

const TIER_COLORS = [
  ROLE_COLORS.green,
  ROLE_COLORS.cyan,
  ROLE_COLORS.purple
] as const;

export default function LearnSection() {
  const t = useTranslations('Index');
  const tiers = t.raw('learn.tiers') as Tier[];

  return (
    <Section
      id="learn"
      eyebrow={t('learn.eyebrow')}
      eyebrowColor={ROLE_COLORS.green}
      title={t('learn.title')}
      sub={t('learn.sub')}
    >
      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((tier, i) => {
          const color = TIER_COLORS[i] ?? TIER_COLORS[0];
          return (
            <div
              key={tier.label}
              className="relative overflow-hidden p-6 rounded-2xl border border-line bg-card flex flex-col gap-4"
            >
              <div
                className="absolute -top-12 -right-12 w-[160px] h-[160px] rounded-full opacity-[0.18] blur-[28px]"
                style={{background: color}}
              />
              <div className="relative flex items-baseline justify-between">
                <span
                  className="font-mono text-[11px] tracking-[0.12em] uppercase text-white px-2.5 py-1 rounded-md"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                    boxShadow: `0 4px 12px ${color}40`
                  }}
                >
                  {`0${i + 1}`}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  {tier.grade}
                </span>
              </div>
              <div className="relative">
                <div className="font-display text-2xl font-bold text-text">
                  {tier.label}
                </div>
                <div
                  className="font-display text-[34px] leading-none font-bold mt-1"
                  style={{color}}
                >
                  {tier.verb}.
                </div>
              </div>
              <p className="relative font-body text-[15px] leading-[1.55] text-muted">
                {tier.body}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
