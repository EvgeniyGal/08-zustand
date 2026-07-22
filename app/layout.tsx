import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  buildOpenGraph,
} from '@/lib/metadata';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = buildOpenGraph({
  title: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
