import {Crown, Bell, Settings, Pencil, Handshake, Home, type LucideIcon} from 'lucide-react';
import type {RoleIconKey} from './roles';

const ICONS: Record<RoleIconKey, LucideIcon> = {
  crown: Crown,
  bell: Bell,
  gear: Settings,
  pencil: Pencil,
  handshake: Handshake,
  home: Home
};

export function RoleIcon({
  name,
  size = 18,
  color = 'currentColor'
}: {
  name: RoleIconKey;
  size?: number;
  color?: string;
}) {
  const Icon = ICONS[name] ?? Crown;
  return <Icon size={size} color={color} strokeWidth={1.6} />;
}
