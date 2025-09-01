import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { WidgetProvider } from '../context/WidgetContext';

const inter = Inter({ subsets: ['latin'] });

// Correct metadata definition
export const metadata: Metadata = {
  openGraph: {
    title: 'Personalized Dashboard - Custom Widget Platform',
    description: 'Create your perfect dashboard with customizable widgets for weather, news, crypto prices, and adorable dog images. Perfect for personal productivity.',
    siteName: 'Personalized Dashboard',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WidgetProvider>
          {children}
        </WidgetProvider>
      </body>
    </html>
  );
}