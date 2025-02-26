'use client';
import React from 'react';
import Script from 'next/script';
import { getUtmParams, appendUtmParams } from '@/app/_utils/utm.util';
import { FaSearch } from 'react-icons/fa';
import DiscussionForum from '@/app/_components/DiscussionForum';
import RecentTopicsWidget from '@/app/_components/RecentTopicsWidget';
import NewsWidgetClient from '@/app/_components/NewsWidgetClient';

function Exit_1() {
  const cancelPage = () => {
    window.location.href = appendUtmParams('/');
  };

  const handleConnect = () => {
    window.location.href = appendUtmParams('/search');
  };

  return (
    <>
      <Script id='gpt-exit-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || {cmd: []};

          googletag.cmd.push(function() {
            const utmParams = ${JSON.stringify(getUtmParams())};
            console.log("exit utm params =>", utmParams);

            if (utmParams['Medium']) {
              googletag.pubads().setTargeting('Medium', utmParams['Medium']);
            }

            const mapping = googletag.sizeMapping()
              .addSize([1400, 0], [[728, 90], 'fluid'])
              .addSize([1200, 0], [[728, 90], 'fluid'])
              .addSize([1000, 0], [[728, 90], 'fluid'])
              .addSize([700, 0], [[468, 60], [320, 50], [300, 50], 'fluid', [300, 250], [320, 100], [300, 100]])
              .addSize([600, 0], [[468, 60], [320, 50], [300, 50], 'fluid', [300, 100], [320, 100], [300, 250]])
              .addSize([400, 0], [[320, 50], [300, 50], 'fluid', [320, 100], [300, 250], [300, 100]])
              .addSize([300, 0], [[320, 50], [300, 250], [320, 100], [300, 50], [300, 100], 'fluid'])
              .build();

            const mappingMiddle = googletag.sizeMapping()
              .addSize([1400, 0], [[728, 90], [300, 250], [300, 600], 'fluid'])
              .addSize([1200, 0], [[728, 90], [300, 250], [300, 600], 'fluid'])
              .addSize([1000, 0], [[728, 90], [300, 250], [300, 600], 'fluid'])
              .addSize([700, 0], [[468, 60], [320, 50], [300, 50], 'fluid', [300, 250], [300, 600], [320, 100], [300, 100]])
              .addSize([600, 0], [[468, 60], [320, 50], [300, 50], 'fluid', [300, 100], [320, 100], [300, 250], [300, 600]])
              .addSize([400, 0], [[320, 50], [300, 50], 'fluid', [320, 100], [300, 250], [300, 600], [300, 100]])
              .addSize([300, 0], [[320, 50], [300, 250], [300, 600], [320, 100], [300, 50], [300, 100], 'fluid'])
              .build();

            googletag.defineSlot('/22047902240/wifinews/exit_top', ['fluid', [300,250], [320,50], [320,100], [468,60], [728,90]], 'div-gpt-ad-5795880-1')
              .defineSizeMapping(mapping)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/exit_middle', ['fluid', [300,250], [300,600], [320,50], [320,100], [468,60], [728,90]], 'div-gpt-ad-5795880-2')
              .defineSizeMapping(mappingMiddle)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/exit_middle2', ['fluid', [300,250], [300,600], [320,50], [320,100], [468,60], [728,90]], 'div-gpt-ad-5795880-3')
              .defineSizeMapping(mappingMiddle)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/exit_bottom1', ['fluid', [300,250], [320,50], [320,100], [468,60], [728,90]], 'div-gpt-ad-5795880-4')
              .defineSizeMapping(mapping)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/exit_bottom2', ['fluid', [300,250], [320,50], [320,100], [468,60], [728,90]], 'div-gpt-ad-5795880-5')
              .defineSizeMapping(mapping)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/exit_sticky', ['fluid', [320,50], [320,100], [300,250], [468,60], [728,90]], 'div-gpt-ad-5795880-6')
              .defineSizeMapping(mapping)
              .addService(googletag.pubads());

            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);
            googletag.enableServices();

            googletag.display('div-gpt-ad-5795880-1');
            googletag.display('div-gpt-ad-5795880-2');
            googletag.display('div-gpt-ad-5795880-3');
            googletag.display('div-gpt-ad-5795880-4');
            googletag.display('div-gpt-ad-5795880-5');
            googletag.display('div-gpt-ad-5795880-6');
          });
        `}
      </Script>

      <div className='my-4 flex w-full items-center justify-center'>
        <div id='div-gpt-ad-5795880-1'></div>
      </div>

      <div className='flex min-h-screen flex-col items-center px-4 py-4'>
        <p className='mb-4'>You are now connected to the internet</p>
        <div className='flex justify-center'>
          <button
            type='button'
            className='mb-6 mt-2 flex items-center rounded-lg bg-slate-950 px-6 py-3 font-medium text-white focus:outline-none lg:px-10'
            onClick={handleConnect}
          >
            <FaSearch className='mr-2' /> Click Here To Browse
          </button>
        </div>

        <DiscussionForum />
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-5795880-3'></div>
        </div>
        <RecentTopicsWidget />
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-5795880-4'></div>
        </div>
        <div className='my-2'>
          <NewsWidgetClient />
        </div>
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-5795880-2'></div>
        </div>
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-5795880-5'></div>
        </div>

        {/* Sticky Ad */}
        <div
          className='fixed bottom-0 left-1/2 z-50 -translate-x-1/2 transform'
          style={{ marginBottom: '0px' }}
        >
          <div id='div-gpt-ad-5795880-6' className='mx-auto'></div>
        </div>
      </div>
    </>
  );
}

export default Exit_1;
