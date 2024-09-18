'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AiOutlineSearch, AiOutlineArrowRight } from 'react-icons/ai';
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

function CoursesByCategory() {
  const { code } = useParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<
    'name-asc' | 'name-desc' | 'duration-asc' | 'duration-desc'
  >('name-asc');
  const [loading, setLoading] = useState<boolean>(true);

  const categoryId = getCategoryIdByCode(code as string);

  useEffect(() => {
    async function fetchCourses() {
      if (!categoryId) return;
      try {
        const response = await fetch(
          `http://localhost:8080/courses/category/${categoryId}`
        );
        const data = await response.json();
        setCourses(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setLoading(false);
      }
    }

    fetchCourses();
  }, [categoryId]);

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

  return (
    <div className='container mx-auto px-4 py-8'>
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
          <p>Loading...</p>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className='h-[300px] w-full transform cursor-pointer rounded-lg border border-gray-300 bg-white p-4 text-center shadow-sm transition-transform hover:scale-105'
            >
              <img
                src={course.image}
                alt={course.translations?.[0]?.name}
                className='mb-4 h-32 w-full rounded object-cover'
              />
              <h3 className='mb-2 text-base font-semibold text-black'>
                {course.translations?.[0]?.name}
              </h3>
              <p className='text-sm text-gray-600'>
                Duration: {course.duration_avg} hrs
              </p>
              <p className='text-sm text-gray-600'>
                Rating: {course.rating_avg} ({course.ratings_count} reviews)
              </p>
              <p className='mt-2 text-sm text-blue-600'>
                <a href={course.url} target='_blank' rel='noopener noreferrer'>
                  Start Learning <AiOutlineArrowRight className='ml-1 inline' />
                </a>
              </p>
            </div>
          ))
        ) : (
          <p>No courses found</p>
        )}
      </div>
    </div>
  );
}

export default CoursesByCategory;
