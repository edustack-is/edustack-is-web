import {useTranslations} from 'next-intl';
import {ArrowUpRight, Download, FileText, Presentation} from 'lucide-react';
import {ROLE_COLORS} from '@/components/brand/roles';
import {Section} from './Section';

type DefenseItem = {title: string; body: string};

const THESIS_PDF = '/thesis/bakalarska-prace-edustack-is.pdf';
const DEFENSE_COLORS = [
  ROLE_COLORS.magenta,
  ROLE_COLORS.cyan,
  ROLE_COLORS.orange,
  ROLE_COLORS.green
];

export default function ThesisSection() {
  const t = useTranslations('Index');
  const meta = t.raw('thesis.paper.meta') as string[];
  const items = t.raw('thesis.defense.items') as DefenseItem[];
  const defenseUrl = t('thesis.defense.url');

  return (
    <Section
      id="thesis"
      eyebrow={t('thesis.eyebrow')}
      eyebrowColor={ROLE_COLORS.magenta}
      title={t('thesis.title')}
      sub={t('thesis.sub')}
    >
      <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-3.5 items-stretch">
        {/* Thesis PDF */}
        <div className="relative overflow-hidden p-6 md:p-7 rounded-[14px] border border-line bg-card flex flex-col gap-4">
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(90deg, ${ROLE_COLORS.purple}, ${ROLE_COLORS.magenta})`
            }}
          />
          <div className="flex items-center justify-between gap-3 mt-1">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-muted">
              {t('thesis.paper.kind')}
            </span>
            <span
              className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white shrink-0"
              style={{
                background: `linear-gradient(135deg, ${ROLE_COLORS.purple}, ${ROLE_COLORS.magenta})`,
                boxShadow: `0 6px 14px ${ROLE_COLORS.purple}40`
              }}
            >
              <FileText size={18} />
            </span>
          </div>

          <h3 className="font-display text-2xl md:text-[28px] leading-[1.1] tracking-[-0.02em] font-bold text-text text-balance">
            {t('thesis.paper.title')}
          </h3>

          <ul className="flex flex-col gap-1 font-body text-sm text-muted">
            {meta.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <p className="font-body text-sm leading-[1.6] text-text/85">
            {t('thesis.paper.abstract')}
          </p>

          <p className="font-mono text-[11px] text-muted">
            {t('thesis.paper.keywords')}
          </p>

          <div className="mt-auto pt-3 flex flex-wrap items-center gap-3">
            <a
              href={THESIS_PDF}
              download
              className="inline-flex items-center gap-2.5 font-body text-[15px] font-semibold px-5 py-3 rounded-xl text-white no-underline"
              style={{
                background: `linear-gradient(135deg, ${ROLE_COLORS.purple}, ${ROLE_COLORS.magenta})`,
                boxShadow: `0 10px 26px ${ROLE_COLORS.purple}40`
              }}
            >
              <Download size={16} />
              {t('thesis.paper.download')}
            </a>
            <span className="font-mono text-xs text-muted">
              {t('thesis.paper.size')}
            </span>
          </div>
        </div>

        {/* Defense site */}
        <div className="relative overflow-hidden p-6 md:p-7 rounded-[14px] border border-line bg-card flex flex-col gap-4">
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(90deg, ${ROLE_COLORS.orange}, ${ROLE_COLORS.orange}55)`
            }}
          />
          <div className="flex items-center justify-between gap-3 mt-1">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-muted">
              {t('thesis.defense.kind')}
            </span>
            <span
              className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white shrink-0"
              style={{
                background: `linear-gradient(135deg, ${ROLE_COLORS.orange}, ${ROLE_COLORS.orange}cc)`,
                boxShadow: `0 6px 14px ${ROLE_COLORS.orange}40`
              }}
            >
              <Presentation size={18} />
            </span>
          </div>

          <h3 className="font-display text-2xl md:text-[28px] leading-[1.1] tracking-[-0.02em] font-bold text-text text-balance">
            {t('thesis.defense.title')}
          </h3>

          <p className="font-body text-sm leading-[1.6] text-muted">
            {t('thesis.defense.body')}
          </p>

          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {items.map((item, i) => {
              const color = DEFENSE_COLORS[i % DEFENSE_COLORS.length];
              return (
                <li key={item.title} className="flex items-start gap-3 py-3">
                  <span
                    className="mt-0.5 font-mono text-[10px] text-white px-2 py-0.5 rounded-md shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${color}cc)`
                    }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <div className="font-display text-[15px] font-bold text-text">
                      {item.title}
                    </div>
                    <div className="font-body text-sm text-muted">
                      {item.body}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto pt-1 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={`https://${defenseUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-body text-[15px] font-semibold px-5 py-3 rounded-xl text-white no-underline"
              style={{
                background: `linear-gradient(135deg, ${ROLE_COLORS.orange}, ${ROLE_COLORS.magenta})`,
                boxShadow: `0 10px 26px ${ROLE_COLORS.orange}40`
              }}
            >
              {t('thesis.defense.cta')}
              <ArrowUpRight size={16} />
            </a>
            <a
              href={t('thesis.defense.repoUrl')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-text transition-colors no-underline"
            >
              {t('thesis.defense.repo')} <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
