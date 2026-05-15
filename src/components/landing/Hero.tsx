import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {ROLES, ROLE_COLORS, BRAND_GRADIENT, type RoleKey} from '@/components/brand/roles';
import {RoleIcon} from '@/components/brand/RoleIcon';

export default function Hero() {
  const t = useTranslations('Index');

  const titleParts = t('hero.title')
    .split('.')
    .map((p) => p.trim())
    .filter(Boolean);
  const dots = [ROLE_COLORS.purple, ROLE_COLORS.magenta, ROLE_COLORS.green];

  return (
    <section className="relative px-6 md:px-14 py-16 md:py-20 overflow-hidden">
      {/* Background blobs (full-bleed) */}
      <div
        className="hy-blob"
        style={{
          top: -60,
          left: -80,
          width: 340,
          height: 340,
          background: ROLE_COLORS.purple,
          opacity: 0.32
        }}
      />
      <div
        className="hy-blob"
        style={{
          top: 120,
          right: -60,
          width: 280,
          height: 280,
          background: ROLE_COLORS.magenta,
          opacity: 0.22,
          animationDelay: '2s'
        }}
      />
      <div
        className="hy-blob"
        style={{
          bottom: -100,
          left: '30%',
          width: 300,
          height: 300,
          background: ROLE_COLORS.cyan,
          opacity: 0.2,
          animationDelay: '4s'
        }}
      />

      <div className="relative max-w-[90rem] mx-auto grid md:grid-cols-[1.15fr_0.85fr] gap-10 md:gap-14 items-center">
      <div className="relative">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-line rounded-full mb-7 font-mono text-xs text-muted tracking-wider bg-card/70 backdrop-blur-sm">
          <span
            className="w-1.5 h-1.5 rounded-full hy-pulse"
            style={{
              background: ROLE_COLORS.green,
              boxShadow: `0 0 0 4px ${ROLE_COLORS.green}33`
            }}
          />
          {t('hero.eyebrow')}
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-[68px] leading-[1.02] tracking-[-0.028em] mb-6 text-text text-balance font-bold">
          {titleParts.map((part, i) => (
            <span key={i} className="block">
              {part}
              <span style={{color: dots[i] ?? 'currentColor'}}>.</span>
            </span>
          ))}
        </h1>

        <p className="font-body text-base md:text-[19px] leading-[1.5] text-muted mb-9 max-w-[540px]">
          {t('hero.sub')}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`https://${t('demo.url')}`}
            className="inline-flex items-center gap-2.5 font-body text-[15px] font-semibold px-5 py-3.5 rounded-xl text-white"
            style={{
              background: BRAND_GRADIENT,
              boxShadow: `0 10px 30px ${ROLE_COLORS.purple}40`
            }}
          >
            {t('hero.ctaPrimary')} <span aria-hidden>→</span>
          </a>
          <Link
            href="/manual"
            className="inline-flex items-center font-body text-[15px] font-semibold px-5 py-3.5 rounded-xl bg-card/70 text-text border border-line"
          >
            {t('hero.ctaSecondary')}
          </Link>
        </div>
      </div>

      {/* Role staircase grid */}
      <div className="relative grid grid-cols-3 gap-2.5">
        {ROLES.map((r, i) => {
          const filled = i % 2 === 0;
          return (
            <div
              key={r.id}
              className="relative overflow-hidden p-4 rounded-2xl min-h-[120px] flex flex-col justify-between"
              style={{
                background: filled ? r.color : undefined,
                color: filled ? '#fff' : undefined,
                transform: `translateY(${(i % 3) * 8}px)`,
                boxShadow: filled ? `0 14px 32px ${r.color}33` : undefined
              }}
            >
              {!filled && (
                <>
                  <div className="absolute inset-0 bg-card border border-line rounded-2xl" />
                  <div
                    className="absolute -top-[30px] -right-[30px] w-[90px] h-[90px] rounded-full opacity-[0.18] blur-[14px]"
                    style={{background: r.color}}
                  />
                </>
              )}
              <div className="relative">
                <RoleIcon
                  name={r.iconKey}
                  size={22}
                  color={filled ? '#fff' : r.color}
                />
              </div>
              <div className="relative">
                <div className="font-mono text-[10px] tracking-[0.08em] uppercase opacity-70 mb-1">
                  role · 0{i + 1}
                </div>
                <div className="font-display text-base font-bold">
                  {t(`roles.${r.id as RoleKey}`)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
