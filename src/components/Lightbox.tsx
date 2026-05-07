'use client';

import {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {X, ZoomIn} from 'lucide-react';
import {useTranslations} from 'next-intl';
import Image from 'next/image';

interface LightboxProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({src, alt, isOpen, onClose}: LightboxProps) {
  const t = useTranslations('Manual');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label={t('imagePreview')}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-4 text-white hover:bg-white/10 rounded-full transition-colors z-[110]"
        aria-label={t('closePreview')}
      >
        <X size={32} strokeWidth={3} />
      </button>

      <div 
        className="relative w-full h-full p-4 md:p-8 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-[95vw] h-[85vh] animate-in zoom-in-95 duration-300">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold tracking-tight flex items-center gap-3">
        <ZoomIn size={20} className="text-brand-purple" />
        {alt}
      </div>
    </div>,
    document.body
  );
}
