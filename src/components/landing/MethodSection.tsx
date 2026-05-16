import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {ArrowRight} from 'lucide-react';
import {ROLES, ROLE_COLORS} from '@/components/brand/roles';
import {Section} from './Section';

type MethodItem = {title: string; body: string; href?: string};

export default function MethodSection() {
  const t = useTranslations('Index');
  const items = t.raw('method.items') as MethodItem[];

  return (
    <Section
      id="method"
      eyebrow={t('method.eyebrow')}
      eyebrowColor={ROLE_COLORS.purple}
      title={t('method.title')}
      sub={t('method.body')}
    >
      <div className="grid md:grid-cols-2 gap-3.5">
        {items.map((item, i) => {
          const role = ROLES[i] ?? ROLES[0];
          const cardClass =
            'relative overflow-hidden p-5 border border-line rounded-[14px] bg-card flex items-center justify-between gap-4';
          const content = (
            <>
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{
                  background: `linear-gradient(180deg, ${role.color}, ${role.color}77)`
                }}
              />
              <div className="pl-2">
                <div className="font-display text-base md:text-lg font-bold text-text mb-1 flex items-center gap-2">
                  {item.title}
                  {item.href && <ArrowRight size={16} className="text-muted" />}
                </div>
                <div className="font-body text-sm text-muted">
                  {item.body}
                </div>
              </div>
              <div
                className="font-mono text-[11px] text-white px-2.5 py-1 rounded-md shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${role.color}, ${role.color}cc)`,
                  boxShadow: `0 4px 12px ${role.color}40`
                }}
              >
                0{i + 1}
              </div>
            </>
          );

          return item.href ? (
            <Link
              key={i}
              href={item.href}
              className={`${cardClass} transition-all hover:border-role-purple/40 hover:shadow-lg`}
            >
              {content}
            </Link>
          ) : (
            <div key={i} className={cardClass}>
              {content}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
