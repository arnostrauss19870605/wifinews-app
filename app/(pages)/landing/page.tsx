'use client';
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import ProgressIndicator from '@/app/_components/ProgressIndicator';
import Modal from '@/app/_components/Modal'; // Import your Modal component

const Landing: React.FC = () => {
  const [isRewardModalVisible, setIsRewardModalVisible] = useState(false);
  const [isGrantModalVisible, setIsGrantModalVisible] = useState(false); // New state for grant modal
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
          nextPage(); // Navigate to the next page
        } else {
          setLandingTimer(timeLeft);
        }
      }

      updateTimer();
      timerInterval = setInterval(updateTimer, 1000);
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('DOMContentLoaded', () => {
        firstTimer();
      });
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
              setIsRewardModalVisible(true); // Open the modal
              const watchAdButton = document.getElementById('watchAdBtn');
              const noThanksButton = document.getElementById('noThanksBtn');

              const makeVisibleFn = (e) => {
                evt.makeRewardedVisible();
                e.preventDefault();
                watchAdButton?.removeEventListener('click', makeVisibleFn);
                noThanksButton?.removeEventListener('click', closeModalFn);
                setIsRewardModalVisible(false); // Close the modal
              };

              const closeModalFn = () => {
                setIsRewardModalVisible(false); // Close the modal
                googletag.destroySlots([rewardedSlot]);
              };

              watchAdButton?.addEventListener('click', makeVisibleFn);
              noThanksButton?.addEventListener('click', closeModalFn);
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

      {/* Main Content */}
      <div className='flex min-h-screen flex-col items-center justify-center px-4 py-10'>
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
      <Modal
        isOpen={isRewardModalVisible}
        onClose={() => setIsRewardModalVisible(false)}
      >
        <p className='mb-4'>To get free Wi-Fi, you need to watch these ads</p>
        <input
          type='button'
          className='lg_btn mr-2 cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white'
          id='watchAdBtn'
          value='Yes, I want free Wi-Fi!'
        />
        <input
          type='button'
          className='btn cursor-pointer rounded-lg bg-gray-500 px-4 py-2 text-white'
          id='noThanksBtn'
          value='No Thanks'
        />
        <p className='mt-4'>
          I do not want Free Wi-Fi and will remain on this page.
        </p>
      </Modal>

      {/* Grant Modal */}
      <Modal isOpen={isGrantModalVisible} onClose={nextPage}>
        <p id='grantParagraph' className='mb-4'></p>
        <input
          type='button'
          className='btn cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white'
          id='grantCloseBtn'
          value='Close'
          onClick={nextPage}
        />
      </Modal>

      {/* Directly including ads div as in Django implementation */}
      <div
        id='div-gpt-ad-7092085-1'
        style={{ textAlign: 'center', margin: '20px auto' }}
      ></div>
    </>
  );
};

export default Landing;
