'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  AiOutlineSearch,
  AiOutlineClockCircle,
  AiFillStar,
  AiOutlineGlobal,
} from 'react-icons/ai';
import {
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortAmountUp,
  FaSortAmountDown,
} from 'react-icons/fa';
import { useAuth } from '@/app/_context/authContext';
import Image from 'next/image';
import Script from 'next/script';
import { getUtmParams } from '@/app/_utils/utm.util';

interface Publisher {
  name: string;
  slug: string;
  location: string;
}

interface CategoryTranslation {
  name: string;
  locale: string;
}

interface Category {
  id: number;
  code: string;
  translations: CategoryTranslation[];
}

interface CourseModule {
  id: number;
  name: string;
  description: string;
}

interface CourseTranslation {
  name: string;
  locale: string;
}

interface TagTranslation {
  name: string;
  slug: string;
  locale: string;
}

interface Tag {
  id: number;
  translations: TagTranslation[];
}

interface Course {
  id: number;
  name: string;
  slug: string;
  type: string;
  language: string;
  publishers: Publisher[];
  categories: Category[];
  modules: CourseModule[];
  tags: Tag[];
  translations: CourseTranslation[];
  image: string;
  url: string;
  duration_avg: string;
  rating_avg: string;
  ratings_count: string;
}

const getCategoryIdByCode = (code: string): number | null => {
  const categoryMapping: Record<string, number> = {
    it: 1,
    language: 15,
    health: 31,
    education: 41,
    'personal-development': 45,
    engineering: 99,
    business: 51,
    marketing: 79,
    management: 109,
  };

  return categoryMapping[code] || null;
};

const truncateTitle = (title: string) => {
  return title.length > 50 ? title.substring(0, 47) + '...' : title;
};

function CoursesByCategory() {
  const { code } = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<
    'name-asc' | 'name-desc' | 'duration-asc' | 'duration-desc'
  >('name-asc');
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(9);

  const categoryId = getCategoryIdByCode(code as string);

  useEffect(() => {
    async function fetchCourses() {
      if (!categoryId) return;
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/category/${categoryId}`
        );
        const data = await response.json();
        setCourses(data.data || []);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [categoryId, code]);

  const handleSort = (courses: Course[]): Course[] => {
    return courses.sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.translations?.[0]?.name.localeCompare(
          b.translations?.[0]?.name || ''
        );
      } else if (sortBy === 'name-desc') {
        return b.translations?.[0]?.name.localeCompare(
          a.translations?.[0]?.name || ''
        );
      } else if (sortBy === 'duration-asc') {
        return parseInt(a.duration_avg) - parseInt(b.duration_avg);
      } else if (sortBy === 'duration-desc') {
        return parseInt(b.duration_avg) - parseInt(a.duration_avg);
      }
      return 0;
    });
  };

  const filteredCourses = handleSort(
    courses.filter((course) =>
      course.translations?.[0]?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleMoreInfoClick = useCallback(
    (courseSlug: string) => {
      if (!isAuthenticated) {
        localStorage.setItem('redirectAfterLogin', courseSlug);
        router.push('/login');
      } else {
        // window.location.href = courseUrl;
        window.location.href = `https://alison.com/login/external?token=${localStorage.getItem('alisonToken')}&course=${courseSlug}`;
      }
    },
    [isAuthenticated, router]
  );

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
        className='container mx-auto px-4 py-8'
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
              placeholder='Search courses...'
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
              className={`rounded border p-2 ${sortBy === 'duration-asc' ? 'bg-gray-200' : ''}`}
              onClick={() => setSortBy('duration-asc')}
            >
              <FaSortAmountUp
                size={20}
                title='Sort by Duration (Low to High)'
              />
            </button>
            <button
              className={`rounded border p-2 ${sortBy === 'duration-desc' ? 'bg-gray-200' : ''}`}
              onClick={() => setSortBy('duration-desc')}
            >
              <FaSortAmountDown
                size={20}
                title='Sort by Duration (High to Low)'
              />
            </button>
          </div>
        </div>

        <div className='grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className='h-[400px] w-full animate-pulse overflow-hidden rounded-lg border border-gray-300 bg-gray-200 p-4 shadow-sm'
              >
                <div className='mb-4 h-32 w-full rounded bg-gray-300'></div>
                <div className='mb-2 h-6 w-3/4 rounded bg-gray-300'></div>
                <div className='flex flex-col items-center space-y-2'>
                  <div className='h-4 w-1/2 rounded bg-gray-300'></div>
                  <div className='h-4 w-2/3 rounded bg-gray-300'></div>
                  <div className='h-4 w-1/3 rounded bg-gray-300'></div>
                </div>
                <div className='mt-auto h-10 w-full rounded bg-gray-300'></div>
              </div>
            ))
          ) : currentCourses.length > 0 ? (
            currentCourses.map((course) => (
              <div
                key={course.id}
                className='flex h-[400px] w-full flex-col overflow-hidden rounded-lg border border-gray-300 bg-white p-4 text-center shadow-sm transition-transform hover:scale-105'
              >
                <Image
                  src={course.image}
                  alt={course.translations?.[0]?.name || ''}
                  width={500}
                  height={200}
                  className='mb-4 h-32 w-full rounded object-cover'
                />
                <h3 className='mb-2 text-base font-semibold text-black'>
                  {truncateTitle(course.translations?.[0]?.name || '')}
                </h3>

                <div className='flex flex-col items-center space-y-2'>
                  <div className='flex items-center text-sm text-gray-600'>
                    <AiOutlineClockCircle className='mr-2' />
                    <span>Duration: {course.duration_avg} hrs</span>
                  </div>
                  <div className='flex items-center text-sm text-gray-600'>
                    <AiFillStar className='mr-2 text-yellow-500' />
                    <span>
                      Rating: {course.rating_avg} ({course.ratings_count}{' '}
                      reviews)
                    </span>
                  </div>
                  <div className='flex items-center text-sm text-gray-600'>
                    <AiOutlineGlobal className='mr-2' />
                    <span>Language: {course.language}</span>
                  </div>
                </div>

                <div className='mt-auto pt-4'>
                  <button
                    onClick={() => handleMoreInfoClick(course.slug)}
                    className='inline-block w-full rounded bg-gray-700 py-2 text-white hover:bg-black'
                  >
                    More Info
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No courses found</p>
          )}
        </div>

        <div className='mt-6 flex justify-center'>
          {Array.from(
            { length: Math.ceil(filteredCourses.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-1 rounded px-4 py-2 ${
                  currentPage === index + 1
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            )
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

export default CoursesByCategory;
