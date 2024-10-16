'use client';
import React, { useState } from 'react';
import Script from 'next/script';
import { getUtmParams, appendUtmParams } from '@/app/_utils/utm.util';
import InterstitialTimer from '@/app/_components/InterstitialTimer';
import dynamic from 'next/dynamic';

const MemoizedInterstitialTimer = React.memo(InterstitialTimer);

const RewardedAds = dynamic(() => import('@/app/_components/RewardedAds'), {
  loading: () => <p>Loading ads...</p>,
});

function Interstitial() {
  const [isPaused, setIsPaused] = useState(false);

  const handlePause = (pause: boolean) => {
    setIsPaused(pause);
  };

  return (
    <>
      <Script id='gpt-rewarded-ad-setup' strategy='lazyOnload' />

      {/* Updated GPT Tag Script Integration */}
      <Script id='gpt-interstitial-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || {cmd: []};

          googletag.cmd.push(function() {
            const utmParams = ${JSON.stringify(getUtmParams())};
            console.log("interstitial utm params =>",utmParams);

      // Set the targeting key for Medium as requested by the client
      if (utmParams['Medium']) {
        googletag.pubads().setTargeting('Medium', utmParams['Medium']);
      }

            const mapping1 = googletag.sizeMapping()
              .addSize([1400, 0], [[728, 90], 'fluid'])
              .addSize([1200, 0], [[728, 90], 'fluid'])
              .addSize([1000, 0], [[728, 90], 'fluid'])
              .addSize([700, 0], [[468, 60], [320, 50], [300, 50], 'fluid', [300, 250], [320, 100], [300, 100]])
              .addSize([600, 0], [[468, 60], [320, 50], [300, 50], 'fluid', [300, 100], [320, 100], [300, 250]])
              .addSize([400, 0], [[320, 50], [300, 50], 'fluid', [320, 100], [300, 250], [300, 100]])
              .addSize([300, 0], [[320, 50], [300, 250], [320, 100], [300, 50], [300, 100], 'fluid'])
              .build();

            const mapping2 = googletag.sizeMapping()
              .addSize([1400, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
              .addSize([1200, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
              .addSize([1000, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
              .addSize([700, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
              .addSize([600, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
              .addSize([400, 0], [[300, 250], [300, 600], [320, 480], 'fluid'])
              .addSize([300, 0], [[300, 250], [300, 600], [320, 480], 'fluid'])
              .build();

            const mapping4 = googletag.sizeMapping()
              .addSize([1400, 0], [[728, 90], 'fluid'])
              .addSize([1200, 0], [[728, 90], 'fluid'])
              .addSize([1000, 0], [[728, 90], 'fluid'])
              .addSize([700, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100]])
              .addSize([600, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100]])
              .addSize([400, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100]])
              .addSize([300, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100]])
              .build();

            googletag.defineSlot('/22047902240/wifinews/interstitial', ['fluid',[320,480],[300,250],[300,600]], 'div-gpt-ad-6110814-1')
              .defineSizeMapping(mapping2)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/interstitial_1_320x50', ['fluid',[320,50],[320,100],[300,250],[468,60],[728,90]], 'div-gpt-ad-6110814-2')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/interstitial1_sticky', ['fluid',[320,50],[320,100],[468,60],[728,90]], 'div-gpt-ad-6110814-3')
              .defineSizeMapping(mapping4)
              .addService(googletag.pubads());

            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);
            googletag.enableServices();

            googletag.display('div-gpt-ad-6110814-1');
            googletag.display('div-gpt-ad-6110814-2');
            googletag.display('div-gpt-ad-6110814-3');
          });
        `}
      </Script>

      <div className='flex min-h-screen flex-col items-center px-4 py-10'>
        <MemoizedInterstitialTimer isPaused={isPaused} />

        {/* Sticky Ad */}
        <div className='fixed bottom-12 left-0 right-0 z-[9999] flex justify-center'>
          <div id='div-gpt-ad-6110814-3' className='w-full max-w-[768px]'></div>
        </div>

        {/* Divs for Ad Slots */}
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6110814-1'></div>
        </div>
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6110814-2'></div>
        </div>
      </div>

      <RewardedAds onPause={handlePause} onPage={'interstitial'} />
    </>
  );
}

export default Interstitial;
