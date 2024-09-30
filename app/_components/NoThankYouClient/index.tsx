'use client';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getUtmParams, appendUtmParams } from '@/app/_utils/utm.util';

interface NoThankYouClientProps {
  initialIsFromInterstitial: boolean;
  isFromForti: boolean;
}

export default function NoThankYouClient({
  initialIsFromInterstitial,
  isFromForti,
}: NoThankYouClientProps) {
  const [isFromInterstitial, setIsFromInterstitial] = useState(
    initialIsFromInterstitial
  );

  useEffect(() => {
    console.log('Client-side Is from interstitial:', isFromInterstitial);
  }, [isFromInterstitial]);

  const handleRedirect = () => {
    if (isFromInterstitial) {
      window.location.href = appendUtmParams('/interstitial');
    } else if (isFromForti) {
      window.location.href = appendUtmParams('/forti_2');
    } else {
      window.location.href = appendUtmParams('/landing');
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-between px-4 py-10'>
      <Script id='gpt-setup' strategy='beforeInteractive'>
        {`
          window.googletag = window.googletag || {cmd: []};

          googletag.cmd.push(function() {
            const utmParams = ${JSON.stringify(getUtmParams())};
            console.log("cancel utm params =>",utmParams);

            if (utmParams['Medium']) {
              googletag.pubads().setTargeting('Medium', utmParams['Medium']);
            }

            const mapping3 = googletag.sizeMapping()
              .addSize([1400, 0], ['fluid', [728, 90], [300, 250], [300, 600], [468, 60]])
              .addSize([1200, 0], ['fluid', [728, 90], [468, 60], [300, 250], [300, 600]])
              .addSize([1000, 0], ['fluid', [728, 90], [468, 60], [300, 250], [300, 600]])
              .addSize([700, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100], [300, 250], [300, 600]])
              .addSize([600, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100], [300, 250], [300, 600]])
              .addSize([400, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100], [300, 250], [300, 600]])
              .addSize([300, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100], [300, 250], [300, 600]])
              .build();

            const isFromInterstitial = ${isFromInterstitial};
            
            if (isFromInterstitial) {
              googletag.defineSlot('/22047902240/wifinews/cancel2_top300x250', ['fluid',[300,250],[300,600],[320,50],[320,100],[468,60],[728,90]], 'div-gpt-ad-6408777-2')
                .defineSizeMapping(mapping3)
                .addService(googletag.pubads());
              googletag.defineSlot('/22047902240/wifinews/cancel2_middle300x250', ['fluid',[300,250],[300,600],[320,50],[320,100],[468,60],[728,90]], 'div-gpt-ad-6408777-1')
                .defineSizeMapping(mapping3)
                .addService(googletag.pubads());
            } else {
              googletag.defineSlot('/22047902240/wifinews/cancel_top300x250', ['fluid',[300,250],[300,600],[320,50],[320,100],[468,60],[728,90]], 'div-gpt-ad-7923782-2')
                .defineSizeMapping(mapping3)
                .addService(googletag.pubads());
              googletag.defineSlot('/22047902240/wifinews/cancel_middle300x250', ['fluid',[300,250],[300,600],[320,50],[320,100],[468,60],[728,90]], 'div-gpt-ad-7923782-1')
                .defineSizeMapping(mapping3)
                .addService(googletag.pubads());
            }

            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);
            googletag.enableServices();

            googletag.cmd.push(function() {
              if (isFromInterstitial) {
                googletag.display('div-gpt-ad-6408777-2');
                googletag.display('div-gpt-ad-6408777-1');
              } else {
                googletag.display('div-gpt-ad-7923782-2');
                googletag.display('div-gpt-ad-7923782-1');
              }
            });
          });
        `}
      </Script>

      <div className='w-full max-w-lg space-y-6 text-center'>
        <h1 className='text-3xl font-bold leading-tight sm:text-4xl md:text-5xl'>
          You have opted not to access our free WiFi.
        </h1>

        <p className='text-lg leading-relaxed text-gray-600 sm:text-xl'>
          This service is available for FREE to you, which is made possible by
          our advertisers. To continue, please support and watch the ad to
          continue using this service.
        </p>

        <button
          type='button'
          className='w-full rounded-lg bg-black px-6 py-3 text-white transition duration-300 ease-in-out hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-400 focus:ring-opacity-50 sm:w-auto'
          onClick={handleRedirect}
        >
          PRESS TO ACCESS FREE Wi-Fi
        </button>
      </div>

      {isFromInterstitial && (
        <>
          <div className='my-4 mt-[30px] flex w-full items-center justify-center'>
            <div id='div-gpt-ad-6408777-2'></div>
          </div>

          <div className='my-4 flex w-full items-center justify-center'>
            <div id='div-gpt-ad-6408777-1'></div>
          </div>
        </>
      )}

      {!isFromInterstitial && (
        <>
          <div className='my-4 mt-[30px] flex w-full items-center justify-center'>
            <div id='div-gpt-ad-7923782-2'></div>
          </div>

          <div className='my-4 flex w-full items-center justify-center'>
            <div id='div-gpt-ad-7923782-1'></div>
          </div>
        </>
      )}
    </div>
  );
}
