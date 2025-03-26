import React from 'react';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'WiFi Coverage Map | WifiNews',
    description:
      'Explore our WiFi coverage using the embedded Google Maps view.',
  };
}

export default function WifiCoveragePage() {
  return (
    <div className='h-screen w-full bg-gray-100'>
      <iframe
        src='https://www.google.com/maps/d/u/0/embed?mid=1wTl1-kHlrgEHPzN3hmDjbS4yyaRW1EU&ehbc=2E312F'
        className='h-full w-full'
        allowFullScreen
        loading='lazy'
      ></iframe>
    </div>
  );
}
