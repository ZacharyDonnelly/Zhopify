import { siteConfig } from '@/lib/constants/config';
import Footer from '@/ui/components/layout/footer';
import Header from '@/ui/components/layout/header';
import '@/ui/styles/global.css';
import type { Metadata } from 'next';

export const metadata: Metadata = siteConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Header />
        <main className='main'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
