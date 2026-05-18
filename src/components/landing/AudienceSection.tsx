import {useTranslations} from 'next-intl';
import {ROLES, ROLE_COLORS} from '@/components/brand/roles';
import {RoleIcon} from '@/components/brand/RoleIcon';

const PANELS = [
  {key: 'teachers', c1: ROLE_COLORS.orange, c2: ROLE_COLORS.magenta, role: ROLES[3]},
  {key: 'students', c1: ROLE_COLORS.green, c2: ROLE_COLORS.cyan, role: ROLES[4]}
] as const;

export default function AudienceSection() {
  const t = useTranslations('Index');

  return (
    <section id="teachers" className="border-t border-line grid md:grid-cols-2 scroll-mt-48">
      {PANELS.map(({key, c1, c2, role}, idx) => {
        const bullets = t.raw(`${key}.bullets`) as string[];
        return (
          <div
            key={key}
            id={key === 'students' ? 'students' : undefined}
            className="relative overflow-hidden px-6 md:px-[5vw] py-16 md:py-20"
            style={{
              background: `linear-gradient(160deg, ${c1}14, ${c2}0c)`,
              borderRight: idx === 0 ? '1px solid var(--color-line)' : undefined
            }}
          >
            <div
              className="hy-blob"
              style={{
                top: -40,
                right: -40,
                width: 180,
                height: 180,
                background: c1,
                opacity: 0.25
              }}
            />
            <div className="relative max-w-[45rem] mx-auto">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white font-mono text-[11px] font-bold tracking-[0.06em] uppercase mb-4"
                style={{
                  background: `linear-gradient(135deg, ${c1}, ${c2})`,
                  boxShadow: `0 6px 18px ${c1}55`
                }}
              >
                <RoleIcon name={role.iconKey} size={14} color="#fff" />
                {t(`${key}.eyebrow`)}
              </div>
              <h2 className="font-display text-2xl md:text-[36px] leading-[1.05] tracking-[-0.02em] mb-6 text-text text-balance font-bold">
                {t(`${key}.title`)}
              </h2>
              <ul className="flex flex-col gap-3">
                {bullets.map((b, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[24px_1fr] gap-3 font-body text-[15px] leading-[1.55] text-text"
                  >
                    <span
                      className="w-5 h-5 rounded-md text-white font-mono text-[11px] font-bold flex items-center justify-center mt-0.5"
                      style={{
                        background: `linear-gradient(135deg, ${c1}, ${c2})`,
                        boxShadow: `0 4px 10px ${c1}33`
                      }}
                    >
                      {i + 1}
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </section>
  );
}
