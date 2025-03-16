'use client';
import React, { ReactNode } from 'react';

interface AdWrapperProps {
  children: ReactNode;
}

const AdWrapper: React.FC<AdWrapperProps> = ({ children }) => {
  return (
    <div className='relative mt-1 inline-block border'>
      <div className='absolute left-0 top-0 rounded-bl-[4px] bg-white/80 px-[6px] py-[2px] text-[12px] font-thin uppercase text-gray-800'>
        Advertisement
      </div>
      {children}
    </div>
  );
};

export default AdWrapper;
