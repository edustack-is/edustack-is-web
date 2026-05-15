import Image from 'next/image';
import {ROLE_COLORS_LIST} from './roles';

export function LogoMark({
  size = 48,
  className
}: {
  size?: number;
  className?: string;
}) {
  const [c0, c1, c2, c3, c4] = ROLE_COLORS_LIST;
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      className={className}
      aria-label="EduStack IS"
    >
      <rect x="6" y="8" width="34" height="20" rx="6" fill={c0} />
      <rect x="44" y="14" width="30" height="20" rx="6" fill={c1} />
      <rect x="24" y="30" width="32" height="20" rx="6" fill={c2} />
      <rect x="6" y="46" width="30" height="20" rx="6" fill={c3} />
      <rect x="40" y="52" width="34" height="20" rx="6" fill={c4} />
    </svg>
  );
}

// Intrinsic dimensions of the wordmark PNG (mark + "EduStack IS").
const WORDMARK_W = 1312;
const WORDMARK_H = 651;

export function LogoWordmark({scale = 1}: {scale?: number}) {
  const height = Math.round(40 * scale);

  return (
    <span className="inline-flex items-center" style={{height}}>
      <Image
        src="/logo/edustack_logo_black_text_right.png"
        alt="EduStack IS"
        width={WORDMARK_W}
        height={WORDMARK_H}
        priority
        className="block dark:hidden w-auto"
        style={{height: '100%'}}
      />
      <Image
        src="/logo/edustack_logo_white_text_right.png"
        alt="EduStack IS"
        width={WORDMARK_W}
        height={WORDMARK_H}
        priority
        className="hidden dark:block w-auto"
        style={{height: '100%'}}
      />
    </span>
  );
}
