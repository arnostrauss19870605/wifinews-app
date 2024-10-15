'use client';
import React from 'react';
import Script from 'next/script';
import LearningMaterial from '@/app/_components/LearningMaterial';
import DiscussionForum from '@/app/_components/DiscussionForum';
import { getUtmParams } from '@/app/_utils/utm.util';
import NewsWidget from '@/app/_components/NewsWidget';
import HomeTimer from '@/app/_components/HomeTimer';

const MemoizedHomeTimer = React.memo(HomeTimer);

function Home() {
  return (
    <div>
      <Script id='gpt-home-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || { cmd: [] };

          window.googletag.cmd.push(function () {
            const utmParams = ${JSON.stringify(getUtmParams())};
            console.log("home utm params =>",utmParams);

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

            const mapping3 = googletag.sizeMapping()
              .addSize([1400, 0], ['fluid', [728, 90], [300, 250], [300, 600], [468, 60]])
              .addSize([1200, 0], ['fluid', [728, 90], [468, 60], [300, 250], [300, 600]])
              .addSize([1000, 0], ['fluid', [728, 90], [468, 60], [300, 250], [300, 600]])
              .addSize([700, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100], [300, 250], [300, 600]])
              .addSize([600, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100], [300, 250], [300, 600]])
              .addSize([400, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100], [300, 250], [300, 600]])
              .addSize([300, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100], [300, 250], [300, 600]])
              .build();

            const mapping4 = googletag.sizeMapping()
              .addSize([1400, 0], [[728, 90], 'fluid'])
              .addSize([1200, 0], [[728, 90], 'fluid'])
              .addSize([1000, 0], [[728, 90], 'fluid'])
              .addSize([700, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100], [300, 250]])
              .addSize([600, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100], [300, 250]])
              .addSize([400, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100], [300, 250]])
              .addSize([300, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100], [300, 250]])
              .build();

            googletag.defineSlot('/22047902240/wifinews/homepage_top_leaderboard', ['fluid', [320, 100], [320, 50], [300, 250], [468, 60], [728, 90]], 'div-gpt-ad-6641866-1')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/homepage_mpu_hpa', ['fluid', [300, 250], [300, 600], [320, 50], [320, 100], [468, 60], [728, 90]], 'div-gpt-ad-6641866-2')
              .defineSizeMapping(mapping3)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/homepage_mpu_hpa_2', ['fluid', [300, 250], [300, 600], [320, 50], [320, 100], [468, 60], [728, 90]], 'div-gpt-ad-6641866-3')
              .defineSizeMapping(mapping3)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/Homepage_bottom_1', ['fluid', [300, 250], [320, 100], [320, 50], [468, 60], [728, 90]], 'div-gpt-ad-6641866-4')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/Homepage_bottom_2', ['fluid', [300, 250], [320, 50], [320, 100], [468, 60], [728, 90]], 'div-gpt-ad-6641866-5')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/homepage_sticky', ['fluid', [320, 50], [320, 100], [300, 250], [468, 60], [728, 90]], 'div-gpt-ad-6641866-6')
              .defineSizeMapping(mapping4)
              .addService(googletag.pubads());

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
          });
        `}
      </Script>

      <Script
        id='gpt-vignette-setup'
        strategy='lazyOnload'
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

      <div className='flex min-h-screen flex-col items-center px-4 py-10'>
        <MemoizedHomeTimer />
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6641866-1'></div>
        </div>

        <LearningMaterial />
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6641866-2'></div>
        </div>
        <DiscussionForum />
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6641866-3'></div>
        </div>
        <div className='my-10'>
          <NewsWidget />
        </div>

        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6641866-4'></div>
        </div>
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6641866-5'></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
