import DiscussionForum from '@/app/_components/DiscussionForum';
import React from 'react';
import NewsWidget from '@/app/_components/NewsWidget';
import RecentTopicsWidget from '@/app/_components/RecentTopicsWidget';

function Main() {
  return (
    <div>
      <DiscussionForum />
      <RecentTopicsWidget />
      <div className='my-10'>
        <NewsWidget />
      </div>
    </div>
  );
}

export default Main;
