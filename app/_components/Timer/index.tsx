import React, { useState, useEffect } from 'react';

interface TimerProps {
  totalTime: number;
  isPaused: boolean;
  onComplete: () => void;
}

const Timer: React.FC<TimerProps> = ({ totalTime, isPaused, onComplete }) => {
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
        onComplete();
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

export default Timer;
