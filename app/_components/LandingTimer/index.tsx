import React, { useState, useEffect, useRef } from 'react';
import { appendUtmParams } from '@/app/_utils/utm.util';

interface TimerProps {
  isPaused: boolean;
}

const LandingTimer: React.FC<TimerProps> = ({ isPaused }) => {
  const totalTime = 35;
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const futureTimeRef = useRef<Date | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleTimerComplete = () => {
    window.location.href = appendUtmParams('/home');
  };

  // Helper function outside useEffect
  const addSeconds = (numOfSeconds: number, date: Date = new Date()): Date => {
    date.setSeconds(date.getSeconds() + numOfSeconds);
    return date;
  };

  useEffect(() => {
    if (isPaused) {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      return;
    }

    // Set futureTime only if not already set or when unpaused
    if (!futureTimeRef.current) {
      futureTimeRef.current = addSeconds(totalTime);
    }

    const updateTimer = () => {
      const timeDiff = Math.floor(
        (futureTimeRef.current!.getTime() - new Date().getTime()) / 1000
      );

      if (timeDiff <= 0) {
        clearInterval(timerIntervalRef.current!);
        setTimeLeft(0);
        handleTimerComplete();
      } else {
        setTimeLeft(timeDiff);
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

  return <p className='text-xl font-bold text-gray-800'>{timeLeft} seconds</p>;
};

export default LandingTimer;
