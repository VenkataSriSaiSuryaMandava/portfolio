import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import { ThemeProvider } from '@/components/ThemeProvider';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // Update this to your real domain once deployed (e.g. https://yourdomain.com)
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'Venkata Sri Sai Surya Mandava - Portfolio',
    template: '%s | Venkata Sri Sai Surya Mandava - Portfolio',
  },
  description:
    'Software Engineer portfolio showcasing production-grade projects, experience, skills, and credentials.',
  openGraph: {
    title: 'Venkata Sri Sai Surya Mandava - Portfolio',
    description:
      'Software Engineer portfolio showcasing production-grade projects, experience, skills, and credentials.',
    type: 'website',
    url: 'https://example.com',
    siteName: 'Venkata Sri Sai Surya Mandava - Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Venkata Sri Sai Surya Mandava - Portfolio',
    description:
      'Software Engineer portfolio showcasing production-grade projects, experience, skills, and credentials.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

// RootLayout provides global styles, the navigation bar and theme context.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50 antialiased`}
      >
        <ThemeProvider>
          {/* Skip link for keyboard users */}
          <a
            href="#hero"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          {/* Scroll progress indicator */}
          <ScrollProgress />
          {/* Sticky navigation bar */}
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}