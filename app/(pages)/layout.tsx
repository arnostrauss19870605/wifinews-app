import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/_styles/globals.css';
import Container from '@/app/_components/Container';
import Navigation from '@/app/_components/Navigation';
import Footer from '@/app/_components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import { AuthProvider } from '@/app/_context/authContext';

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
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(t){function e(){var e=this||self;e.globalThis=e,delete t.prototype._T_}"object"!=typeof globalThis&&(this?e():(t.defineProperty(t.prototype,"_T_",{configurable:!0,get:e}),_T_))}(Object);`,
          }}
        />
        <Script
          src='https://securepubads.g.doubleclick.net/tag/js/gpt.js'
          strategy='beforeInteractive'
        />
        {/* Optimization link tags */}
        <link
          rel='preconnect'
          href='https://adservice.google.co.za'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://securepubads.g.doubleclick.net'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://tpc.googlesyndication.com'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://pagead2.googlesyndication.com'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://www.googletagmanager.com'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://www.google-analytics.com'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://csi.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://www.googletagservices.com'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://tags.crwdcntrl.net'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://bcp.crwdcntrl.net'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://c.st.ltmsphrcl.net'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://c.ltmsphrcl.net'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://bcp.st.crwdcntrl.net'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://googleads.g.doubleclick.net'
          crossOrigin='anonymous'
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <Container>{children}</Container>
          <Footer />
          <GoogleAnalytics
            gaId={`${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
