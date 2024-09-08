'use client';
import React from 'react';
import ConnectWiFi from '@/app/_components/ConnectWiFi';
import LearningMaterial from '@/app/_components/LearningMaterial';
import DiscussionForum from '@/app/_components/DiscussionForum';
import News from '@/app/(pages)/news/page';

function Interstitial() {
  return (
    <>
      <ConnectWiFi
        step={3}
        redirectUrl='https://bobbies.hotspot.yourspot.co.za/lv/login'
        timerDuration={20}
        showButtonAt={10}
        showButton={false}
      />
      <LearningMaterial />
      <DiscussionForum />
      <div className='my-10'>
        <News />
      </div>
    </>
  );
}

export default Interstitial;
