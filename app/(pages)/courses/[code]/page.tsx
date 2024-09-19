'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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
          `http://localhost:8080/courses/category/${categoryId}`
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

  return (
    <div
      className='container mx-auto px-4 py-8'
      style={{ minHeight: 'calc(100vh - 200px)' }}
    >
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
            <FaSortAmountUp size={20} title='Sort by Duration (Low to High)' />
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
              <img
                src={course.image}
                alt={course.translations?.[0]?.name}
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
                    Rating: {course.rating_avg} ({course.ratings_count} reviews)
                  </span>
                </div>
                <div className='flex items-center text-sm text-gray-600'>
                  <AiOutlineGlobal className='mr-2' />
                  <span>Language: {course.language}</span>
                </div>
              </div>

              <div className='mt-auto pt-4'>
                <a
                  href={course.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-block w-full rounded bg-gray-700 py-2 text-white hover:bg-black'
                >
                  More Info
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No courses found</p>
        )}
      </div>

      <div className='mt-[100px] flex justify-center'>
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
  );
}

export default CoursesByCategory;
