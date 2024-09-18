'use client';

import { useState, useEffect } from 'react';
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
    <div
      className='flex flex-col items-center justify-center p-4'
      style={{ minHeight: 'calc(100vh - 200px)' }}
    >
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
            <FaSortAmountDown size={20} title='Sort by Courses (High to Low)' />
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
  );
}

export default Learn;
