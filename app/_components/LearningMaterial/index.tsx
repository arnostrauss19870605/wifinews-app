import { FaBook } from 'react-icons/fa';
import Link from 'next/link';

function LearningMaterial() {
  return (
    <div className='my-4 w-full rounded-md bg-gray-100 px-3 py-4 text-center shadow-md'>
      <h2 className='mb-2 text-xl font-semibold'>Access Learning Material</h2>
      <p className='mb-3 text-sm'>
        Discover a wide range of learning resources to help you stay informed
        and educated.
      </p>
      <div className='flex justify-center'>
        <Link href='/learn'>
          <button
            type='button'
            className='flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white focus:outline-none'
          >
            <FaBook className='mr-1' /> Learn Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LearningMaterial;
