'use client';
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import ProgressIndicator from '@/app/_components/ProgressIndicator';
import LearningMaterial from '@/app/_components/LearningMaterial';
import DiscussionForum from '@/app/_components/DiscussionForum';
import News from '@/app/(pages)/news/page';
import { getUtmParams, appendUtmParams } from '@/app/_utils/utm.util';
import { FaWifi } from 'react-icons/fa';

function Interstitial() {
  const [isRewardModalVisible, setIsRewardModalVisible] = useState(false);
  const [interstitialTimer, setInterstitialTimer] = useState(20); // Set initial timer to 20 seconds
  const [isButtonVisible, setButtonVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout | null = null;

    if (!isRewardModalVisible) {
      countdownInterval = setInterval(() => {
        setInterstitialTimer((prevTimer) => {
          if (prevTimer > 0) {
            const newTime = prevTimer - 1;
            if (newTime <= 0) {
              // Show button when 10 seconds or less remain
              setButtonVisible(true);
            }
            return newTime;
          }
          return 0;
        });
      }, 1000);
    }

    if (interstitialTimer === 0) {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    }

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [interstitialTimer, router, isRewardModalVisible]);

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
              router.push(appendUtmParams('/cancel'));
            } else {
              googletag.destroySlots([rewardedSlot]);
              window.location.href = appendUtmParams(
                'https://bobbies.hotspot.yourspot.co.za/lv/login'
              );
            }
          });

        googletag.display(rewardedSlot);
      });
    };

    initializeRewardedAd();
  }, [router]);

  const cancelPage = () => {
    router.push(appendUtmParams('/cancel'));
  };

  const handleConnect = () => {
    router.push(
      appendUtmParams('https://bobbies.hotspot.yourspot.co.za/lv/login')
    );
  };

  return (
    <>
      {/* Existing GPT Setup for Rewarded Ads */}
      <Script id='gpt-rewarded-ad-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || {cmd: []};
        `}
      </Script>

      {/* Updated GPT Tag Script Integration */}
      <Script id='gpt-interstitial-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || {cmd: []};

          googletag.cmd.push(function() {
            const utmParams = ${JSON.stringify(getUtmParams())};
            console.log("interstitial utm params =>",utmParams);

      // Set the targeting key for Medium as requested by the client
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

            googletag.defineSlot('/22047902240/wifinews/interstitial', ['fluid',[320,480],[300,250],[300,600]], 'div-gpt-ad-6110814-1')
              .defineSizeMapping(mapping2)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/interstitial_1_320x50', ['fluid',[320,50],[320,100],[300,250],[468,60],[728,90]], 'div-gpt-ad-6110814-2')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/interstitial1_sticky', ['fluid',[320,50],[320,100],[468,60],[728,90]], 'div-gpt-ad-6110814-3')
              .defineSizeMapping(mapping4)
              .addService(googletag.pubads());

            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);
            googletag.enableServices();

            googletag.display('div-gpt-ad-6110814-1');
            googletag.display('div-gpt-ad-6110814-2');
            googletag.display('div-gpt-ad-6110814-3');
          });
        `}
      </Script>

      <div className='flex min-h-screen flex-col items-center px-4 py-10'>
        <div className='mb-5 text-center'>
          <ProgressIndicator currentStep={3} totalSteps={3} />
          <p className='mt-2 text-lg font-semibold text-gray-700'>
            View these ads for
          </p>
          <p className='text-xl font-bold text-gray-800'>
            {interstitialTimer} seconds
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

        {/* Sticky Ad */}
        <div className='fixed bottom-12 left-0 right-0 z-[9999] flex justify-center'>
          <div id='div-gpt-ad-6110814-3' className='w-full max-w-[768px]'></div>
        </div>

        {/* Divs for Ad Slots */}
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6110814-1'></div>
        </div>
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6110814-2'></div>
        </div>

        <LearningMaterial />
        <DiscussionForum />
        <div className='my-10'>
          <News />
        </div>
      </div>

      {/* Reward Modal */}
      <div
        id='rewardModal'
        className='fixed inset-0 z-[9000] flex items-center justify-center bg-black bg-opacity-50 p-4'
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

export default Interstitial;
