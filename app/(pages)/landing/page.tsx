'use client';

import React, { useState } from 'react';
import Script from 'next/script';
import ProgressIndicator from '@/app/_components/ProgressIndicator';
import { getUtmParams } from '@/app/_utils/utm.util';
import LandingTimer from '../../_components/LandingTimer';
import RewardedAds from '@/app/_components/RewardedAds';

const Landing: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const handlePause = (pause: boolean) => {
    setIsPaused(pause);
  };

  return (
    <>
      <Script id='gpt-rewarded-ad-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || {cmd: []};
        `}
      </Script>

      <Script id='gpt-ad-slots' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || {cmd: []};

          googletag.cmd.push(function() {
            const utmParams = ${JSON.stringify(getUtmParams())};
            console.log("landing utm params =>",utmParams);

            var mapping1 = googletag.sizeMapping()
              .addSize([1400, 0], [[728, 90], 'fluid'])
              .addSize([1200, 0], [[728, 90], 'fluid'])
              .addSize([1000, 0], [[728, 90], 'fluid'])
              .addSize([700, 0], [[468, 60], [320, 50], [300, 50], 'fluid', [300, 250], [320, 100], [300, 100]])
              .addSize([600, 0], [[468, 60], [320, 50], [300, 50], 'fluid', [300, 100], [320, 100], [300, 250]])
              .addSize([400, 0], [[320, 50], [300, 50], 'fluid', [320, 100], [300, 250], [300, 100]])
              .addSize([300, 0], [[320, 50], [300, 250], [320, 100], [300, 50], [300, 100], 'fluid'])
              .build();

            var mapping2 = googletag.sizeMapping()
              .addSize([1400, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
              .addSize([1200, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
              .addSize([1000, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
              .addSize([700, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
              .addSize([600, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
              .addSize([400, 0], [[300, 250], [300, 600], [320, 480], 'fluid'])
              .addSize([300, 0], [[300, 250], [300, 600], [320, 480], 'fluid'])
              .build();

            var mapping4 = googletag.sizeMapping()
              .addSize([1400, 0], [[728, 90], 'fluid'])
              .addSize([1200, 0], [[728, 90], 'fluid'])
              .addSize([1000, 0], [[728, 90], 'fluid'])
              .addSize([700, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100]])
              .addSize([600, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100]])
              .addSize([400, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100]])
              .addSize([300, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100]])
              .build();

            googletag.defineSlot('/22047902240/wifinews/landing_interstitial', ['fluid',[320,480],[300,250],[300,600]], 'div-gpt-ad-7092085-1')
              .defineSizeMapping(mapping2)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/landing_top320x50', ['fluid',[300,250],[320,50],[320,100],[468,60],[728,90]], 'div-gpt-ad-7092085-2')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/landing_sticky', ['fluid',[320,50],[320,100],[468,60],[728,90]], 'div-gpt-ad-7092085-3')
              .defineSizeMapping(mapping4)
              .addService(googletag.pubads());

            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);
            googletag.enableServices();
          });
        `}
      </Script>

      <div className='flex min-h-screen flex-col items-center px-4 py-10'>
        <div className='mb-5 text-center'>
          <ProgressIndicator currentStep={1} totalSteps={3} />
          <p className='mt-2 text-lg font-semibold text-gray-700'>
            View these ads for
          </p>
          <LandingTimer totalTime={35} isPaused={isPaused} />
        </div>

        <div className='fixed bottom-12 left-0 right-0 z-[9999] flex justify-center'>
          <div id='div-gpt-ad-7092085-3' className='w-full max-w-[768px]'></div>
        </div>

        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-7092085-1'></div>
        </div>
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-7092085-2'></div>
        </div>
      </div>

      <RewardedAds onPause={handlePause} />
    </>
  );
};

export default Landing;
