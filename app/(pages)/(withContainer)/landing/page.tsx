'use client';
import React, { useState, useLayoutEffect } from 'react';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { getUtmParams } from '@/app/_utils/utm.util';
import ProgressIndicator from '@/app/_components/ProgressIndicator';
import LandingTimer from '@/app/_components/LandingTimer';

const MemoizedProgressIndicator = React.memo(ProgressIndicator);
const MemoizedLandingTimer = React.memo(LandingTimer);

const RewardedAds = dynamic(() => import('@/app/_components/RewardedAds'), {
  loading: () => <p>Loading ads...</p>,
});

const setupAds = () => {
  window.googletag = window.googletag || { cmd: [] };

  window.googletag.cmd.push(function () {
    if (!window.googletag.pubads) {
      console.error('googletag.pubads is not available yet.');
      return;
    }

    const utmParams = getUtmParams();
    console.log('landing utm params =>', utmParams);

    if (utmParams['Medium']) {
      googletag.pubads().setTargeting('Medium', utmParams['Medium']);
    }

    try {
      if (
        !googletag
          .pubads()
          .getSlots()
          .find((slot) => slot.getSlotElementId() === 'div-gpt-ad-7092085-1')
      ) {
        var mapping1 = googletag
          .sizeMapping()
          .addSize([1400, 0], [[728, 90], 'fluid'])
          .addSize([1200, 0], [[728, 90], 'fluid'])
          .addSize([1000, 0], [[728, 90], 'fluid'])
          .addSize(
            [700, 0],
            [
              [468, 60],
              [320, 50],
              [300, 50],
              'fluid',
              [300, 250],
              [320, 100],
              [300, 100],
            ]
          )
          .addSize(
            [600, 0],
            [
              [468, 60],
              [320, 50],
              [300, 50],
              'fluid',
              [300, 100],
              [320, 100],
              [300, 250],
            ]
          )
          .addSize(
            [400, 0],
            [[320, 50], [300, 50], 'fluid', [320, 100], [300, 250], [300, 100]]
          )
          .addSize(
            [300, 0],
            [[320, 50], [300, 250], [320, 100], [300, 50], [300, 100], 'fluid']
          )
          .build();

        // @ts-ignore
        googletag
          .defineSlot(
            '/22047902240/wifinews/landing_interstitial',
            ['fluid', [320, 480], [300, 250], [300, 600]],
            'div-gpt-ad-7092085-1'
          )
          // @ts-ignore
          .defineSizeMapping(mapping1)
          .addService(googletag.pubads());
      } else {
        console.warn('Slot div-gpt-ad-7092085-1 already defined.');
      }

      if (
        !googletag
          .pubads()
          .getSlots()
          .find((slot) => slot.getSlotElementId() === 'div-gpt-ad-7092085-2')
      ) {
        var mapping2 = googletag
          .sizeMapping()
          .addSize([1400, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
          .addSize([1200, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
          .addSize([1000, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
          .addSize([700, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
          .addSize([600, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
          .addSize([400, 0], [[300, 250], [300, 600], [320, 480], 'fluid'])
          .addSize([300, 0], [[300, 250], [300, 600], [320, 480], 'fluid'])
          .build();

        // @ts-ignore
        googletag
          .defineSlot(
            '/22047902240/wifinews/landing_top320x50',
            ['fluid', [300, 250], [320, 50], [320, 100], [468, 60], [728, 90]],
            'div-gpt-ad-7092085-2'
          )
          // @ts-ignore
          .defineSizeMapping(mapping2)
          .addService(googletag.pubads());
      } else {
        console.warn('Slot div-gpt-ad-7092085-2 already defined.');
      }

      if (
        !googletag
          .pubads()
          .getSlots()
          .find((slot) => slot.getSlotElementId() === 'div-gpt-ad-7092085-3')
      ) {
        var mapping3 = googletag
          .sizeMapping()
          .addSize([1400, 0], [[728, 90], 'fluid'])
          .addSize([1200, 0], [[728, 90], 'fluid'])
          .addSize([1000, 0], [[728, 90], 'fluid'])
          .addSize(
            [700, 0],
            ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100]]
          )
          .addSize(
            [600, 0],
            ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100]]
          )
          .addSize(
            [400, 0],
            ['fluid', [320, 50], [300, 50], [320, 100], [300, 100]]
          )
          .addSize(
            [300, 0],
            ['fluid', [320, 50], [300, 50], [320, 100], [300, 100]]
          )
          .build();

        // @ts-ignore
        googletag
          .defineSlot(
            '/22047902240/wifinews/landing_sticky',
            ['fluid', [320, 50], [320, 100], [468, 60], [728, 90]],
            'div-gpt-ad-7092085-3'
          )
          // @ts-ignore
          .defineSizeMapping(mapping3)
          .addService(googletag.pubads());
      } else {
        console.warn('Slot div-gpt-ad-7092085-3 already defined.');
      }

      googletag.pubads().enableSingleRequest();
      googletag.pubads().collapseEmptyDivs();
      googletag.pubads().setCentering(true);
      googletag.enableServices();
    } catch (error) {
      console.error('Error in setting up ads:', error);
    }
  });
};

const Landing: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const handlePause = (pause: boolean) => {
    setIsPaused(pause);
  };

  useLayoutEffect(() => {
    setupAds();

    return () => {
      if (window.googletag && googletag.pubads) {
        const slots = googletag.pubads().getSlots();
        if (slots.length > 0) {
          console.log('Cleaning up ad slots...');
          googletag.destroySlots();
        }
      }
    };
  }, []);

  return (
    <>
      <Script id='gpt-rewarded-ad-setup' strategy='lazyOnload' />

      <div className='flex min-h-screen flex-col items-center px-4 py-4'>
        <div className='mb-5 text-center'>
          <MemoizedProgressIndicator currentStep={1} totalSteps={3} />
          <p className='mt-2 text-lg font-semibold text-gray-700'>
            View these ads for
          </p>
          <MemoizedLandingTimer isPaused={isPaused} />
        </div>

        {/* Ad slots */}
        <div
          className='fixed bottom-0 left-1/2 z-50 -translate-x-1/2 transform'
          style={{ marginBottom: '0px' }}
        >
          <div id='div-gpt-ad-7092085-3' className='mx-auto'></div>
        </div>

        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-7092085-1'></div>
        </div>
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-7092085-2'></div>
        </div>
      </div>

      <RewardedAds onPause={handlePause} onPage={'landing'} />
    </>
  );
};

export default Landing;
