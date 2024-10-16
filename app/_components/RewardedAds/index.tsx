'use client';

import React, { useState, useEffect, useRef } from 'react';
import { appendUtmParams, getUtmParams } from '@/app/_utils/utm.util';

interface RewardedAdsProps {
  onPause: (pause: boolean) => void;
  onPage: 'landing' | 'interstitial';
}

const RewardedAds: React.FC<RewardedAdsProps> = ({ onPause, onPage }) => {
  const [isRewardModalVisible, setIsRewardModalVisible] = useState(false);
  const pauseTriggered = useRef(false);

  useEffect(() => {
    if (isRewardModalVisible && !pauseTriggered.current) {
      onPause(true);
      pauseTriggered.current = true;
    }

    if (!isRewardModalVisible && pauseTriggered.current) {
      onPause(false);
      pauseTriggered.current = false;
    }
  }, [isRewardModalVisible, onPause]);

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

        let grantedState = false;

        googletag.pubads().addEventListener('rewardedSlotReady', (evt: any) => {
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

        googletag.pubads().addEventListener('rewardedSlotGranted', () => {
          grantedState = true;
        });

        googletag
          .pubads()
          .addEventListener('rewardedSlotClosed', (event: any) => {
            const slot = event.slot;
            if (!grantedState) {
              window.location.href = appendUtmParams('/cancel');
            } else {
              googletag.destroySlots([rewardedSlot]);
              if (onPage === 'landing') {
                window.location.href = appendUtmParams('/home');
              }
              if (onPage === 'interstitial') {
                window.location.href = appendUtmParams(
                  'https://bobbies.hotspot.yourspot.co.za/lv/login'
                );
              }
            }
          });

        googletag.display(rewardedSlot);
      });
    };

    initializeRewardedAd();
  }, [onPage]);

  const cancelPage = () => {
    window.location.href = appendUtmParams('/cancel');
  };

  return (
    <>
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
};

export default RewardedAds;
