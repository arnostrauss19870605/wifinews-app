import Script from 'next/script';
import DiscussionForum from '@/app/_components/DiscussionForum';
import { getUtmParams } from '@/app/_utils/utm.util';
import React from 'react';
import NewsWidget from '@/app/_components/NewsWidget';
import RecentTopicsWidget from '@/app/_components/RecentTopicsWidget';

function Main() {
  return (
    <div>
      {/* GPT Configuration and Ad Display */}
      <Script id='gpt-home-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || { cmd: [] };

          window.googletag.cmd.push(function () {
            const utmParams = ${JSON.stringify(getUtmParams())};
            console.log("homepage utm params =>",utmParams);

      // Set the targeting key for Medium as requested by the client
      if (utmParams['Medium']) {
        googletag.pubads().setTargeting('Medium', utmParams['Medium']);
      }

            // Define size mappings
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

            // Define ad slots and display them
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

            // Enable services and set targeting
            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);
            googletag.enableServices();

            // Display the ad slots
            googletag.display('div-gpt-ad-6641866-1');
            googletag.display('div-gpt-ad-6641866-2');
            googletag.display('div-gpt-ad-6641866-3');
            googletag.display('div-gpt-ad-6641866-4');
            googletag.display('div-gpt-ad-6641866-5');
            googletag.display('div-gpt-ad-6641866-6');
          });
        `}
      </Script>

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
      <div className='my-10'>
        <NewsWidget />
      </div>
      <div className='my-2 flex w-full items-center justify-center'>
        <div id='div-gpt-ad-6641866-4'></div>
      </div>
      <div className='my-2 flex w-full items-center justify-center'>
        <div id='div-gpt-ad-6641866-5'></div>
      </div>

      {/* Sticky Ad */}
      <div className='fixed bottom-12 left-0 right-0 z-[9999] flex justify-center'>
        <div id='div-gpt-ad-6641866-6' className='w-full max-w-[768px]'></div>
      </div>
    </div>
  );
}

export default Main;
