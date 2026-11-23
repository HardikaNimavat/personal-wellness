import type { Metadata, Viewport } from 'next';
import './globals.css';
import { BottomNav } from '@/components/navigation/BottomNav';

export const metadata: Metadata = {
  title: 'Elena | Personal Wellness & Transformation Sanctuary',
  description: 'AI-Powered personal transformation ecosystem integrating physical strength, mental discipline, menstrual wellness, and persistent personal memory.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Elena Wellness',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#531B24',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className="min-h-screen bg-[#F3ECE2] text-[#531B24] antialiased">
        <div className="max-w-lg mx-auto min-h-screen flex flex-col relative bg-[#F3ECE2] shadow-2xl">
          <main className="flex-1 pb-safe">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
