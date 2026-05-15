import {cn} from '@/lib/utils';

export function Section({
  id,
  eyebrow,
  eyebrowColor,
  title,
  sub,
  children,
  className
}: {
  id?: string;
  eyebrow: string;
  eyebrowColor: string;
  title?: string;
  sub?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        'border-t border-line px-6 md:px-14 py-16 md:py-20',
        className
      )}
    >
      <div className="max-w-[90rem] mx-auto">
        <div className="flex items-center gap-2.5 mb-2.5">
          <span
            className="w-2.5 h-2.5 rounded-[3px]"
            style={{
              background: eyebrowColor,
              boxShadow: `0 0 0 4px ${eyebrowColor}1f`
            }}
          />
          <span className="font-mono text-xs tracking-[0.12em] uppercase text-muted">
            {eyebrow}
          </span>
        </div>
        {title && (
          <h2 className="font-display text-3xl md:text-[46px] leading-[1.05] tracking-[-0.025em] text-text font-bold text-balance max-w-[880px] mt-1 mb-4">
            {title}
          </h2>
        )}
        {sub && (
          <p className="font-body text-[17px] leading-[1.55] text-muted max-w-[680px] mb-8">
            {sub}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
