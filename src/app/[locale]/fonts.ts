import {Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono} from 'next/font/google';

export const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display-google',
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

export const body = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body-google',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800']
});

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-google',
  display: 'swap',
  weight: ['400', '500', '700']
});
