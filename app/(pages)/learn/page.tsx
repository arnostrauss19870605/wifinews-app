'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineSearch, AiOutlineArrowRight } from 'react-icons/ai';
import {
  FaBriefcase,
  FaLaptopCode,
  FaHeartbeat,
  FaLanguage,
  FaChalkboardTeacher,
  FaUserAlt,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortAmountUp,
  FaSortAmountDown,
} from 'react-icons/fa';
import Script from 'next/script';
import { getUtmParams } from '@/app/_utils/utm.util';

interface Translation {
  name: string;
  locale: string;
}

interface Category {
  id: number;
  parent_id: number | null;
  code: string;
  courses_count: number;
  translations: Translation[];
  created_at: string;
  updated_at: string;
}

interface CategoriesResponse {
  data: Category[];
}

const getCategoryIcon = (categoryName: string) => {
  switch (categoryName.toLowerCase()) {
    case 'business':
      return <FaBriefcase size={30} />;
    case 'it':
      return <FaLaptopCode size={30} />;
    case 'health':
      return <FaHeartbeat size={30} />;
    case 'language':
      return <FaLanguage size={30} />;
    case 'teaching & academics':
      return <FaChalkboardTeacher size={30} />;
    case 'personal development':
      return <FaUserAlt size={30} />;
    default:
      return <FaBriefcase size={30} />;
  }
};

const SkeletonCard = () => (
  <div className='flex h-[180px] w-full animate-pulse flex-col items-center justify-center rounded-lg border border-gray-300 bg-gray-200 p-4'>
    <div className='mb-4 h-12 w-12 rounded-full bg-gray-300'></div>
    <div className='mb-2 h-4 w-3/4 rounded bg-gray-300'></div>
    <div className='h-4 w-1/2 rounded bg-gray-300'></div>
  </div>
);

function Learn() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<
    'name-asc' | 'name-desc' | 'courses-asc' | 'courses-desc'
  >('name-asc');
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/categories`
        );
        const data: CategoriesResponse = await response.json();
        setCategories(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleSort = (categories: Category[]): Category[] => {
    return categories.sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.translations[0].name.localeCompare(b.translations[0].name);
      } else if (sortBy === 'name-desc') {
        return b.translations[0].name.localeCompare(a.translations[0].name);
      } else if (sortBy === 'courses-asc') {
        return a.courses_count - b.courses_count;
      } else if (sortBy === 'courses-desc') {
        return b.courses_count - a.courses_count;
      }
      return 0;
    });
  };

  const filteredCategories = handleSort(
    categories
      .filter((category) => category.courses_count > 0)
      .filter((category) =>
        category.translations[0].name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
  );

  const handleCardClick = (code: string) => {
    router.push(`/courses/${code}`);
  };

  return (
    <>
      {/* GPT Configuration and Ad Display */}
      <Script id='gpt-home-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || { cmd: [] };

          window.googletag.cmd.push(function () {
            const utmParams = ${JSON.stringify(getUtmParams())};
            console.log("homepage utm params =>",utmParams);

      // Set the targeting key for Medium as requested by the client
      if (utmParams['Medium']) {
        googletag.pubads().setTargeting('Medium', utmParams['Medium']);
      }

            // Define size mappings
            const mapping1 = googletag.sizeMapping()
              .addSize([1400, 0], [[728, 90], 'fluid'])
              .addSize([1200, 0], [[728, 90], 'fluid'])
              .addSize([1000, 0], [[728, 90], 'fluid'])
              .addSize([700, 0], [[468, 60], [320, 50], [300, 50], 'fluid', [300, 250], [320, 100], [300, 100]])
              .addSize([600, 0], [[468, 60], [320, 50], [300, 50], 'fluid', [300, 100], [320, 100], [300, 250]])
              .addSize([400, 0], [[320, 50], [300, 50], 'fluid', [320, 100], [300, 250], [300, 100]])
              .addSize([300, 0], [[320, 50], [300, 250], [320, 100], [300, 50], [300, 100], 'fluid'])
              .build();

            const mapping3 = googletag.sizeMapping()
              .addSize([1400, 0], ['fluid', [728, 90], [300, 250], [300, 600], [468, 60]])
              .addSize([1200, 0], ['fluid', [728, 90], [468, 60], [300, 250], [300, 600]])
              .addSize([1000, 0], ['fluid', [728, 90], [468, 60], [300, 250], [300, 600]])
              .addSize([700, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100], [300, 250], [300, 600]])
              .addSize([600, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100], [300, 250], [300, 600]])
              .addSize([400, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100], [300, 250], [300, 600]])
              .addSize([300, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100], [300, 250], [300, 600]])
              .build();

            const mapping4 = googletag.sizeMapping()
              .addSize([1400, 0], [[728, 90], 'fluid'])
              .addSize([1200, 0], [[728, 90], 'fluid'])
              .addSize([1000, 0], [[728, 90], 'fluid'])
              .addSize([700, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100], [300, 250]])
              .addSize([600, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100], [300, 250]])
              .addSize([400, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100], [300, 250]])
              .addSize([300, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100], [300, 250]])
              .build();

            // Define ad slots and display them
            googletag.defineSlot('/22047902240/wifinews/homepage_top_leaderboard', ['fluid', [320, 100], [320, 50], [300, 250], [468, 60], [728, 90]], 'div-gpt-ad-6641866-1')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/homepage_mpu_hpa', ['fluid', [300, 250], [300, 600], [320, 50], [320, 100], [468, 60], [728, 90]], 'div-gpt-ad-6641866-2')
              .defineSizeMapping(mapping3)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/homepage_mpu_hpa_2', ['fluid', [300, 250], [300, 600], [320, 50], [320, 100], [468, 60], [728, 90]], 'div-gpt-ad-6641866-3')
              .defineSizeMapping(mapping3)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/Homepage_bottom_1', ['fluid', [300, 250], [320, 100], [320, 50], [468, 60], [728, 90]], 'div-gpt-ad-6641866-4')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/Homepage_bottom_2', ['fluid', [300, 250], [320, 50], [320, 100], [468, 60], [728, 90]], 'div-gpt-ad-6641866-5')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/homepage_sticky', ['fluid', [320, 50], [320, 100], [300, 250], [468, 60], [728, 90]], 'div-gpt-ad-6641866-6')
              .defineSizeMapping(mapping4)
              .addService(googletag.pubads());

            // Enable services and set targeting
            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);
            googletag.enableServices();

            // Display the ad slots
            googletag.display('div-gpt-ad-6641866-1');
            googletag.display('div-gpt-ad-6641866-2');
            googletag.display('div-gpt-ad-6641866-3');
            googletag.display('div-gpt-ad-6641866-4');
            googletag.display('div-gpt-ad-6641866-5');
            googletag.display('div-gpt-ad-6641866-6');
          });
        `}
      </Script>
      <div
        className='flex flex-col items-center justify-center p-4'
        style={{ minHeight: 'calc(100vh - 200px)' }}
      >
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6641866-1'></div>
        </div>
        <div className='mb-6 flex w-full max-w-2xl items-center'>
          <div className='relative w-full'>
            <input
              type='text'
              className='w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-black focus:outline-none'
              placeholder='Search categories...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <AiOutlineSearch
              className='absolute left-3 top-2 text-gray-500'
              size={24}
            />
          </div>

          <div className='ml-4 flex space-x-2'>
            <button
              className={`rounded border p-2 ${sortBy === 'name-asc' ? 'bg-gray-200' : ''}`}
              onClick={() => setSortBy('name-asc')}
            >
              <FaSortAlphaDown size={20} title='Sort by Name (A-Z)' />
            </button>
            <button
              className={`rounded border p-2 ${sortBy === 'name-desc' ? 'bg-gray-200' : ''}`}
              onClick={() => setSortBy('name-desc')}
            >
              <FaSortAlphaUp size={20} title='Sort by Name (Z-A)' />
            </button>
            <button
              className={`rounded border p-2 ${sortBy === 'courses-asc' ? 'bg-gray-200' : ''}`}
              onClick={() => setSortBy('courses-asc')}
            >
              <FaSortAmountUp size={20} title='Sort by Courses (Low to High)' />
            </button>
            <button
              className={`rounded border p-2 ${sortBy === 'courses-desc' ? 'bg-gray-200' : ''}`}
              onClick={() => setSortBy('courses-desc')}
            >
              <FaSortAmountDown
                size={20}
                title='Sort by Courses (High to Low)'
              />
            </button>
          </div>
        </div>

        <div className='grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCardClick(category.code)}
                className='h-[180px] w-full transform cursor-pointer rounded-lg border border-gray-300 bg-white p-4 text-center shadow-sm transition-transform hover:scale-105'
              >
                <div className='mb-4 flex items-center justify-center'>
                  {getCategoryIcon(category.translations[0].name)}
                </div>
                <h3 className='mb-2 text-base font-semibold text-black'>
                  {category.translations[0].name}
                </h3>
                <hr className='my-2 border-t border-gray-300' />
                <p className='text-sm text-gray-600'>
                  {category.courses_count} Courses{' '}
                  <AiOutlineArrowRight className='ml-1 inline' />
                </p>
              </div>
            ))
          ) : (
            <p>No categories found</p>
          )}
        </div>
      </div>
      {/* Sticky Ad */}
      <div className='fixed bottom-12 left-0 right-0 z-[9999] flex justify-center'>
        <div id='div-gpt-ad-6641866-6' className='w-full max-w-[768px]'></div>
      </div>
    </>
  );
}

export default Learn;
