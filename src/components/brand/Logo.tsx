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

export function LogoWordmark({scale = 1}: {scale?: number}) {
  return (
    <div
      className="flex items-center font-display"
      style={{gap: 10 * scale}}
    >
      <LogoMark size={36 * scale} />
      <div className="flex flex-col leading-none">
        <div
          className="text-text font-bold tracking-tight"
          style={{fontSize: 22 * scale}}
        >
          EduStack <span className="font-medium opacity-70">IS</span>
        </div>
        <div className="flex" style={{gap: 3 * scale, marginTop: 5 * scale}}>
          {ROLE_COLORS_LIST.map((color) => (
            <span
              key={color}
              className="rounded-full"
              style={{
                width: 5 * scale,
                height: 5 * scale,
                background: color
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
