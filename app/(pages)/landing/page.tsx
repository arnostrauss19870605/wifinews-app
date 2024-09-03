'use client';
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import ProgressIndicator from '@/app/_components/ProgressIndicator';

function Landing() {
  const [landingTimer, setLandingTimer] = useState(10);

  useEffect(() => {
    // Countdown for landing page
    const landingInterval = setInterval(() => {
      setLandingTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(landingInterval);
  }, []);

  return (
    <>
      {/* Rewarded Ad Script */}
      <Script id='gpt-rewarded-ad-setup' strategy='afterInteractive'>
        {`
          googletag = window.googletag || { cmd: [] };
          const queryValues = window.location.search;
          const urlParams = new URLSearchParams(queryValues);
          var utm_medium = "NULL";

          if (urlParams.has('utm_medium')) {
            utm_medium = urlParams.get('utm_medium');
            console.log("Utm Medium does exist as:", utm_medium);
          } else {
            console.log("Utm Medium does not exist, value to be populated:", utm_medium);
          }

          googletag.cmd.push(() => {
            let rewardedSlot = googletag
              .defineOutOfPageSlot(
                '/22047902240/wifinews.co.za_rewarded',
                googletag.enums.OutOfPageFormat.REWARDED
              )
              .addService(googletag.pubads());

            rewardedSlot.setForceSafeFrame(true);
            googletag.pubads().enableAsyncRendering();
            googletag.enableServices();

            let rewardedSlotReady = false;

            googletag.pubads().addEventListener('rewardedSlotReady', (evt) => {
              rewardedSlotReady = true;
              const trigger = document.getElementById('rewardModal');
              trigger.style.display = 'block';
              const watchAdButton = document.getElementById('watchAdBtn');
              const noThanksButton = document.getElementById('noThanksBtn');

              const makeVisibleFn = (e) => {
                evt.makeRewardedVisible();
                e.preventDefault();
                watchAdButton.removeEventListener('click', makeVisibleFn);
                noThanksButton.removeEventListener('click', closeModalFn);
                trigger.style.display = 'none';
              };

              const closeModalFn = () => {
                trigger.style.display = 'none';
                googletag.destroySlots([rewardedSlot]);
              };

              watchAdButton.addEventListener('click', makeVisibleFn);
              noThanksButton.addEventListener('click', closeModalFn);
            });

            let grantedState = false;
            googletag.pubads().addEventListener('rewardedSlotGranted', function(evt) {
              grantedState = true;
              console.log("Rewarded Add Granted Event");
              setTimeout(function() {
                googletag.destroySlots([rewardedSlot]);
                // Implement your next page logic here
              }, 5000);
            });

            googletag.pubads().addEventListener('rewardedSlotClosed', (event) => {
              const slot = event.slot;
              console.log("Rewarded ad slot", slot.getSlotElementId(), "has been closed.");
              if (!grantedState) {
                console.log('rewardedSlot not granted, redirecting...');
                window.location.href = '/'; // Redirect or handle when ad is closed without granting
              } else {
                googletag.destroySlots([rewardedSlot]);
                window.location.href = '/nextPage'; // Adjust URL as needed
              }
            });

            googletag.display(rewardedSlot);
          });
        `}
      </Script>

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
        className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
        style={{ display: 'none' }}
      >
        <div className='rounded-lg bg-white p-6 text-center shadow-lg'>
          <p className='mb-4'>You are now connected to the internet</p>
          <input
            type='button'
            className='lg_btn mr-2 cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white'
            id='watchAdBtn'
            value='CLICK HERE TO BROWSE'
          />
          <input
            type='button'
            className='btn cursor-pointer rounded-lg bg-gray-500 px-4 py-2 text-white'
            id='noThanksBtn'
            value='No Thanks'
          />
          <p className='mt-4'>I would like to remain on Wifi News.</p>
        </div>
      </div>

      {/* Grant Modal */}
      <div
        id='grantModal'
        className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
        style={{ display: 'none' }}
      >
        <div className='rounded-lg bg-white p-6 text-center shadow-lg'>
          <p id='grantParagraph' className='mb-4'></p>
          <input
            type='button'
            className='btn cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white'
            id='grantCloseBtn'
            value='Close'
            onClick={() => (window.location.href = '/home')}
          />
        </div>
      </div>
    </>
  );
}

export default Landing;
