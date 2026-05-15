export const ROLE_COLORS = {
  purple: '#7B3FE4',
  magenta: '#E0337A',
  cyan: '#3FB1D1',
  orange: '#F08A2C',
  green: '#2EBE6E',
  slate: '#5B6478'
} as const;

export const ROLE_COLORS_LIST = [
  ROLE_COLORS.purple,
  ROLE_COLORS.magenta,
  ROLE_COLORS.cyan,
  ROLE_COLORS.orange,
  ROLE_COLORS.green
] as const;

export type RoleKey = 'admin' | 'head' | 'deputy' | 'teacher' | 'student' | 'parent';
export type RoleIconKey = 'crown' | 'bell' | 'gear' | 'pencil' | 'handshake' | 'home';

export const ROLES: Array<{
  id: RoleKey;
  color: string;
  iconKey: RoleIconKey;
}> = [
  {id: 'admin', color: ROLE_COLORS.purple, iconKey: 'crown'},
  {id: 'head', color: ROLE_COLORS.magenta, iconKey: 'bell'},
  {id: 'deputy', color: ROLE_COLORS.cyan, iconKey: 'gear'},
  {id: 'teacher', color: ROLE_COLORS.orange, iconKey: 'pencil'},
  {id: 'student', color: ROLE_COLORS.green, iconKey: 'handshake'},
  {id: 'parent', color: ROLE_COLORS.slate, iconKey: 'home'}
];

export const BRAND_GRADIENT = `linear-gradient(135deg, ${ROLE_COLORS.purple} 0%, ${ROLE_COLORS.magenta} 50%, ${ROLE_COLORS.orange} 100%)`;
