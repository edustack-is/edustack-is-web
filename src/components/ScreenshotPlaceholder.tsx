'use client';

import {useState} from 'react';
import {Image as ImageIcon, ZoomIn} from 'lucide-react';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import Lightbox from './Lightbox';

interface ScreenshotPlaceholderProps {
  roleColor?: string;
  className?: string;
  src?: string;
  alt?: string;
}

export default function ScreenshotPlaceholder({ 
  roleColor = 'brand-purple', 
  className = '',
  src,
  alt
}: ScreenshotPlaceholderProps) {
  const t = useTranslations('Manual');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const content = (
    <div className={`relative w-full h-full overflow-hidden ${src ? 'cursor-zoom-in' : 'cursor-default'}`}>
      {src ? (
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src={src} 
            alt={alt || t('screenshot')} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay for better readability of decorative elements */}
          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-brand-purple/5 transition-colors" />
          
          {/* Zoom icon on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-2xl scale-50 group-hover:scale-100 transition-transform">
              <ZoomIn size={32} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 h-full">
          <div className={`p-6 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-slate-300 dark:text-slate-600 transition-transform group-hover:scale-110 group-hover:text-${roleColor}`}>
            <ImageIcon className="h-12 w-12" />
          </div>
          <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('screenshot')}</p>
        </div>
      )}
      
      {/* Decorative corners */}
      <div className={`absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-slate-200 dark:border-slate-700 rounded-tl-lg group-hover:border-${roleColor}/30 pointer-events-none z-10`} />
      <div className={`absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-slate-200 dark:border-slate-700 rounded-tr-lg group-hover:border-${roleColor}/30 pointer-events-none z-10`} />
      <div className={`absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-slate-200 dark:border-slate-700 rounded-bl-lg group-hover:border-${roleColor}/30 pointer-events-none z-10`} />
      <div className={`absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-slate-200 dark:border-slate-700 rounded-br-lg group-hover:border-${roleColor}/30 pointer-events-none z-10`} />
    </div>
  );

  return (
    <>
      {src ? (
        <button
          onClick={() => setIsLightboxOpen(true)}
          className={`relative group block w-full aspect-video rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 transition-all hover:border-${roleColor}/30 hover:bg-${roleColor}/5 ${className}`}
          aria-label={`Open preview for ${alt || t('screenshot')}`}
        >
          {content}
        </button>
      ) : (
        <div className={`relative group w-full aspect-video rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 transition-all hover:border-${roleColor}/30 hover:bg-${roleColor}/5 ${className}`}>
          {content}
        </div>
      )}

      {src && (
        <Lightbox 
          src={src} 
          alt={alt || t('screenshot')} 
          isOpen={isLightboxOpen} 
          onClose={() => setIsLightboxOpen(false)} 
        />
      )}
    </>
  );
}
