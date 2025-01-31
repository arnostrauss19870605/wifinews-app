import React, { useState, useEffect, useRef } from 'react';
import { appendUtmParams } from '@/app/_utils/utm.util';
import ProgressIndicator from '@/app/_components/ProgressIndicator';
import { FaWifi } from 'react-icons/fa';

interface TimerProps {
  isPaused: boolean;
}

const InterstitialTimer: React.FC<TimerProps> = ({ isPaused }) => {
  const totalTime = 20;
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const startTimeRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isButtonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    if (isPaused) {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      return;
    }

    if (!startTimeRef.current || !endTimeRef.current) {
      startTimeRef.current = Date.now();
      endTimeRef.current = startTimeRef.current + totalTime * 1000;
    }

    const updateTimer = () => {
      const currentTime = Date.now();
      const timeRemaining = Math.max(
        0,
        Math.floor((endTimeRef.current! - currentTime) / 1000)
      );

      if (timeRemaining <= 0) {
        clearInterval(timerIntervalRef.current!);
        setTimeLeft(0);
        setButtonVisible(true);
      } else {
        setTimeLeft(timeRemaining);
      }
    };

    updateTimer();

    timerIntervalRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isPaused]);

  const handleConnect = () => {
    window.location.href = appendUtmParams(
      'https://bobbies.hotspot.yourspot.co.za/lv/login'
    );
  };

  return (
    <>
      <div className='mb-5 text-center'>
        <ProgressIndicator currentStep={3} totalSteps={3} />
        <p className='mt-2 text-lg font-semibold text-gray-700'>
          View these ads for
        </p>
        <p className='text-xl font-bold text-gray-800'>{timeLeft} seconds</p>
      </div>

      <div className='mb-4 flex justify-center'>
        {isButtonVisible && (
          <button
            onClick={handleConnect}
            className='flex items-center rounded-lg bg-slate-950 px-6 py-3 font-medium text-white focus:outline-none lg:px-10'
          >
            <FaWifi className='mr-2' /> Connect Now
          </button>
        )}
      </div>
    </>
  );
};

export default InterstitialTimer;
