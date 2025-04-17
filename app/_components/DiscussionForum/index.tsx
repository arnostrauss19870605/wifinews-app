import { FaCommentDots } from 'react-icons/fa';
import Link from 'next/link';

function DiscussionForum() {
  return (
    <div className='container my-4 rounded-md bg-white shadow-md'>
      <h2 className='mb-2 text-center text-xl font-semibold'>
        Have Your Say!!
      </h2>
      <p className='my-2 px-2 text-center text-sm'>
        With all the happenings in our country, good and bad, we have created a
        forum where you can discuss these matters with others in your community.
      </p>
      <div className='flex justify-center'>
        <Link href='/topics'>
          <button
            type='button'
            className='mb-4 flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white focus:outline-none'
          >
            <FaCommentDots className='mr-1' /> Join the Discussion
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DiscussionForum;
