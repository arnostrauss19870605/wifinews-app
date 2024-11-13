'use client';

import React, { useState, useEffect } from 'react';
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
    if (!window.googletag?.pubads) {
      console.error('googletag.pubads is not available yet.');
      return;
    }

    const utmParams = getUtmParams();

    if (utmParams['Medium']) {
      window.googletag.pubads().setTargeting('Medium', utmParams['Medium']);
    }

    try {
      const mapping1 = window.googletag
        ?.sizeMapping()
        .addSize([1400, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
        .addSize([1200, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
        .addSize([1000, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
        .addSize([700, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
        .addSize([600, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
        .addSize([400, 0], [[300, 250], [300, 600], [320, 480], 'fluid'])
        .addSize([300, 0], [[300, 250], [300, 600], [320, 480], 'fluid'])
        .build()!;

      if (
        !window.googletag
          ?.pubads()
          ?.getSlots()
          ?.find((slot) => slot.getSlotElementId() === 'div-gpt-ad-7092085-1')
      ) {
        window.googletag
          ?.defineSlot(
            '/22047902240/wifinews/landing_interstitial',
            ['fluid', [320, 480], [300, 250], [300, 600]],
            'div-gpt-ad-7092085-1'
          )
          ?.defineSizeMapping(mapping1)
          ?.addService(window.googletag.pubads());
      }

      const mapping2 = window.googletag
        ?.sizeMapping()
        .addSize(
          [1400, 0],
          [
            [320, 50],
            [320, 100],
            [300, 250],
            [728, 90],
          ]
        )
        .addSize(
          [1200, 0],
          [
            [320, 50],
            [320, 100],
            [300, 250],
            [728, 90],
          ]
        )
        .addSize(
          [1000, 0],
          [
            [320, 50],
            [320, 100],
            [300, 250],
            [728, 90],
          ]
        )
        .addSize([700, 0], [[320, 50], [300, 250], [300, 600], 'fluid'])
        .addSize([600, 0], [[320, 50], [300, 250], [300, 600], 'fluid'])
        .addSize([400, 0], [[320, 50], [300, 250], [300, 600], 'fluid'])
        .addSize([300, 0], [[320, 50], [300, 250], [300, 600], 'fluid'])
        .build()!;

      if (
        !window.googletag
          ?.pubads()
          ?.getSlots()
          ?.find((slot) => slot.getSlotElementId() === 'div-gpt-ad-7092085-2')
      ) {
        window.googletag
          ?.defineSlot(
            '/22047902240/wifinews/landing_top320x50',
            ['fluid', [320, 50], [320, 100], [300, 250], [728, 90]],
            'div-gpt-ad-7092085-2'
          )
          ?.defineSizeMapping(mapping2)
          ?.addService(window.googletag.pubads());
      }

      const mapping3 = window.googletag
        ?.sizeMapping()
        .addSize([1400, 0], [[728, 90], 'fluid'])
        .addSize([1200, 0], [[728, 90], 'fluid'])
        .addSize([1000, 0], [[728, 90], 'fluid'])
        .addSize([700, 0], [[320, 50], [300, 250], 'fluid'])
        .addSize([600, 0], [[320, 50], [300, 250], 'fluid'])
        .addSize([400, 0], [[320, 50], [300, 250], 'fluid'])
        .addSize([300, 0], [[320, 50], [300, 250], 'fluid'])
        .build()!;

      if (
        !window.googletag
          ?.pubads()
          ?.getSlots()
          ?.find((slot) => slot.getSlotElementId() === 'div-gpt-ad-7092085-3')
      ) {
        window.googletag
          ?.defineSlot(
            '/22047902240/wifinews/landing_sticky',
            ['fluid', [320, 50], [320, 100], [300, 250], [728, 90]],
            'div-gpt-ad-7092085-3'
          )
          ?.defineSizeMapping(mapping3)
          ?.addService(window.googletag.pubads());
      }

      window.googletag?.pubads()?.enableSingleRequest();
      window.googletag?.pubads()?.collapseEmptyDivs();
      window.googletag?.pubads()?.setCentering(true);
      window.googletag?.enableServices();
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

  useEffect(() => {
    setupAds();

    return () => {
      if (window.googletag?.pubads) {
        const slots = window.googletag.pubads()?.getSlots();
        if (slots?.length > 0) {
          window.googletag.destroySlots();
        }
      }
    };
  }, []);

  return (
    <>
      <Script id='gpt-rewarded-ad-setup' strategy='lazyOnload' />

      <div className='flex min-h-screen flex-col items-center px-4 py-10'>
        <div className='mb-5 text-center'>
          <MemoizedProgressIndicator currentStep={1} totalSteps={3} />
          <p className='mt-2 text-lg font-semibold text-gray-700'>
            View these ads for
          </p>
          <MemoizedLandingTimer isPaused={isPaused} />
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

      <RewardedAds onPause={handlePause} onPage={'landing'} />
    </>
  );
};

export default Landing;
