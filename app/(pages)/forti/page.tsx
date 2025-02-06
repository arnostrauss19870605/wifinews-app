'use client';
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import DiscussionForum from '@/app/_components/DiscussionForum';
import ProgressIndicator from '@/app/_components/ProgressIndicator';
import { getUtmParams, appendUtmParams } from '@/app/_utils/utm.util';
import { FaWifi } from 'react-icons/fa';
import NewsWidget from '@/app/_components/NewsWidget';

function Forti() {
  const [timer, setTimer] = useState(20);
  const [isButtonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          const newTime = prevTimer - 1;
          if (newTime <= 10) {
            setButtonVisible(true);
          }
          return newTime;
        }
        return 0;
      });
    }, 1000);

    if (timer === 0) {
      clearInterval(countdownInterval);
      window.location.href = appendUtmParams('/forti_2');
    }

    return () => clearInterval(countdownInterval);
  }, [timer]);

  return (
    <div>
      {/* GPT Configuration and Ad Display */}
      <Script id='gpt-forti-setup' strategy='afterInteractive'>
        {`
    window.googletag = window.googletag || { cmd: [] };

    window.googletag.cmd.push(function () {
      const utmParams = ${JSON.stringify(getUtmParams())};
      console.log("forti utm params =>", utmParams);

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

      googletag.defineSlot('/22047902240/wifinews/fortihome_top320x50', ['fluid', [320, 50], [320, 100], [300, 250], [468, 60], [728, 90]], 'div-gpt-ad-8664835-1')
        .defineSizeMapping(mapping1)
        .addService(googletag.pubads());

      googletag.defineSlot('/22047902240/wifinews/fortihome_top300x250', [[320, 50], [320, 100], 'fluid', [300, 250], [300, 600], [468, 60], [728, 90]], 'div-gpt-ad-8664835-2')
        .defineSizeMapping(mapping3)
        .addService(googletag.pubads());

      googletag.defineSlot('/22047902240/wifinews/fortihome_middle300x250', [[320, 50], 'fluid', [320, 100], [300, 250], [300, 600], [468, 60], [728, 90]], 'div-gpt-ad-8664835-3')
        .defineSizeMapping(mapping3)
        .addService(googletag.pubads());

      googletag.defineSlot('/22047902240/wifinews/fortihome_bottom1_320x50', [[320, 50], 'fluid', [320, 100], [468, 60], [728, 90], [300, 250]], 'div-gpt-ad-8664835-4')
        .defineSizeMapping(mapping1)
        .addService(googletag.pubads());

      googletag.defineSlot('/22047902240/wifinews/fortihome_bottom2_320x50', [[320, 50], 'fluid', [320, 100], [300, 250], [468, 60], [728, 90]], 'div-gpt-ad-8664835-5')
        .defineSizeMapping(mapping1)
        .addService(googletag.pubads());

      googletag.defineSlot('/22047902240/wifinews/fortihome_sticky_320x50', ['fluid', [320, 50], [320, 100], [300, 250], [468, 60], [728, 90]], 'div-gpt-ad-8664835-6')
        .defineSizeMapping(mapping4)
        .addService(googletag.pubads());

      googletag.pubads().enableSingleRequest();
      googletag.pubads().collapseEmptyDivs();
      googletag.pubads().setCentering(true);
      googletag.enableServices();

      googletag.display('div-gpt-ad-8664835-1');
      googletag.display('div-gpt-ad-8664835-2');
      googletag.display('div-gpt-ad-8664835-3');
      googletag.display('div-gpt-ad-8664835-4');
      googletag.display('div-gpt-ad-8664835-5');
      googletag.display('div-gpt-ad-8664835-6');
    });
  `}
      </Script>
      {/* Separate Vignette Ad Script */}
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

      <div className='flex min-h-screen flex-col items-center px-4 py-4'>
        <div className='mb-5 text-center'>
          <ProgressIndicator currentStep={1} totalSteps={2} />
          <p className='mt-2 text-lg font-semibold text-gray-700'>
            View these ads for{' '}
            <span className='text-xl font-bold text-gray-800'>
              {timer} seconds
            </span>
          </p>
        </div>

        <div className='mb-4 flex justify-center'>
          {isButtonVisible && (
            <a
              href={appendUtmParams('/forti_2')}
              className='flex items-center rounded-lg bg-slate-950 px-6 py-3 font-medium text-white focus:outline-none lg:px-10'
            >
              <FaWifi className='mr-2' /> Connect Now
            </a>
          )}
        </div>
        <DiscussionForum />
        <div className='my-10'>
          <NewsWidget />
        </div>
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-8664835-1'></div>
        </div>

        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-8664835-2'></div>
        </div>

        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-8664835-3'></div>
        </div>

        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-8664835-4'></div>
        </div>

        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-8664835-5'></div>
        </div>

        {/* Sticky Ad */}
        <div
          className='fixed bottom-5 left-1/2 z-50 hidden -translate-x-1/2 transform lg:block'
          style={{ marginBottom: '20px' }}
        >
          <div id='div-gpt-ad-8664835-6' className='w-full max-w-[768px]'></div>
        </div>
      </div>
    </div>
  );
}

export default Forti;
