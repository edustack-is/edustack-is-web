'use client';

import {useEffect, useSyncExternalStore} from 'react';
import {createPortal} from 'react-dom';
import {X, ZoomIn} from 'lucide-react';
import {useTranslations} from 'next-intl';
import Image from 'next/image';

interface LightboxProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  /**
   * 'contain' (default) scales the image to fit the viewport using Next.js
   * <Image fill>. 'native' renders the raw image at its intrinsic size inside
   * a scrollable container — better for wide technical diagrams where shrinking
   * to fit would make text unreadable.
   */
  fit?: 'contain' | 'native';
}

const noopSubscribe = () => () => {};
const getClientMounted = () => true;
const getServerMounted = () => false;

export default function Lightbox({src, alt, isOpen, onClose, fit = 'contain'}: LightboxProps) {
  const t = useTranslations('Manual');
  const mounted = useSyncExternalStore(noopSubscribe, getClientMounted, getServerMounted);

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
        {fit === 'native' ? (
          <div className="max-w-[95vw] max-h-[85vh] overflow-auto rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Container shrinks to the image's intrinsic size for small
                diagrams (no big empty white area) and caps at 95vw/85vh
                for very wide ones like the full ER — pan inside the modal
                to keep every label legible. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="block max-w-none h-auto"
            />
          </div>
        ) : (
          <div className="relative w-[95vw] h-[85vh] animate-in zoom-in-95 duration-300">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              priority
            />
          </div>
        )}
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold tracking-tight flex items-center gap-3">
        <ZoomIn size={20} className="text-brand-purple" />
        {alt}
      </div>
    </div>,
    document.body
  );
}
