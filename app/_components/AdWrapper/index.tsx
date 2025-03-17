'use client';
import React, { ReactNode, useEffect, useState, useRef } from 'react';

interface AdWrapperProps {
  children?: ReactNode;
}

const AdWrapper: React.FC<AdWrapperProps> = ({ children }) => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adContainerRef.current) return;
    const checkAdContent = () => {
      if (adContainerRef.current?.childNodes.length) {
        setIsAdLoaded(true);
      } else {
        setIsAdLoaded(false);
      }
    };

    const observer = new MutationObserver(() => {
      checkAdContent();
    });

    observer.observe(adContainerRef.current, {
      childList: true,
      subtree: true,
    });

    checkAdContent();

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className='pt-7] relative my-2 flex w-full items-center justify-center'
      ref={adContainerRef}
    >
      {isAdLoaded && (
        <div className='absolute left-0 top-0 rounded-bl-[4px] bg-white/80 px-[6px] py-[2px] text-[12px] font-thin uppercase text-gray-800'>
          Advertisement
        </div>
      )}
      {children}
    </div>
  );
};

export default AdWrapper;
