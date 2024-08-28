'use client';
import React, { useState } from 'react';
import AdSection from '@/app/_components/Ads/AdSection';
import ProgressIndicator from '@/app/_components/ProgressIndicator';
import Modal from '@/app/_components/Modal';

function Landing() {
  const [isFirstModalOpen, setFirstModalOpen] = useState(true);
  const [isSecondModalOpen, setSecondModalOpen] = useState(false);

  const closeFirstModal = () => {
    setFirstModalOpen(false);
    setSecondModalOpen(true);
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
        <p className='text-xl font-bold text-gray-800'>32 seconds</p>
      </div>
      <AdSection />

      {/* First Modal */}
      <Modal isOpen={isFirstModalOpen} onClose={closeFirstModal}>
        <p className='my-5 text-center text-xl font-semibold text-gray-800'>
          To get free Wi-Fi, you need to watch these ads
        </p>

        <div className='my-5 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
          <button
            type='button'
            className='w-full rounded-lg bg-slate-950 px-6 py-3 text-white transition duration-300 ease-in-out hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-400 focus:ring-opacity-50 sm:w-auto'
            onClick={closeFirstModal}
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
        onClose={() => setSecondModalOpen(false)}
        key='ad-modal'
      >
        <AdSection />
      </Modal>
    </div>
  );
}

export default Landing;
