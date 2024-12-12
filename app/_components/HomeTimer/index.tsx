import React, { useState, useEffect, useRef } from 'react';
import { appendUtmParams } from '@/app/_utils/utm.util';
import ProgressIndicator from '@/app/_components/ProgressIndicator';
import { FaWifi } from 'react-icons/fa';

interface TimerProps {}

const HomeTimer: React.FC<TimerProps> = () => {
  const totalTime = 16;
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const startTimeRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isButtonVisible, setButtonVisible] = useState(false);

  const handleTimerComplete = () => {
    window.location.href = appendUtmParams('/interstitial');
  };

  useEffect(() => {
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

      if (timeRemaining <= 8) {
        setButtonVisible(true);
      }

      if (timeRemaining <= 0) {
        clearInterval(timerIntervalRef.current!);
        setTimeLeft(0);
        handleTimerComplete();
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
  }, []);

  return (
    <>
      <div className='mb-2 text-center'>
        <ProgressIndicator currentStep={2} totalSteps={3} />
        <p className='mt-2 text-lg font-semibold text-gray-700'>
          View these ads for{' '}
          <span className='text-xl font-bold text-gray-800'>
            {timeLeft} seconds
          </span>
        </p>
      </div>

      <div className='mb-2 flex justify-center'>
        {isButtonVisible && (
          <a
            href={appendUtmParams('/interstitial')}
            className='flex items-center rounded-lg bg-slate-950 px-6 py-3 font-medium text-white focus:outline-none lg:px-10'
          >
            <FaWifi className='mr-2' /> Connect Now
          </a>
        )}
      </div>
    </>
  );
};

export default HomeTimer;
