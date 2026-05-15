'use client';

import {useSyncExternalStore} from 'react';
import {Sun, Moon} from 'lucide-react';

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains('dark');
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-full border border-line bg-chip text-text flex items-center justify-center hover:bg-card transition-colors"
    >
      {dark ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
