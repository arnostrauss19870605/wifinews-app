'use client';
import React, { useLayoutEffect, useState } from 'react';
import Script from 'next/script';
import { getUtmParams, appendUtmParams } from '@/app/_utils/utm.util';
import InterstitialTimer from '@/app/_components/InterstitialTimer';
import dynamic from 'next/dynamic';

const MemoizedInterstitialTimer = React.memo(InterstitialTimer);

const RewardedAds = dynamic(() => import('@/app/_components/RewardedAds'), {
  loading: () => <p>Loading ads...</p>,
});

const setupInterstitialAds = () => {
  window.googletag = window.googletag || { cmd: [] };

  window.googletag.cmd.push(function () {
    const utmParams = getUtmParams();
    console.log('interstitial utm params =>', utmParams);

    // Set the targeting key for Medium as requested by the client
    if (utmParams['Medium']) {
      googletag.pubads().setTargeting('Medium', utmParams['Medium']);
    }

    try {
      // Check if Slot 1 is already defined
      if (
        !googletag
          .pubads()
          .getSlots()
          .find((slot) => slot.getSlotElementId() === 'div-gpt-ad-6110814-1')
      ) {
        const mapping2 = googletag
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
            '/22047902240/wifinews/interstitial',
            ['fluid', [320, 480], [300, 250], [300, 600]],
            'div-gpt-ad-6110814-1'
          )
          // @ts-ignore
          .defineSizeMapping(mapping2)
          .addService(googletag.pubads());
      } else {
        console.warn('Slot div-gpt-ad-6110814-1 already defined.');
      }

      // Check if Slot 2 is already defined
      if (
        !googletag
          .pubads()
          .getSlots()
          .find((slot) => slot.getSlotElementId() === 'div-gpt-ad-6110814-2')
      ) {
        const mapping1 = googletag
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
            '/22047902240/wifinews/interstitial_1_320x50',
            ['fluid', [320, 50], [320, 100], [300, 250], [468, 60], [728, 90]],
            'div-gpt-ad-6110814-2'
          )
          // @ts-ignore
          .defineSizeMapping(mapping1)
          .addService(googletag.pubads());
      } else {
        console.warn('Slot div-gpt-ad-6110814-2 already defined.');
      }

      // Check if Slot 3 is already defined
      if (
        !googletag
          .pubads()
          .getSlots()
          .find((slot) => slot.getSlotElementId() === 'div-gpt-ad-6110814-3')
      ) {
        const mapping4 = googletag
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
            '/22047902240/wifinews/interstitial1_sticky',
            ['fluid', [320, 50], [320, 100], [468, 60], [728, 90]],
            'div-gpt-ad-6110814-3'
          )
          // @ts-ignore
          .defineSizeMapping(mapping4)
          .addService(googletag.pubads());
      } else {
        console.warn('Slot div-gpt-ad-6110814-3 already defined.');
      }

      googletag.pubads().enableSingleRequest();
      googletag.pubads().collapseEmptyDivs();
      googletag.pubads().setCentering(true);
      googletag.enableServices();

      googletag.display('div-gpt-ad-6110814-1');
      googletag.display('div-gpt-ad-6110814-2');
      googletag.display('div-gpt-ad-6110814-3');
    } catch (error) {
      console.error('Error in setting up interstitial ads:', error);
    }
  });
};

function Interstitial() {
  const [isPaused, setIsPaused] = useState(false);

  const handlePause = (pause: boolean) => {
    setIsPaused(pause);
  };

  useLayoutEffect(() => {
    setupInterstitialAds();

    return () => {
      if (window.googletag && googletag.pubads) {
        const slots = googletag.pubads().getSlots();
        if (slots.length > 0) {
          console.log('Cleaning up interstitial ad slots...');
          googletag.destroySlots();
        }
      }
    };
  }, []);

  return (
    <>
      <Script id='gpt-rewarded-ad-setup' strategy='lazyOnload' />

      <div className='flex min-h-screen flex-col items-center px-4 py-4'>
        <MemoizedInterstitialTimer isPaused={isPaused} />

        {/* Sticky Ad */}
        <div
          className='fixed bottom-5 left-1/2 z-50 -translate-x-1/2 transform'
          style={{ marginBottom: '0px' }}
        >
          <div id='div-gpt-ad-6110814-3' className='mx-auto'></div>
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
