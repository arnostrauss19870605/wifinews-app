import Image from 'next/image';
import { FaPhotoVideo } from 'react-icons/fa';

const CategoryTag = ({ name, count }: any) => (
  <button className='mb-3 mr-3 inline-flex items-center rounded-full bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600'>
    {name} ({count})
  </button>
);

const CourseCard = () => (
  <div className='rounded-lg border border-gray-600 bg-gray-100 p-4 shadow-sm transition-shadow hover:shadow-lg'>
    <div className='mb-4 flex h-40 w-full items-center justify-center rounded-lg bg-gray-200'>
      <FaPhotoVideo size={48} className='text-gray-500' />
    </div>
    <div className='mb-2 text-lg font-semibold text-gray-900'>
      Digital Marketing
    </div>
    <div className='mb-4 flex items-center'>
      <div className='relative mr-3 h-10 w-10'>
        <Image
          alt='User avatar'
          src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          className='rounded-full'
          fill
          sizes='40px'
        />
      </div>
      <div className='text-sm text-gray-700'>Alex</div>
    </div>
    <div className='mb-4 text-sm text-gray-600'>1hr 15min · 12 Lessons</div>
    <button className='w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800'>
      Resume Course
    </button>
  </div>
);

function MyCourses() {
  const categories = [
    { name: 'UI/UX', count: 50 },
    { name: 'HTML,CSS', count: 24 },
    { name: 'Digital Marketing', count: 15 },
    { name: 'Front-end', count: 15 },
    { name: 'Back-End', count: 15 },
    { name: 'DevOps', count: 15 },
  ];

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='search-bar mb-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
        <input
          type='text'
          name='search'
          id='search'
          className='w-full rounded-lg border border-gray-600 bg-transparent px-4 py-2 text-lg text-black placeholder-gray-400 shadow-sm focus:border-gray-500 focus:ring-gray-500'
          placeholder='Search by name'
        />
        <button className='rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800'>
          Search
        </button>
      </div>

      <div className='categories mb-8 flex flex-wrap'>
        {categories.map((category, index) => (
          <CategoryTag
            key={index}
            name={category.name}
            count={category.count}
          />
        ))}
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <CourseCard key={item} />
        ))}
      </div>

      {/* Pagination */}
      <div className='mt-8 flex justify-center'>
        <button className='mx-1 rounded-full bg-black px-4 py-2 text-white hover:bg-gray-800'>
          1
        </button>
        <button className='mx-1 rounded-full bg-black px-4 py-2 text-white hover:bg-gray-800'>
          2
        </button>
        <button className='mx-1 rounded-full bg-black px-4 py-2 text-white hover:bg-gray-800'>
          3
        </button>
        {/* Add more pagination buttons as needed */}
      </div>
    </div>
  );
}

export default MyCourses;
