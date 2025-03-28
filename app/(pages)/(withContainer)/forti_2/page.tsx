'use client';
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import ProgressIndicator from '@/app/_components/ProgressIndicator';
import DiscussionForum from '@/app/_components/DiscussionForum';
import { getUtmParams, appendUtmParams } from '@/app/_utils/utm.util';
import { FaWifi } from 'react-icons/fa';
import utmToRedirectMap from '@/app/_data/utm-to-redirect-map';
import NewsWidget from '@/app/_components/NewsWidget';

function getRedirectUrl(utmMedium: string | undefined): string {
  const defaultUrl = 'https://bobbies.hotspot.yourspot.co.za/lv/login';
  if (!utmMedium) {
    return defaultUrl;
  }
  return utmToRedirectMap[utmMedium] || defaultUrl;
}

function Forti_2() {
  const [isRewardModalVisible, setIsRewardModalVisible] = useState(false);
  const [interstitialTimer, setInterstitialTimer] = useState(20);
  const [isButtonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout | null = null;

    if (!isRewardModalVisible) {
      countdownInterval = setInterval(() => {
        setInterstitialTimer((prevTimer) => {
          if (prevTimer > 0) {
            const newTime = prevTimer - 1;
            if (newTime <= 0) {
              setButtonVisible(true);
            }
            return newTime;
          }
          return 0;
        });
      }, 1000);
    }

    if (interstitialTimer === 0 && countdownInterval) {
      clearInterval(countdownInterval);
    }

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [interstitialTimer, isRewardModalVisible]);

  useEffect(() => {
    const initializeRewardedAd = () => {
      (window as any).googletag = (window as any).googletag || { cmd: [] };
      (window as any).googletag.cmd.push(() => {
        const googletag = (window as any).googletag;
        let rewardedSlot = googletag
          .defineOutOfPageSlot(
            '147246189,22047902240/wifinews.co.za_rewarded',
            googletag.enums.OutOfPageFormat.REWARDED
          )
          .addService(googletag.pubads());
        rewardedSlot.setForceSafeFrame(true);
        googletag.pubads().enableAsyncRendering();
        googletag.enableServices();

        let rewardedSlotReady = false;
        let grantedState = false;

        googletag.pubads().addEventListener('rewardedSlotReady', (evt: any) => {
          rewardedSlotReady = true;
          setIsRewardModalVisible(true);
          const trigger = document.getElementById('rewardModal');
          if (trigger) {
            trigger.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            const watchAdButton = document.getElementById('watchAdBtn');
            const noThanksButton = document.getElementById('noThanksBtn');

            const makeVisibleFn = (e: Event) => {
              evt.makeRewardedVisible();
              e.preventDefault();
              watchAdButton?.removeEventListener('click', makeVisibleFn);
              noThanksButton?.removeEventListener('click', closeModalFn);
              trigger.style.display = 'none';
              document.body.style.overflow = '';
              setIsRewardModalVisible(false);
            };

            const closeModalFn = () => {
              trigger.style.display = 'none';
              document.body.style.overflow = '';
              googletag.destroySlots([rewardedSlot]);
              setIsRewardModalVisible(false);
            };

            watchAdButton?.addEventListener('click', makeVisibleFn);
            noThanksButton?.addEventListener('click', closeModalFn);
          }
        });

        googletag.pubads().addEventListener('rewardedSlotGranted', function () {
          grantedState = true;
          console.log('Rewarded Ad Granted Event');
        });

        googletag
          .pubads()
          .addEventListener('rewardedSlotClosed', (event: any) => {
            const slot = event.slot;
            console.log(
              'Rewarded ad slot',
              slot.getSlotElementId(),
              'has been closed.'
            );
            if (!grantedState) {
              console.log('Rewarded Slot was not granted.');
              window.location.href = appendUtmParams('/cancel');
            } else {
              googletag.destroySlots([rewardedSlot]);
              const utmParams = getUtmParams();
              const redirectUrl = getRedirectUrl(utmParams.utm_medium);
              window.location.href = appendUtmParams(redirectUrl);
            }
          });

        googletag.display(rewardedSlot);
      });
    };

    initializeRewardedAd();
  }, []);

  const cancelPage = () => {
    window.location.href = appendUtmParams('/cancel');
  };

  const handleConnect = () => {
    const utmParams = getUtmParams();
    const redirectUrl = getRedirectUrl(utmParams.utm_medium);
    window.location.href = appendUtmParams(redirectUrl);
  };

  return (
    <>
      <Script id='gpt-rewarded-ad-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || {cmd: []};
        `}
      </Script>

      <Script id='gpt-interstitial-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || {cmd: []};

          googletag.cmd.push(function() {
            const utmParams = ${JSON.stringify(getUtmParams())};
            console.log("interstitial utm params =>",utmParams);

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

            googletag.defineSlot('/22047902240/wifinews/forti_insterstitial', ['fluid',[320,480],[300,250],[300,600]], 'div-gpt-ad-7171086-1')
              .defineSizeMapping(mapping2)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/forti_top320x50', ['fluid',[320,50],[320,100],[300,250],[468,60],[728,90]], 'div-gpt-ad-7171086-2')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/forti_sticky', ['fluid',[320,50],[320,100],[468,60],[728,90]], 'div-gpt-ad-7171086-3')
              .defineSizeMapping(mapping4)
              .addService(googletag.pubads());

            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);
            googletag.enableServices();

            googletag.display('div-gpt-ad-7171086-1');
            googletag.display('div-gpt-ad-7171086-2');
            googletag.display('div-gpt-ad-7171086-3');
          });
        `}
      </Script>

      <div className='flex min-h-screen flex-col items-center px-4 py-4'>
        <div className='mb-5 text-center'>
          <ProgressIndicator currentStep={2} totalSteps={2} />
          <p className='mt-2 text-lg font-semibold text-gray-700'>
            View these ads for{' '}
            <span className='text-xl font-bold text-gray-800'>
              {interstitialTimer} seconds
            </span>
          </p>
        </div>

        <div className='flex justify-center'>
          {isButtonVisible && (
            <button
              type='button'
              className='mb-6 mt-2 flex items-center rounded-lg bg-slate-950 px-6 py-3 font-medium text-white focus:outline-none lg:px-10'
              onClick={handleConnect}
            >
              <FaWifi className='mr-2' /> Connect Now
            </button>
          )}
        </div>

        <div
          className='fixed bottom-0 left-1/2 z-50 -translate-x-1/2 transform'
          style={{ marginBottom: '0px' }}
        >
          <div id='div-gpt-ad-7171086-3' className='mx-auto'></div>
        </div>

        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-7171086-1'></div>
        </div>
        <div className='justifycenter my-4 flex w-full items-center'>
          <div id='div-gpt-ad-7171086-2'></div>
        </div>
        <DiscussionForum />
        <div className='my-10'>
          <NewsWidget />
        </div>
      </div>

      <div
        id='rewardModal'
        className='fixed bottom-0 left-0 right-0 top-0 z-[9000] flex items-center justify-center bg-black bg-opacity-50 p-4'
        style={{
          display: isRewardModalVisible ? 'flex' : 'none',
          paddingBottom: '60px',
        }}
      >
        <div
          className='rounded-lg bg-white p-6 text-center shadow-lg'
          style={{ maxWidth: '500px', maxHeight: '80vh', width: '100%' }}
        >
          <p className='mb-4'>To get free Wi-Fi, you need to watch these ads</p>
          <input
            type='button'
            className='lg_btn my-2 mr-2 cursor-pointer rounded-lg bg-black px-4 py-2 text-white'
            id='watchAdBtn'
            value='Yes, I want free Wi-Fi!'
          />
          <input
            type='button'
            className='btn my-2 cursor-pointer rounded-lg bg-gray-500 px-4 py-2 text-white'
            id='noThanksBtn'
            value='No Thanks'
            onClick={cancelPage}
          />
          <p className='mt-4'>
            I do not want Free Wi-Fi and will remain on this page.
          </p>
        </div>
      </div>
    </>
  );
}

export default Forti_2;
