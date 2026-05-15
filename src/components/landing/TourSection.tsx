import {useTranslations} from 'next-intl';
import {ArrowRight} from 'lucide-react';
import {Link} from '@/i18n/routing';
import {ROLE_COLORS} from '@/components/brand/roles';
import {Section} from './Section';
import TourGallery, {type TourShot} from './TourGallery';

export default function TourSection() {
  const t = useTranslations('Index');

  const shots: TourShot[] = [
    {
      src: '/images/documentation/system-admin/00_dashboard.png',
      label: t('tour.labels.dashboard'),
      role: ROLE_COLORS.purple,
      height: 280,
      browser: true
    },
    {
      src: '/images/documentation/system-admin/01_school_management.png',
      label: t('tour.labels.schoolManagement'),
      role: ROLE_COLORS.magenta,
      height: 280
    },
    {
      src: '/images/documentation/system-admin/05_system_users.png',
      label: t('tour.labels.systemUsers'),
      role: ROLE_COLORS.cyan,
      height: 280
    },
    {
      src: '/images/documentation/system-admin/10_system_setting_monitoring.png',
      label: t('tour.labels.monitoring'),
      role: ROLE_COLORS.orange,
      height: 220
    },
    {
      src: '/images/documentation/system-admin/12_system_setting_generate_data.png',
      label: t('tour.labels.generateData'),
      role: ROLE_COLORS.green,
      height: 220
    },
    {
      src: '/images/documentation/login/00_login_with_helper.png',
      label: t('tour.labels.login'),
      role: ROLE_COLORS.slate,
      height: 220
    }
  ];

  return (
    <Section
      id="tour"
      eyebrow={t('tour.eyebrow')}
      eyebrowColor={ROLE_COLORS.orange}
      title={t('tour.title')}
      sub={t('tour.sub')}
      className="bg-[#f5f0fa] dark:bg-[#13101c]"
    >
      <TourGallery shots={shots} />
      <div className="mt-8 flex justify-center md:justify-start">
        <Link
          href="/manual"
          className="inline-flex items-center gap-2 font-body text-[15px] font-semibold text-text border border-line bg-card px-5 py-3 rounded-xl hover:border-role-purple/40 transition-colors"
        >
          {t('tour.manualCta')}
          <ArrowRight size={16} />
        </Link>
      </div>
    </Section>
  );
}
