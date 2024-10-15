import React, { useState, useEffect, useRef } from 'react';
import { appendUtmParams } from '@/app/_utils/utm.util';

interface TimerProps {
  isPaused: boolean;
}

const LandingTimer: React.FC<TimerProps> = ({ isPaused }) => {
  const totalTime = 35;
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const startTimeRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleTimerComplete = () => {
    window.location.href = appendUtmParams('/home');
  };

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
  }, [isPaused]);

  return <p className='text-xl font-bold text-gray-800'>{timeLeft} seconds</p>;
};

export default LandingTimer;
