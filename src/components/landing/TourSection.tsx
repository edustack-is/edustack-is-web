import {useTranslations} from 'next-intl';
import {ROLE_COLORS} from '@/components/brand/roles';
import {Screenshot} from '@/components/brand/Screenshot';
import {Section} from './Section';

export default function TourSection() {
  const t = useTranslations('Index');

  return (
    <Section
      id="tour"
      eyebrow={t('tour.eyebrow')}
      eyebrowColor={ROLE_COLORS.orange}
      title={t('tour.title')}
      sub={t('tour.sub')}
      className="bg-[#f5f0fa] dark:bg-[#13101c]"
    >
      <div className="grid gap-3.5 md:grid-cols-[1.4fr_1fr_1fr]">
        <Screenshot
          src="/images/documentation/system-admin/00_dashboard.png"
          label={t('tour.labels.dashboard')}
          role={ROLE_COLORS.purple}
          height={280}
          browser
        />
        <Screenshot
          src="/images/documentation/system-admin/01_school_management.png"
          label={t('tour.labels.schoolManagement')}
          role={ROLE_COLORS.magenta}
          height={280}
        />
        <Screenshot
          src="/images/documentation/system-admin/05_system_users.png"
          label={t('tour.labels.systemUsers')}
          role={ROLE_COLORS.cyan}
          height={280}
        />
        <Screenshot
          src="/images/documentation/system-admin/10_system_setting_monitoring.png"
          label={t('tour.labels.monitoring')}
          role={ROLE_COLORS.orange}
          height={220}
        />
        <Screenshot
          src="/images/documentation/system-admin/12_system_setting_generate_data.png"
          label={t('tour.labels.generateData')}
          role={ROLE_COLORS.green}
          height={220}
        />
        <Screenshot
          src="/images/documentation/login/00_login_with_helper.png"
          label={t('tour.labels.login')}
          role={ROLE_COLORS.slate}
          height={220}
        />
      </div>
    </Section>
  );
}
