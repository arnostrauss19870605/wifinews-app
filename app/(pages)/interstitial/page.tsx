'use client';
import React from 'react';
import ConnectWiFi from '@/app/_components/ConnectWiFi';
import LearningMaterial from '@/app/_components/LearningMaterial';
import DiscussionForum from '@/app/_components/DiscussionForum';
import AdSection from '@/app/_components/Ads/AdSection';
import News from '@/app/(pages)/news/page';

function Interstitial() {
  return (
    <>
      <ConnectWiFi
        step={3}
        redirectUrl='https://bobbies.hotspot.yourspot.co.za/lv/login'
        timerDuration={10}
        showButtonAt={10}
        showButton={false}
      />
      <AdSection />
      <LearningMaterial />
      <AdSection />
      <DiscussionForum />
      <AdSection />
      <div className='my-10'>
        <News />
      </div>
    </>
  );
}

export default Interstitial;
