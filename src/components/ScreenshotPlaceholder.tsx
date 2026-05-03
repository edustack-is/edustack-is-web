import {Image as ImageIcon} from 'lucide-react';
import {useTranslations} from 'next-intl';

interface ScreenshotPlaceholderProps {
  roleColor?: string;
  className?: string;
}

export default function ScreenshotPlaceholder({ roleColor = 'brand-purple', className = '' }: ScreenshotPlaceholderProps) {
  const t = useTranslations('Manual');
  
  return (
    <div className={`relative group cursor-default overflow-hidden rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 aspect-video flex flex-col items-center justify-center gap-4 transition-all hover:border-${roleColor}/30 hover:bg-${roleColor}/5 ${className}`}>
      <div className={`p-6 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-slate-300 dark:text-slate-600 transition-transform group-hover:scale-110 group-hover:text-${roleColor}`}>
        <ImageIcon className="h-12 w-12" />
      </div>
      <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('screenshot')}</p>
      
      {/* Decorative corners */}
      <div className={`absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-slate-200 dark:border-slate-700 rounded-tl-lg group-hover:border-${roleColor}/30`} />
      <div className={`absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-slate-200 dark:border-slate-700 rounded-tr-lg group-hover:border-${roleColor}/30`} />
      <div className={`absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-slate-200 dark:border-slate-700 rounded-bl-lg group-hover:border-${roleColor}/30`} />
      <div className={`absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-slate-200 dark:border-slate-700 rounded-br-lg group-hover:border-${roleColor}/30`} />
    </div>
  );
}
