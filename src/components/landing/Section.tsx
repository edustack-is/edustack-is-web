import {cn} from '@/lib/utils';

export function Section({
  id,
  eyebrow,
  eyebrowColor,
  title,
  sub,
  children,
  className,
  center = false
}: {
  id?: string;
  eyebrow: string;
  eyebrowColor: string;
  title?: string;
  sub?: string;
  children: React.ReactNode;
  className?: string;
  /** When true, eyebrow + title + sub are horizontally centered. */
  center?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        'border-t border-line px-6 md:px-[5vw] py-16 md:py-20 scroll-mt-48',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center gap-2.5 mb-2.5',
          center && 'justify-center'
        )}
      >
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
        <h2
          className={cn(
            'font-display text-3xl md:text-[46px] leading-[1.05] tracking-[-0.025em] text-text font-bold text-balance max-w-[880px] mt-1 mb-4',
            center && 'mx-auto text-center'
          )}
        >
          {title}
        </h2>
      )}
      {sub && (
        <p
          className={cn(
            'font-body text-[17px] leading-[1.55] text-muted max-w-[680px] mb-8',
            center && 'mx-auto text-center'
          )}
        >
          {sub}
        </p>
      )}
      {children}
    </section>
  );
}
