import featuredArticles from '@/app/_data/featured-articles';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function News() {
  return (
    <div className='mx-auto max-w-6xl px-4 py-8'>
      <h1 className='mb-6 text-3xl font-bold'>Featured</h1>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        {featuredArticles.map((article) => (
          <div
            key={article.id}
            className='flex h-full flex-col justify-between rounded-lg bg-white p-6 shadow'
          >
            <div>
              <p className='text-sm text-gray-500'>{article.category}</p>
              <h2 className='mt-2 text-xl font-semibold'>{article.title}</h2>
              <p className='mt-2 text-gray-600'>{article.summary}</p>
              <p className='mt-4 text-sm text-blue-500'>{article.source}</p>
            </div>
            <Link href={'/'}>
              <button className='mt-4 w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-800'>
                Read More
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div className='mt-16'>
        <h2 className='mb-6 text-xl font-semibold'>Popular Readings</h2>
        <div className='space-y-6'>
          {featuredArticles.map((article) => (
            <div
              key={article.id}
              className='flex items-center justify-between rounded-lg bg-white p-4 shadow'
            >
              <div>
                <h4 className='text-md font-medium'>{article.title}</h4>
                <hr className='my-2 border-gray-300' />
                <p className='text-sm text-gray-500'>{article.source}</p>
              </div>
              <Link href={'/'}>
                <div className='flex items-center text-black hover:text-gray-700'>
                  <span className='text-sm font-semibold'>Read More</span>
                  <FiArrowRight className='ml-2 text-lg' />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
