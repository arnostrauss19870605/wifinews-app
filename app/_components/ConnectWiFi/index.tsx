import React, { useState, useEffect } from 'react';
import { FaWifi } from 'react-icons/fa';
import ProgressIndicator from '@/app/_components/ProgressIndicator';
import { useRouter } from 'next/navigation';

type ConnectWiFiProps = {
  step: number;
  redirectUrl: string;
  timerDuration: number;
  showButtonAt: number;
  showButton: boolean;
};

function ConnectWiFi({
  step,
  redirectUrl,
  timerDuration,
  showButtonAt,
  showButton,
}: ConnectWiFiProps) {
  const [timer, setTimer] = useState(timerDuration);
  const [isButtonVisible, setButtonVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (showButton && timer === showButtonAt) {
      setButtonVisible(true);
    }

    if (timer === 0) {
      clearInterval(countdownInterval);
      router.push(redirectUrl);
    }

    return () => clearInterval(countdownInterval);
  }, [timer, redirectUrl, showButton, showButtonAt, router]);

  const handleConnect = () => {
    router.push(redirectUrl);
  };

  return (
    <>
      <div className='mb-5'>
        <ProgressIndicator step={step} />
      </div>
      <div className='my-10 text-center'>
        <h2 className='mb-4 text-2xl font-semibold'>Connect to WiFi</h2>
        <p className='mb-4 text-lg font-medium text-gray-700'>
          Time remaining: {timer} seconds
        </p>
        <div className='flex justify-center'>
          {showButton && isButtonVisible && (
            <button
              type='button'
              className='flex items-center rounded-lg bg-slate-950 px-6 py-3 font-medium text-white focus:outline-none lg:px-10'
              onClick={handleConnect}
            >
              <FaWifi className='mr-2' /> Connect Now
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ConnectWiFi;
