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

type UtmToRedirectMap = {
  [key: string]: string;
};

const utmToRedirectMap: UtmToRedirectMap = {
  NTJ: 'https://cp.fattiengage.com/portal/172.16.255.1',
  Lynnwoodbridge: 'https://cp.fattiengage.com/portal/172.18.255.1',
  MallofAfrica: 'https://cp.fattiengage.com/portal/172.19.255.1',
  DesignQuarter: 'https://cp.fattiengage.com/portal/172.22.255.1',
  PanAfrica: 'https://cp.fattiengage.com/portal/172.23.255.1',
  Brooklyn: 'https://cp.fattiengage.com/portal/172.24.255.1',
  Eikestad: 'https://cp.fattiengage.com/portal/172.25.255.1',
  Zone: 'https://cp.fattiengage.com/portal/172.30.255.1',
  Hillfox: 'https://cp.fattiengage.com/portal/172.31.255.1',
  Pumulani: 'https://cp.fattiengage.com/portal/10.12.255.1',
  Kagiso: 'https://cp.fattiengage.com/portal/10.13.255.1',
  Dobsonville: 'https://cp.fattiengage.com/portal/10.14.255.1',
  Bedford: 'https://cp.fattiengage.com/portal/10.15.255.1',
  Cavendish: 'https://cp.fattiengage.com/portal/10.16.255.1',
  Riverdisde: 'https://cp.fattiengage.com/portal/10.17.255.1',
  Gateway: 'https://cp.fattiengage.com/portal/10.18.255.1',
  Vincentpark: 'https://cp.fattiengage.com/portal/10.19.255.1',
  Eastrandmall: 'https://cp.fattiengage.com/portal/10.21.255.1',
  Soneike: 'https://cp.fattiengage.com/portal/10.22.255.1',
  Aurora: 'https://cp.fattiengage.com/portal/10.23.255.1',
  Kendrige: 'https://cp.fattiengage.com/portal/10.24.255.1',
  Sonstraal: 'https://cp.fattiengage.com/portal/10.25.255.1',
  Habitat: 'https://cp.fattiengage.com/portal/10.26.255.1',
  Boord: 'https://cp.fattiengage.com/portal/10.27.255.1',
  Hermanus: 'https://cp.fattiengage.com/portal/10.28.255.1',
  Vredenburg: 'https://cp.fattiengage.com/portal/10.29.255.1',
  Randridge: 'https://cp.fattiengage.com/portal/10.30.255.1',
  Randburgsquare: 'https://cp.fattiengage.com/portal/10.31.255.1',
  Durbanworkshop: 'https://cp.fattiengage.com/portal/10.32.255.1',
  Bloemfontein: 'https://cp.fattiengage.com/portal/10.34.255.1',
  Atlantis: 'https://cp.fattiengage.com/portal/10.35.255.1',
  Hammersdale: 'https://cp.fattiengage.com/portal/10.36.255.1',
  Queenstown: 'https://cp.fattiengage.com/portal/10.37.255.1',
  Gugulethu: 'https://cp.fattiengage.com/portal/10.38.255.1',
  Mdatsane: 'https://cp.fattiengage.com/portal/10.39.255.1',
  Pinecrest: 'https://cp.fattiengage.com/portal/10.40.255.1',
  Higlandmews: 'https://cp.fattiengage.com/portal/10.41.255.1',
  Maluticrest: 'https://cp.fattiengage.com/portal/10.42.255.1',
  Phoenix: 'https://cp.fattiengage.com/portal/10.43.255.1',
  Moruleng: 'https://cp.fattiengage.com/portal/10.44.255.1',
  Mooirivier: 'https://cp.fattiengage.com/portal/10.46.255.1',
  GardenRoute: 'https://cp.fattiengage.com/portal/10.47.255.1',
  Daveyton: 'https://cp.fattiengage.com/portal/10.48.255.1',
  Balfour: 'https://cp.fattiengage.com/portal/10.49.255.1',
  Zeevenwacht: 'https://cp.fattiengage.com/portal/10.50.255.1',
  'Liberty Park': 'https://cp.fattiengage.com/portal/10.51.255.1',
  Kolonade: 'https://cp.fattiengage.com/portal/10.33.255.1',
  Castelgate: 'https://cp.fattiengage.com/portal/10.45.255.1',
};

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
  const router = useRouter();

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
              const utmParams = getUtmParams();
              const redirectUrl = getRedirectUrl(utmParams.utm_medium);
              window.location.href = appendUtmParams(redirectUrl);
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
    const utmParams = getUtmParams();
    const redirectUrl = getRedirectUrl(utmParams.utm_medium);
    router.push(appendUtmParams(redirectUrl));
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
            Object.entries(utmParams).forEach(([key, value]) => {
              googletag.pubads().setTargeting(key, value);
            });

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

      <div className='flex min-h-screen flex-col items-center px-4 py-10'>
        <div className='mb-5 text-center'>
          <ProgressIndicator currentStep={2} totalSteps={2} />
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

        <div className='fixed bottom-12 left-0 right-0 z-[9999] flex justify-center'>
          <div id='div-gpt-ad-7171086-3' className='w-full max-w-[768px]'></div>
        </div>

        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-7171086-1'></div>
        </div>
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-7171086-2'></div>
        </div>

        <LearningMaterial />
        <DiscussionForum />
        <div className='my-10'>
          <News />
        </div>
      </div>

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

export default Forti_2;
