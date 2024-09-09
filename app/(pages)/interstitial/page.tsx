'use client';
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import ConnectWiFi from '@/app/_components/ConnectWiFi';
import LearningMaterial from '@/app/_components/LearningMaterial';
import DiscussionForum from '@/app/_components/DiscussionForum';
import News from '@/app/(pages)/news/page';
import { useRouter } from 'next/navigation';

function Interstitial() {
  const [isRewardModalVisible, setIsRewardModalVisible] = useState(false);
  const router = useRouter();
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
            };

            const closeModalFn = () => {
              trigger.style.display = 'none';
              document.body.style.overflow = '';
              googletag.destroySlots([rewardedSlot]);
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
              router.push('/cancel' + window.location.search);
            } else {
              googletag.destroySlots([rewardedSlot]);
              window.location.href =
                'https://bobbies.hotspot.yourspot.co.za/lv/login';
            }
          });

        googletag.display(rewardedSlot);
      });
    };

    initializeRewardedAd();
  }, []);

  const cancelPage = () => {
    router.push('/cancel' + window.location.search);
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
            const queryValues = window.location.search;
            const urlParams = new URLSearchParams(queryValues);
            let utm_medium = "NULL";
            if (urlParams.has('utm_medium')) {
              utm_medium = urlParams.get('utm_medium') || "NULL";
              console.log("Utm Medium exists as:", utm_medium);
            } else {
              console.log("Utm Medium does not exist, value to be populated:", utm_medium);
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
            googletag.pubads().setTargeting('Medium', [utm_medium]);
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);
            googletag.enableServices();

            googletag.display('div-gpt-ad-6110814-1');
            googletag.display('div-gpt-ad-6110814-2');
            googletag.display('div-gpt-ad-6110814-3');
          });
        `}
      </Script>

      <ConnectWiFi
        step={3}
        redirectUrl='https://bobbies.hotspot.yourspot.co.za/lv/login'
        timerDuration={20}
        showButtonAt={10}
        showButton={false}
      />

      {/* Divs for Ad Slots */}
      <div className='my-4 flex w-full items-center justify-center'>
        <div id='div-gpt-ad-6110814-1'></div>
      </div>
      <div className='my-4 flex w-full items-center justify-center'>
        <div id='div-gpt-ad-6110814-2'></div>
      </div>
      <div className='my-4 flex w-full items-center justify-center'>
        <div id='div-gpt-ad-6110814-3'></div>
      </div>

      <LearningMaterial />
      <DiscussionForum />
      <div className='my-10'>
        <News />
      </div>

      {/* Reward Modal */}
      <div
        id='rewardModal'
        className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4'
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
            className='lg_btn mr-2 cursor-pointer rounded-lg bg-black px-4 py-2 text-white'
            id='watchAdBtn'
            value='Yes, I want free Wi-Fi!'
          />
          <input
            type='button'
            className='btn cursor-pointer rounded-lg bg-gray-500 px-4 py-2 text-white'
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
