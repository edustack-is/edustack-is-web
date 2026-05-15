import {useTranslations} from 'next-intl';
import {ROLES, ROLE_COLORS} from '@/components/brand/roles';
import {Section} from './Section';

type Step = {title: string; body: string};

export default function HowSection() {
  const t = useTranslations('Index');
  const steps = t.raw('how.steps') as Step[];

  return (
    <Section
      id="how"
      eyebrow={t('how.eyebrow')}
      eyebrowColor={ROLE_COLORS.cyan}
      title={t('how.title')}
    >
      <div className="grid grid-cols-[64px_1fr] md:grid-cols-[80px_1fr] gap-x-6">
        {steps.map((step, i) => {
          const role = ROLES[i] ?? ROLES[0];
          const nextRole = ROLES[i + 1] ?? role;
          const isLast = i === steps.length - 1;
          return (
            <div key={i} className="contents">
              <div className="relative pt-2">
                <div
                  className="w-12 h-12 md:w-[52px] md:h-[52px] rounded-[14px] flex items-center justify-center font-display text-xl md:text-[22px] font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${role.color}, ${role.color}cc)`,
                    boxShadow: `0 10px 26px ${role.color}40`
                  }}
                >
                  {i + 1}
                </div>
                {!isLast && (
                  <div
                    className="absolute left-[23px] md:left-[25px] top-[60px] bottom-[-24px] w-0.5 opacity-30"
                    style={{
                      background: `linear-gradient(${role.color}, ${nextRole.color})`
                    }}
                  />
                )}
              </div>
              <div className="pb-9">
                <div className="font-display text-xl md:text-[23px] font-bold text-text mb-1.5">
                  {step.title}
                </div>
                <div className="font-body text-[15px] md:text-base leading-[1.55] text-muted max-w-[680px]">
                  {step.body}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
