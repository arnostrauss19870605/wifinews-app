import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import '@/app/_styles/globals.css';
import Container from '@/app/_components/Container';
import Navigation from '@/app/_components/Navigation';
import Footer from '@/app/_components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wifi News',
  description:
    'Connecting South Africa through free and low-cost Wi-Fi. Our innovative digital marketing system provides high-speed internet access to thousands daily in high-density areas. Join our mission to bridge the digital divide.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        {/* Add Google Publisher Tag Script */}
        <Script
          id='google-publisher-tag'
          strategy='afterInteractive'
          src='https://securepubads.g.doubleclick.net/tag/js/gpt.js'
        />
        <Script id='google-ad-init' strategy='afterInteractive'>
          {`
            window.googletag = window.googletag || {cmd: []};
            googletag.cmd.push(function() {
              googletag.pubads().enableSingleRequest();
              googletag.enableServices();
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Navigation />
        <Container>{children}</Container>
        <Footer />
        <GoogleAnalytics
          gaId={`${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
      </body>
    </html>
  );
}
