'use client';
import React, { useState, useEffect } from 'react';
import AdSection from '@/app/_components/Ads/AdSection';
import ProgressIndicator from '@/app/_components/ProgressIndicator';
import Modal from '@/app/_components/Modal';

function Landing() {
  const [isFirstModalOpen, setFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setSecondModalOpen] = useState(false);
  const [landingTimer, setLandingTimer] = useState(10);
  const [modalTimer, setModalTimer] = useState(5);

  useEffect(() => {
    // Countdown for landing page
    const landingInterval = setInterval(() => {
      setLandingTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Open the first modal after the landing timer reaches 0
    if (landingTimer === 0) {
      setFirstModalOpen(true);
      clearInterval(landingInterval);
    }

    return () => clearInterval(landingInterval);
  }, [landingTimer]);

  useEffect(() => {
    let countdownInterval: any;
    if (isSecondModalOpen) {
      // Set up countdown for the second modal
      countdownInterval = setInterval(() => {
        setModalTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      // Redirect when modal timer reaches 0
      if (modalTimer === 0) {
        clearInterval(countdownInterval);
        setSecondModalOpen(false);
        window.location.replace('/home');
      }
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [isSecondModalOpen, modalTimer]);

  const handleFirstModalYes = () => {
    setFirstModalOpen(false);
    setSecondModalOpen(true);
    setModalTimer(5); // Reset timer for the second modal
  };

  const handleRedirect = () => {
    setFirstModalOpen(false);
    setSecondModalOpen(false);
    window.location.replace('/cancel');
  };

  return (
    <div className='flex min-h-screen flex-col px-4 py-10'>
      <div className='mb-5 text-center'>
        <ProgressIndicator step={1} />
        <p className='mt-2 text-lg font-semibold text-gray-700'>
          View these ads for
        </p>
        <p className='text-xl font-bold text-gray-800'>
          {landingTimer} seconds
        </p>
      </div>
      <AdSection />

      {/* First Modal */}
      <Modal
        isOpen={isFirstModalOpen}
        onClose={() => setFirstModalOpen(false)}
        isClosable={true}
      >
        <p className='my-5 text-center text-xl font-semibold text-gray-800'>
          To get free Wi-Fi, you need to watch these ads
        </p>

        <div className='my-5 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
          <button
            type='button'
            className='w-full rounded-lg bg-slate-950 px-6 py-3 text-white transition duration-300 ease-in-out hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-400 focus:ring-opacity-50 sm:w-auto'
            onClick={handleFirstModalYes}
          >
            Yes, I want free Wi-Fi
          </button>
          <button
            type='button'
            className='w-full rounded-lg bg-slate-950 px-4 py-3 text-sm text-white transition duration-300 ease-in-out hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-400 focus:ring-opacity-50 sm:w-auto'
            onClick={handleRedirect}
          >
            No, Thank you
          </button>
        </div>

        <p className='my-5 text-center text-sm text-gray-600'>
          I don&apos;t want Free Wi-Fi and will remain on this page.
        </p>
        <p className='text-right font-semibold text-gray-700'>Step 1 of 3</p>
      </Modal>

      {/* Second Modal */}
      <Modal
        isOpen={isSecondModalOpen}
        onClose={() => {}}
        isClosable={false}
        key='ad-modal'
      >
        <p className='my-5 text-center text-xl font-semibold text-gray-800'>
          Please wait while we connect you...
        </p>
        <AdSection />
        <p className='text-center font-semibold text-gray-700'>
          Time remaining: {modalTimer} seconds
        </p>
      </Modal>
    </div>
  );
}

export default Landing;
