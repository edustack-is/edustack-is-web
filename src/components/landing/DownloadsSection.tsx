import {useTranslations} from 'next-intl';
import {ROLES, ROLE_COLORS} from '@/components/brand/roles';
import {Section} from './Section';

type DownloadItem = {
  title: string;
  kind: string;
  body: string;
  href?: string;
  external?: boolean;
};

export default function DownloadsSection() {
  const t = useTranslations('Index');
  const items = t.raw('downloads.items') as DownloadItem[];

  return (
    <Section
      id="downloads"
      eyebrow={t('downloads.eyebrow')}
      eyebrowColor={ROLE_COLORS.green}
      title={t('downloads.title')}
      sub={t('downloads.sub')}
      className="bg-[#f5f0fa] dark:bg-[#13101c]"
    >
      <div className="flex flex-col border-t border-line">
        {items.map((item, i) => {
          const role = ROLES[i % ROLES.length];
          const badge = item.kind.startsWith('PDF') ? 'PDF' : 'GD';
          const isExternal = item.external === true;
          const isPdf = badge === 'PDF';
          return (
            <a
              key={i}
              href={item.href ?? '#'}
              {...(isExternal
                ? {target: '_blank', rel: 'noopener noreferrer'}
                : isPdf
                  ? {download: ''}
                  : {})}
              className="grid grid-cols-[44px_1fr_auto] md:grid-cols-[44px_1.5fr_1fr_1fr_auto] items-center gap-4 md:gap-5 py-5 border-b border-line text-text no-underline hover:bg-card/40 transition-colors"
            >
              <div
                className="w-9 h-9 rounded-[10px] flex items-center justify-center font-mono text-[11px] font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, ${role.color}, ${role.color}cc)`,
                  boxShadow: `0 6px 14px ${role.color}40`
                }}
              >
                {badge}
              </div>
              <div className="font-display text-[17px] font-bold text-text">
                {item.title}
              </div>
              <div className="hidden md:block font-mono text-xs text-muted">
                {item.kind}
              </div>
              <div className="hidden md:block font-body text-sm text-muted">
                {item.body}
              </div>
              <div
                className="font-body text-sm font-bold"
                style={{color: role.color}}
              >
                {isExternal ? '↗' : '↓'}
              </div>
            </a>
          );
        })}
      </div>
    </Section>
  );
}
