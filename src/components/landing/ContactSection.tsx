import {useTranslations} from 'next-intl';
import {ROLE_COLORS, BRAND_GRADIENT} from '@/components/brand/roles';
import {Section} from './Section';

export default function ContactSection() {
  const t = useTranslations('Index');
  const email = t('contact.email');

  return (
    <Section
      id="contact"
      eyebrow={t('contact.eyebrow')}
      eyebrowColor={ROLE_COLORS.magenta}
      title={t('contact.title')}
      center
    >
      <div className="flex flex-col items-center text-center">
        <p className="font-body text-base md:text-lg leading-[1.55] text-muted max-w-[600px] mb-6">
          {t('contact.body')}
        </p>
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-2.5 font-mono text-base md:text-lg text-white no-underline px-5 py-3.5 rounded-[10px]"
          style={{
            background: BRAND_GRADIENT,
            boxShadow: `0 8px 20px ${ROLE_COLORS.purple}33`
          }}
        >
          <span aria-hidden>✉</span>
          {email}
        </a>
      </div>
    </Section>
  );
}
