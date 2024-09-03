'use client';
import React from 'react';
import ConnectWiFi from '@/app/_components/ConnectWiFi';
import LearningMaterial from '@/app/_components/LearningMaterial';
import DiscussionForum from '@/app/_components/DiscussionForum';
import News from '@/app/(pages)/news/page';

function Home() {
  return (
    <>
      <ConnectWiFi
        step={2}
        redirectUrl='/interstitial'
        timerDuration={10}
        showButtonAt={6}
        showButton={true}
      />
      <LearningMaterial />
      <DiscussionForum />
      <div className='my-10'>
        <News />
      </div>
    </>
  );
}

export default Home;
