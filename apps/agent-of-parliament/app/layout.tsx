import type { Metadata } from 'next';
import { EB_Garamond, IBM_Plex_Mono, Libre_Caslon_Display } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

const serif = EB_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
});
const display = Libre_Caslon_Display({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-display',
});
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Agent of Parliament',
  description: 'Ask UK Parliament questions in plain English and watch cited cards assemble.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
