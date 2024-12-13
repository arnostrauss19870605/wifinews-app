'use client';
import React, { useLayoutEffect } from 'react';
import Script from 'next/script';
import DiscussionForum from '@/app/_components/DiscussionForum';
import { getUtmParams } from '@/app/_utils/utm.util';
import NewsWidget from '@/app/_components/NewsWidget';
import HomeTimer from '@/app/_components/HomeTimer';
import RecentTopicsWidget from '@/app/_components/RecentTopicsWidget';

const setupGoogleAds = () => {
  window.googletag = window.googletag || { cmd: [] };

  window.googletag.cmd.push(function () {
    const utmParams = getUtmParams();
    console.log('home utm params =>', utmParams);

    if (utmParams['Medium']) {
      googletag.pubads().setTargeting('Medium', utmParams['Medium']);
    }

    try {
      // Mapping 1
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

      // Mapping 3
      const mapping3 = googletag
        .sizeMapping()
        .addSize(
          [1400, 0],
          ['fluid', [728, 90], [300, 250], [300, 600], [468, 60]]
        )
        .addSize(
          [1200, 0],
          ['fluid', [728, 90], [468, 60], [300, 250], [300, 600]]
        )
        .addSize(
          [1000, 0],
          ['fluid', [728, 90], [468, 60], [300, 250], [300, 600]]
        )
        .addSize(
          [700, 0],
          [
            'fluid',
            [468, 60],
            [320, 50],
            [300, 50],
            [320, 100],
            [300, 100],
            [300, 250],
            [300, 600],
          ]
        )
        .addSize(
          [600, 0],
          [
            'fluid',
            [468, 60],
            [320, 50],
            [300, 50],
            [320, 100],
            [300, 100],
            [300, 250],
            [300, 600],
          ]
        )
        .addSize(
          [400, 0],
          [
            'fluid',
            [320, 50],
            [300, 50],
            [320, 100],
            [300, 100],
            [300, 250],
            [300, 600],
          ]
        )
        .addSize(
          [300, 0],
          [
            'fluid',
            [320, 50],
            [300, 50],
            [320, 100],
            [300, 100],
            [300, 250],
            [300, 600],
          ]
        )
        .build();

      // Mapping 4
      const mapping4 = googletag
        .sizeMapping()
        .addSize([1400, 0], [[728, 90], 'fluid'])
        .addSize([1200, 0], [[728, 90], 'fluid'])
        .addSize([1000, 0], [[728, 90], 'fluid'])
        .addSize(
          [700, 0],
          [
            'fluid',
            [468, 60],
            [320, 50],
            [300, 50],
            [320, 100],
            [300, 100],
            [300, 250],
          ]
        )
        .addSize(
          [600, 0],
          [
            'fluid',
            [468, 60],
            [320, 50],
            [300, 50],
            [320, 100],
            [300, 100],
            [300, 250],
          ]
        )
        .addSize(
          [400, 0],
          ['fluid', [320, 50], [300, 50], [320, 100], [300, 100], [300, 250]]
        )
        .addSize(
          [300, 0],
          ['fluid', [320, 50], [300, 50], [320, 100], [300, 100], [300, 250]]
        )
        .build();

      // Slot Definitions and Conditions

      // Slot 1
      if (
        !googletag
          .pubads()
          .getSlots()
          .find((slot) => slot.getSlotElementId() === 'div-gpt-ad-6641866-1')
      ) {
        // @ts-ignore
        googletag
          .defineSlot(
            '/22047902240/wifinews/homepage_top_leaderboard',
            ['fluid', [320, 100], [320, 50], [300, 250], [468, 60], [728, 90]],
            'div-gpt-ad-6641866-1'
          )
          // @ts-ignore
          .defineSizeMapping(mapping1)
          .addService(googletag.pubads());
      }

      // Slot 2
      if (
        !googletag
          .pubads()
          .getSlots()
          .find((slot) => slot.getSlotElementId() === 'div-gpt-ad-6641866-2')
      ) {
        // @ts-ignore
        googletag
          .defineSlot(
            '/22047902240/wifinews/homepage_mpu_hpa',
            [
              'fluid',
              [300, 250],
              [300, 600],
              [320, 50],
              [320, 100],
              [468, 60],
              [728, 90],
            ],
            'div-gpt-ad-6641866-2'
          )
          // @ts-ignore
          .defineSizeMapping(mapping3)
          .addService(googletag.pubads());
      }

      // Slot 3
      if (
        !googletag
          .pubads()
          .getSlots()
          .find((slot) => slot.getSlotElementId() === 'div-gpt-ad-6641866-3')
      ) {
        // @ts-ignore
        googletag
          .defineSlot(
            '/22047902240/wifinews/homepage_mpu_hpa_2',
            [
              'fluid',
              [300, 250],
              [300, 600],
              [320, 50],
              [320, 100],
              [468, 60],
              [728, 90],
            ],
            'div-gpt-ad-6641866-3'
          )
          // @ts-ignore
          .defineSizeMapping(mapping3)
          .addService(googletag.pubads());
      }

      // Slot 4
      if (
        !googletag
          .pubads()
          .getSlots()
          .find((slot) => slot.getSlotElementId() === 'div-gpt-ad-6641866-4')
      ) {
        // @ts-ignore
        googletag
          .defineSlot(
            '/22047902240/wifinews/Homepage_bottom_1',
            ['fluid', [300, 250], [320, 100], [320, 50], [468, 60], [728, 90]],
            'div-gpt-ad-6641866-4'
          )
          // @ts-ignore
          .defineSizeMapping(mapping1)
          .addService(googletag.pubads());
      }

      // Slot 5
      if (
        !googletag
          .pubads()
          .getSlots()
          .find((slot) => slot.getSlotElementId() === 'div-gpt-ad-6641866-5')
      ) {
        // @ts-ignore
        googletag
          .defineSlot(
            '/22047902240/wifinews/Homepage_bottom_2',
            ['fluid', [300, 250], [320, 50], [320, 100], [468, 60], [728, 90]],
            'div-gpt-ad-6641866-5'
          )
          // @ts-ignore
          .defineSizeMapping(mapping1)
          .addService(googletag.pubads());
      }

      // Slot 6
      if (
        !googletag
          .pubads()
          .getSlots()
          .find((slot) => slot.getSlotElementId() === 'div-gpt-ad-6641866-6')
      ) {
        // @ts-ignore
        googletag
          .defineSlot(
            '/22047902240/wifinews/homepage_sticky',
            ['fluid', [320, 50], [320, 100], [300, 250], [468, 60], [728, 90]],
            'div-gpt-ad-6641866-6'
          )
          // @ts-ignore
          .defineSizeMapping(mapping4)
          .addService(googletag.pubads());
      }

      googletag.pubads().enableSingleRequest();
      googletag.pubads().collapseEmptyDivs();
      googletag.pubads().setCentering(true);
      googletag.enableServices();

      googletag.display('div-gpt-ad-6641866-1');
      googletag.display('div-gpt-ad-6641866-2');
      googletag.display('div-gpt-ad-6641866-3');
      googletag.display('div-gpt-ad-6641866-4');
      googletag.display('div-gpt-ad-6641866-5');
      googletag.display('div-gpt-ad-6641866-6');
    } catch (error) {
      console.error('Error in setting up ads:', error);
    }
  });
};

const MemoizedHomeTimer = React.memo(HomeTimer);

function Home() {
  useLayoutEffect(() => {
    setupGoogleAds();

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
    <div>
      <Script
        id='gpt-vignette-setup'
        strategy='afterInteractive'
        crossOrigin='anonymous'
      >
        {`
          window.googletag = window.googletag || { cmd: [] };

          googletag.cmd.push(function() {
            const interstitialSlot = googletag.defineOutOfPageSlot(
              "/22047902240/wifinews/homepage_vignette",
              googletag.enums.OutOfPageFormat.INTERSTITIAL
            );

            if (interstitialSlot) {
              interstitialSlot.addService(googletag.pubads()).setConfig({
                interstitial: {
                  triggers: {
                    navBar: true,
                    unhideWindow: true,
                  },
                },
              });
              
              googletag.pubads().refresh([interstitialSlot]);
            }
          });
        `}
      </Script>

      <div className='flex min-h-screen flex-col items-center px-4 py-4'>
        <MemoizedHomeTimer />
        <div className='my-2 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6641866-1'></div>
        </div>

        <DiscussionForum />
        <div className='my-2 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6641866-2'></div>
        </div>
        <RecentTopicsWidget />
        <div className='my-2 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6641866-3'></div>
        </div>
        <div className='my-2'>
          <NewsWidget />
        </div>

        <div className='my-2 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6641866-4'></div>
        </div>
        <div className='my-2 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6641866-5'></div>
        </div>
      </div>

      {/* Sticky Ad */}
      <div className='fixed bottom-12 left-0 right-0 z-[9999] flex justify-center'>
        <div id='div-gpt-ad-6641866-6' className='w-full max-w-[768px]'></div>
      </div>
    </div>
  );
}

export default Home;
