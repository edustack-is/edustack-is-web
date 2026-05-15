'use client';

import {useState} from 'react';
import {Screenshot} from '@/components/brand/Screenshot';
import Lightbox from '@/components/Lightbox';

export type TourShot = {
  src: string;
  label: string;
  role: string;
  height?: number;
  browser?: boolean;
};

export default function TourGallery({shots}: {shots: TourShot[]}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? shots[openIndex] : null;

  return (
    <>
      <div className="grid gap-3.5 md:grid-cols-[1.4fr_1fr_1fr]">
        {shots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Open preview: ${shot.label}`}
            className="group block text-left cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-role-purple rounded-xl"
          >
            <Screenshot
              src={shot.src}
              label={shot.label}
              role={shot.role}
              height={shot.height}
              browser={shot.browser}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:shadow-lg"
            />
          </button>
        ))}
      </div>
      {active && (
        <Lightbox
          src={active.src}
          alt={active.label}
          isOpen={openIndex !== null}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
