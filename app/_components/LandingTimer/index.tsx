import React, { useState, useEffect } from 'react';
import { appendUtmParams } from '@/app/_utils/utm.util';

interface TimerProps {
  isPaused: boolean;
}

const LandingTimer: React.FC<TimerProps> = ({ isPaused }) => {
  const totalTime = 35;
  const handleTimerComplete = () => {
    window.location.href = appendUtmParams('/home');
  };

  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (isPaused) return;

    const addSeconds = (
      numOfSeconds: number,
      date: Date = new Date()
    ): Date => {
      date.setSeconds(date.getSeconds() + numOfSeconds);
      return date;
    };

    let timerInterval: NodeJS.Timeout;
    const futureTime = addSeconds(totalTime);

    const updateTimer = () => {
      const timeLeft = Math.floor(
        (futureTime.getTime() - new Date().getTime()) / 1000
      );

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        setTimeLeft(0);
        handleTimerComplete();
      } else {
        setTimeLeft(timeLeft);
      }
    };

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, [totalTime, isPaused]);

  return <p className='text-xl font-bold text-gray-800'>{timeLeft} seconds</p>;
};

export default LandingTimer;
