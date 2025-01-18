import { FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center pb-72'>
      <div className='flex flex-col items-center justify-center text-center'>
        <FaExclamationTriangle className='mb-4 text-6xl text-red-500' />
        <h1 className='mb-2 text-4xl font-bold text-gray-800'>
          Page Not Found
        </h1>
        <p className='mb-6 text-lg text-gray-600'>
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          href='/'
          className='rounded-lg bg-black px-6 py-2 text-white shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
