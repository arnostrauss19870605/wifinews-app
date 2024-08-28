"use client";

import React, { useState } from 'react';

import AdSection from '@/app/_components/Ads/AdSection';
import ProgressIndicator from '@/app/_components/ProgressIndicator';
import Modal from '@/app/_components/Modal';

function Landing() {
  
  const [isFirstModalOpen, setFirstModalOpen] = useState(true);
  const [isSecondModalOpen, setSecondModalOpen] = useState(false);

  const closeFirstModal = () => {
    setFirstModalOpen(false);
    setSecondModalOpen(true); // Open the second modal after closing the first
  };

  const handleRedirect = () => {
    setFirstModalOpen(false);
    setSecondModalOpen(false);
    window.location.replace('/no-thankyou');
  };

  return (
    <>
      <div className='mb-5'>
        <ProgressIndicator />
        <p className='text-center'>view these ads for</p>
        <p className='text-center'>32 seconds</p>
      </div>
      <AdSection />

      {/* First Modal */}
      <Modal isOpen={isFirstModalOpen} onClose={closeFirstModal}>
        <p className='text-center my-5 text-xl'>To get free Wi-fi you need to watch these ads</p>

        <div className='flex justify-between my-5'>
          <button 
            type='button' 
            className='rounded-lg text-md bg-slate-950 px-4 py-3 text-white focus:outline-none lg:w-auto lg:px-10'
            onClick={closeFirstModal}
          >
            Yes, I want free Wifi
          </button>
          <button 
            type='button' 
            className='text-xs rounded-lg bg-slate-950 px-2 py-2 text-white focus:outline-none'
            onClick={handleRedirect}
          >
            No, Thank you
          </button>
        </div>

        <p className='text-sm text-center my-5'>I don&apos;t want Free Wi-fi and will remain on this page.</p>
        <p className='text-right font-semibold'>Step 1 of 3</p>
      </Modal>

      {/* Second Modal */}
      <Modal isOpen={isSecondModalOpen} onClose={() => setSecondModalOpen(false)} key={'ad-modal'}>
        <AdSection />
      </Modal>
    </>
  );
}

export default Landing;
