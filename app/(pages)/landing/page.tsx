'use client';
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import ProgressIndicator from '@/app/_components/ProgressIndicator';

const Landing: React.FC = () => {
  const [isRewardModalVisible, setIsRewardModalVisible] = useState(false);
  const [landingTimer, setLandingTimer] = useState(35);

  useEffect(() => {
    const addSeconds = (
      numOfSeconds: number,
      date: Date = new Date()
    ): Date => {
      date.setSeconds(date.getSeconds() + numOfSeconds);
      return date;
    };

    let timerInterval: NodeJS.Timeout;

    const firstTimer = () => {
      const totalTime = 35;
      const futureTime = addSeconds(totalTime);

      function updateTimer() {
        const timeLeft = Math.floor(
          (futureTime.getTime() - new Date().getTime()) / 1000
        );

        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          setLandingTimer(0); // Ensure it reaches zero
        } else {
          setLandingTimer(timeLeft);
        }
      }

      updateTimer();
      timerInterval = setInterval(updateTimer, 1000);
    };

    if (typeof window !== 'undefined') {
      firstTimer();
    }

    return () => clearInterval(timerInterval);
  }, []);

  // Helper functions for navigation
  const nextPage = () => {
    const queryString = window.location.search;
    window.location.assign('/home/' + queryString);
  };

  const cancelPage = () => {
    const queryString = window.location.search;
    window.location.assign('/cancel/' + queryString);
  };

  return (
    <>
      {/* Rewarded Ad Script */}
      <Script id='gpt-rewarded-ad-setup' strategy='beforeInteractive'>
        {`
          googletag = window.googletag || {cmd: []};
          googletag.cmd.push(() => {
            let rewardedSlot = googletag.defineOutOfPageSlot('147246189,22047902240/wifinews.co.za_rewarded', googletag.enums.OutOfPageFormat.REWARDED).addService(googletag.pubads());
            rewardedSlot.setForceSafeFrame(true);
            googletag.pubads().enableAsyncRendering();
            googletag.enableServices();

            let rewardedSlotReady = false;

            googletag.pubads().addEventListener('rewardedSlotReady', (evt) => {
              rewardedSlotReady = true;
              const trigger = document.getElementById('rewardModal');
              if (trigger) {
                trigger.style.display = 'flex'; // Fix to use 'flex' instead of 'block'
                document.body.style.overflow = 'hidden'; // Prevent scrolling

                const watchAdButton = document.getElementById('watchAdBtn');
                const noThanksButton = document.getElementById('noThanksBtn');

                const makeVisibleFn = (e) => {
                  evt.makeRewardedVisible();
                  e.preventDefault();
                  watchAdButton?.removeEventListener('click', makeVisibleFn);
                  noThanksButton?.removeEventListener('click', closeModalFn);
                  trigger.style.display = 'none';
                  document.body.style.overflow = ''; // Restore scrolling
                };

                const closeModalFn = () => {
                  trigger.style.display = 'none';
                  document.body.style.overflow = ''; // Restore scrolling
                  googletag.destroySlots([rewardedSlot]);
                };

                watchAdButton?.addEventListener('click', makeVisibleFn);
                noThanksButton?.addEventListener('click', closeModalFn);
              }
            });

            let grantedState = false;

            googletag.pubads().addEventListener('rewardedSlotGranted', function(evt) {
              grantedState = true;
              console.log("Rewarded Ad Granted Event");
            });

            googletag.pubads().addEventListener("rewardedSlotClosed", (event) => {
              const slot = event.slot;
              console.log("Rewarded ad slot", slot.getSlotElementId(), "has been closed.");
              if (!grantedState) {
                console.log('Rewarded Slot was not granted.');
                cancelPage();
              } else {
                googletag.destroySlots([rewardedSlot]);
                nextPage();
              }
            });

            googletag.display(rewardedSlot);
          });
        `}
      </Script>

      {/* Ad Slots Script */}
      <Script id='gpt-ad-slots' strategy='beforeInteractive'>
        {`
          window.googletag = window.googletag || {cmd: []};

          const my_queryValues = window.location.search;
          const my_urlParams = new URLSearchParams(my_queryValues);
          var utm_medium = "NULL"
          if (my_urlParams.has('utm_medium') === true){
            utm_medium = my_urlParams.get('utm_medium');
            console.log("Utm Medium does exisit as :" ,utm_medium );
          } else {
            console.log("Utm Medium does not exisit exisit, value to be populated : ", utm_medium);
          }

          googletag.cmd.push(function() {
            var mapping1 = googletag.sizeMapping()
            .addSize([1400, 0], [[728, 90], 'fluid'])
            .addSize([1200, 0], [[728, 90], 'fluid'])
            .addSize([1000, 0], [[728, 90], 'fluid'])
            .addSize([700, 0], [[468, 60], [320, 50], [300, 50], 'fluid', [300, 250], [320, 100], [300, 100]])
            .addSize([600, 0], [[468, 60], [320, 50], [300, 50], 'fluid', [300, 100], [320, 100], [300, 250]])
            .addSize([400, 0], [[320, 50], [300, 50], 'fluid', [320, 100], [300, 250], [300, 100]])
            .addSize([300, 0], [[320, 50], [300, 250], [320, 100], [300, 50], [300, 100], 'fluid'])
            .build();

            var mapping2 = googletag.sizeMapping()
            .addSize([1400, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
            .addSize([1200, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
            .addSize([1000, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
            .addSize([700, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
            .addSize([600, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
            .addSize([400, 0], [[300, 250], [300, 600], [320, 480], 'fluid'])
            .addSize([300, 0], [[300, 250], [300, 600], [320, 480], 'fluid'])
            .build();

            var mapping4 = googletag.sizeMapping()
            .addSize([1400, 0], [[728, 90], 'fluid'])
            .addSize([1200, 0], [[728, 90], 'fluid'])
            .addSize([1000, 0], [[728, 90], 'fluid'])
            .addSize([700, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100]])
            .addSize([600, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100]])
            .addSize([400, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100]])
            .addSize([300, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100]])
            .build();

            googletag.defineSlot('/22047902240/wifinews/landing_interstitial', ['fluid',[320,480],[300,250],[300,600]], 'div-gpt-ad-7092085-1')
              .defineSizeMapping(mapping2)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/landing_top320x50', ['fluid',[300,250],[320,50],[320,100],[468,60],[728,90]], 'div-gpt-ad-7092085-2')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/landing_sticky', ['fluid',[320,50],[320,100],[468,60],[728,90]], 'div-gpt-ad-7092085-3')
              .defineSizeMapping(mapping4)
              .addService(googletag.pubads());

            googletag.pubads().enableSingleRequest();
            googletag.pubads().setTargeting('Medium', [utm_medium]);
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);
            googletag.enableServices();
          });
        `}
      </Script>

      {/* Main Content */}
      <div className='flex min-h-screen flex-col items-center px-4 py-10'>
        <div className='mb-5 text-center'>
          <ProgressIndicator step={1} />
          <p className='mt-2 text-lg font-semibold text-gray-700'>
            View these ads for
          </p>
          <p className='text-xl font-bold text-gray-800'>
            {landingTimer} seconds
          </p>
        </div>
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

      {/* Grant Modal */}
      <div
        id='grantModal'
        className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4'
        style={{ display: 'none' }}
      >
        <div
          className='rounded-lg bg-white p-6 text-center shadow-lg'
          style={{ maxWidth: '500px', maxHeight: '80vh', width: '100%' }}
        >
          <p id='grantParagraph' className='mb-4'></p>
          <input
            type='button'
            className='btn cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white'
            id='grantCloseBtn'
            value='Close'
            onClick={nextPage}
          />
        </div>
      </div>

      {/* Ad Slots Divs */}
      <div className='my-4 flex w-full items-center justify-center'>
        <div id='div-gpt-ad-7092085-1'></div>
      </div>
      <div className='my-4 flex w-full items-center justify-center'>
        <div id='div-gpt-ad-7092085-2'></div>
      </div>
      <div className='my-4 flex w-full items-center justify-center'>
        <div id='div-gpt-ad-7092085-3'></div>
      </div>
    </>
  );
};

export default Landing;
