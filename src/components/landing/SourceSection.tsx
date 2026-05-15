import {useTranslations} from 'next-intl';
import {ROLES, ROLE_COLORS} from '@/components/brand/roles';
import {Section} from './Section';

type Repo = {name: string; body: string};

export default function SourceSection() {
  const t = useTranslations('Index');
  const repos = t.raw('source.repos') as Repo[];
  const host = t('source.host');

  return (
    <Section
      id="source"
      eyebrow={t('source.eyebrow')}
      eyebrowColor={ROLE_COLORS.cyan}
      title={t('source.title')}
    >
      <div className="grid md:grid-cols-3 gap-3.5">
        {repos.map((r, i) => {
          const role = ROLES[i] ?? ROLES[0];
          return (
            <a
              key={r.name}
              href={`https://${host}/${r.name}`}
              className="relative overflow-hidden p-5 rounded-[14px] border border-line bg-card text-text no-underline flex flex-col gap-3"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: `linear-gradient(90deg, ${role.color}, ${role.color}55)`
                }}
              />
              <div className="flex justify-between items-center mt-1">
                <span className="font-mono text-[11px] text-muted">{host}</span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{background: role.color}}
                />
              </div>
              <div className="font-mono text-base font-bold">{r.name}</div>
              <div className="font-body text-sm text-muted">{r.body}</div>
            </a>
          );
        })}
      </div>
    </Section>
  );
}
