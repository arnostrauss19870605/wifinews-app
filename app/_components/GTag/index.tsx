'use client';
import Script from 'next/script';
import { useEffect } from 'react';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export default function GTag() {
  useEffect(() => {
    // Ensure gtag is only run in production
    if (process.env.NODE_ENV !== 'production') {
      console.info(
        'Google Analytics and Ads are disabled in non-production environments.'
      );
      return;
    }

    if (!GA_MEASUREMENT_ID) {
      console.warn('Google Analytics Measurement ID is not set.');
      return;
    }

    if (!GOOGLE_ADS_ID) {
      console.warn('Google Ads ID is not set.');
      return;
    }

    // Initialize Google Analytics and Google Ads
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }

    // Initialize Google Analytics
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    // Initialize Google Ads (if needed for conversion tracking)
    gtag('config', GOOGLE_ADS_ID);
  }, []);

  return (
    <>
      {/* Load the gtag.js library */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy='afterInteractive'
      />

      {/* Initialize Google Analytics and Ads */}
      <Script id='gtag-init' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}'); // Google Analytics

          ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}'); // Google Ads` : ''}
        `}
      </Script>
    </>
  );
}
