import { FaCommentDots } from 'react-icons/fa';
import Link from 'next/link';
import RecentTopics from '@/app/_components/RecentTopics';
import staticTopics from '@/app/_data/static-topics';

function DiscussionForum() {
  return (
    <div className='container my-4 rounded-md bg-white shadow-md'>
      <div className='mb-3 w-full'>
        <RecentTopics staticTopics={staticTopics} />
      </div>
      <h2 className='mb-2 text-center text-xl font-semibold'>Have Your Say!</h2>
      <p className='my-3 px-3 text-center text-sm'>
        With all the happenings in our country, good and bad, we have created a
        forum where you can discuss these matters with others in your community.
      </p>
      <div className='flex justify-center'>
        <Link href='/topics'>
          <button
            type='button'
            className='mb-8 flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white focus:outline-none'
          >
            <FaCommentDots className='mr-1' /> Join the Discussion
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DiscussionForum;
