'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { Suspense, useEffect } from 'react';
import Image from 'next/image';

// Environment variables for Google Analytics and Yandex Metrika IDs
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const YANDEX_METRIKA_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

export default function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent />
    </Suspense>
  );
}

function AnalyticsContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Ensure analytics only run in production
    if (process.env.NODE_ENV !== 'production') {
      console.info('Analytics are disabled in non-production environments.');
      return;
    }

    if (!GA_MEASUREMENT_ID || !YANDEX_METRIKA_ID) {
      console.warn(
        'Analytics IDs are not set. Please check your environment variables.'
      );
      return;
    }

    // Construct the full URL path with search parameters for accurate tracking
    const url =
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');

    // Google Analytics pageview
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });

    // Yandex Metrika hit
    window.ym(Number(YANDEX_METRIKA_ID), 'hit', url);
  }, [pathname, searchParams]);

  function recordOutboundLink(
    link: HTMLAnchorElement,
    category: string,
    action: string
  ) {
    window.gtag('event', action, {
      event_category: category,
      event_label: link.href,
    });
    setTimeout(() => {
      document.location = link.href;
    }, 100);
  }

  // Render analytics scripts only if in production
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      {/* Google Analytics */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy='afterInteractive'
          />
          <Script id='google-analytics' strategy='afterInteractive'>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}

      {/* Yandex Metrika */}
      {YANDEX_METRIKA_ID && (
        <>
          <Script id='yandex-metrika' strategy='afterInteractive'>
            {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(${YANDEX_METRIKA_ID}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `}
          </Script>
          <noscript>
            <div>
              <Image
                src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
                style={{ position: 'absolute', left: '-9999px' }}
                alt=''
                width={1}
                height={1}
              />
            </div>
          </noscript>
        </>
      )}
    </>
  );
}
