import {useTranslations} from 'next-intl';
import {ROLE_COLORS} from '@/components/brand/roles';
import {Section} from './Section';

const PILLARS = [
  {key: 'shared', color: ROLE_COLORS.purple},
  {key: 'tailored', color: ROLE_COLORS.cyan},
  {key: 'open', color: ROLE_COLORS.green}
] as const;

export default function IdeaSection() {
  const t = useTranslations('Index');

  return (
    <Section
      id="idea"
      eyebrow={t('idea.eyebrow')}
      eyebrowColor={ROLE_COLORS.magenta}
      title={t('idea.title')}
    >
      <p className="font-body text-base md:text-lg leading-[1.6] text-text max-w-[780px] mb-10">
        {t('idea.body')}
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {PILLARS.map(({key, color}, i) => (
          <div
            key={key}
            className="relative overflow-hidden p-6 rounded-[18px] border border-line bg-card"
          >
            <div
              className="absolute -top-10 -right-10 w-[140px] h-[140px] rounded-full opacity-[0.16] blur-[24px]"
              style={{background: color}}
            />
            <div
              className="relative w-11 h-11 rounded-xl flex items-center justify-center font-display text-lg font-bold text-white mb-4"
              style={{
                background: `linear-gradient(135deg, ${color}, ${color}aa)`,
                boxShadow: `0 8px 20px ${color}55`
              }}
            >
              0{i + 1}
            </div>
            <div className="relative font-display text-xl font-bold text-text mb-2">
              {t(`idea.pillars.${key}`)}
            </div>
            <div className="relative font-body text-[15px] leading-[1.55] text-muted">
              {t(`idea.pillars.${key}Body`)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
