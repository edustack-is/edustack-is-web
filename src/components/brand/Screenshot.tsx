import Image from 'next/image';
import {cn} from '@/lib/utils';

export function Screenshot({
  src,
  label,
  role,
  height = 240,
  browser = false,
  className
}: {
  src: string;
  label: string;
  role: string;
  height?: number;
  browser?: boolean;
  className?: string;
}) {
  const slug = label
    .toLowerCase()
    .replace(/[·\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  const badge = label.split('·')[0]?.trim() || label;

  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden border border-line relative bg-card',
        browser &&
          'shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)]',
        className
      )}
    >
      {browser && (
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-chip border-b border-line">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff6058]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c63f]" />
          </div>
          <div className="font-mono text-[11px] text-muted">
            is-edustack.org/{slug}
          </div>
        </div>
      )}
      <div style={{height}} className="relative bg-card">
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <span
          className="absolute top-3 left-3 px-2 py-1 rounded-full text-white text-[10px] font-semibold tracking-wider uppercase font-mono z-10"
          style={{background: role}}
        >
          {badge}
        </span>
      </div>
    </div>
  );
}
