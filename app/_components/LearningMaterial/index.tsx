import { FaBook } from 'react-icons/fa';
import Link from 'next/link';

function LearningMaterial() {
  return (
    <div className='my-10 rounded-lg bg-gray-100 px-4 py-8 text-center shadow-lg'>
      <h2 className='mb-4 text-2xl font-semibold'>Access Learning Material</h2>
      <p className='mb-5 mt-2 text-lg'>
        Discover a wide range of learning resources to help you stay informed
        and educated.
      </p>
      <div className='flex justify-center'>
        <Link href='/learn'>
          <button
            type='button'
            className='flex items-center rounded-lg bg-slate-950 px-4 py-3 font-medium text-white focus:outline-none lg:w-auto lg:px-10'
          >
            <FaBook className='mr-2' /> Learn Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LearningMaterial;
