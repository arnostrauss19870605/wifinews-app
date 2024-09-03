'use client';
import React, { useState, useEffect } from 'react';
import ProgressIndicator from '@/app/_components/ProgressIndicator';
import RewardedAdComponent from '@/app/_components/RewardedAdComponent';

function Landing() {
  const [landingTimer, setLandingTimer] = useState(10);

  useEffect(() => {
    // Countdown for landing page
    const landingInterval = setInterval(() => {
      setLandingTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(landingInterval);
  }, [landingTimer]);

  return (
    <>
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
      </div>
      <RewardedAdComponent />
    </>
  );
}

export default Landing;
