import { FaCommentDots } from 'react-icons/fa';
import Link from 'next/link';
import RecentTopics from '@/app/_components/RecentTopics';

function DiscussionForum() {
  return (
    <div className='my-10 rounded-lg bg-white shadow-lg'>
      <div className='mb-4 w-full'>
        <RecentTopics />
      </div>
      <h2 className='mb-4 text-center text-2xl font-semibold'>
        Have Your Say!
      </h2>
      <p className='my-4 px-4 text-center text-base'>
        With all the happenings in our country, good and bad, we have created a
        forum where you can have your say and discuss these matters with others
        in your community in an open public forum.
      </p>
      <div className='flex justify-center'>
        <Link href='/topics'>
          <button
            type='button'
            className='mb-12 flex items-center rounded-lg bg-slate-950 px-6 py-3 font-medium text-white focus:outline-none lg:px-10'
          >
            <FaCommentDots className='mr-2' /> Join the Discussion
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DiscussionForum;
