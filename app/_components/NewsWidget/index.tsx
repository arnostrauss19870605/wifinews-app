import featuredArticles from '@/app/_data/featured-articles';
import popularArticles from '@/app/_data/popular-articles';
import { FiArrowRight, FiBookOpen, FiTrendingUp } from 'react-icons/fi';
import React from 'react';

export default function NewsWidget() {
  return (
    <>
      <div className='mx-auto max-w-6xl px-3 py-6'>
        <h1 className='mb-4 text-center text-2xl font-bold'>Featured</h1>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {featuredArticles.map((article) => (
            <div
              key={article.id}
              className='flex h-full flex-col justify-between rounded-md bg-white p-4 shadow transition-shadow duration-300 hover:shadow-md'
            >
              <div>
                <div className='flex items-center text-sm text-gray-500'>
                  <FiBookOpen className='mr-1' />
                  <span>{article.category}</span>
                </div>
                <h2 className='mt-2 text-lg font-semibold'>{article.title}</h2>
                <p className='mt-2 text-sm text-gray-600'>{article.summary}</p>
                <p className='mt-3 text-xs text-blue-500'>{article.source}</p>
              </div>
              <a href={article.link}>
                <button className='mt-3 flex w-full items-center justify-center rounded bg-black px-3 py-2 text-sm text-white transition-colors duration-300 hover:bg-gray-800'>
                  Read More <FiArrowRight className='ml-1' />
                </button>
              </a>
            </div>
          ))}
        </div>

        <div className='mt-12'>
          <h2 className='mb-4 text-center text-lg font-semibold'>
            Popular Readings
          </h2>
          <div className='space-y-4'>
            {popularArticles.map((article) => (
              <div
                key={article.id}
                className='flex flex-col justify-between rounded-md bg-white p-3 shadow transition-shadow duration-300 hover:shadow-sm sm:flex-row sm:items-center'
              >
                <div className='flex-1'>
                  <h4 className='text-sm font-medium'>{article.title}</h4>
                  <hr className='my-2 border-gray-300' />
                  <p className='text-xs text-gray-500'>{article.type}</p>
                </div>
                <a href={article.link}>
                  <div className='mt-3 flex items-center text-black hover:text-gray-700 sm:ml-3 sm:mt-0'>
                    <span className='text-sm font-semibold'>Read More</span>
                    <FiTrendingUp className='text-md ml-1' />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
