import RecentTopics from '@/app/_components/RecentTopics';
import staticTopics from '@/app/_data/static-topics';
import React from 'react';

function RecentTopicsWidget() {
  return (
    <div className='mb-2 w-full'>
      <RecentTopics staticTopics={staticTopics} />
    </div>
  );
}

export default RecentTopicsWidget;
