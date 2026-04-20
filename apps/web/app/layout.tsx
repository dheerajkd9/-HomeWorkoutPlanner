import type { Metadata } from 'next';
import { Bricolage_Grotesque, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const heading = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-heading' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'FitFlow Home',
  description: 'Animated AI workout planner for home exercise, pilates, privacy-friendly routines, and simple equipment.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
