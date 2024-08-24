import Image from 'next/image';

const CategoryTag = ({ name, count }: any) => (
  <span className='mb-3 mr-3 inline-flex items-center rounded-md bg-gray-200 px-3 py-3 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500'>
    {name} ({count})
  </span>
);

const CourseCard = () => (
  <div className='rounded-lg border border-gray-400 p-2'>
    <div className='course-preview mb-3 bg-gray-400'></div>
    <div className='mb-3 text-sm font-medium'>Digital Marketing</div>
    <div className='mb-3 flex items-center'>
      <div className='relative mr-3 h-8 w-8'>
        <Image
          alt='User avatar'
          src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          className='rounded-full ring-2 ring-white'
          fill
          sizes='32px'
        />
      </div>
      <div className='text-xs'>Alex</div>
    </div>
    <div className='text-sm'>1hr 15min . 12 Lessons</div>
  </div>
);

function Dashboard() {
  const categories = [
    { name: 'UI/UX', count: 50 },
    { name: 'HTML,CSS', count: 24 },
    { name: 'Digital Marketing', count: 15 },
    { name: 'Front-end', count: 15 },
    { name: 'Back-End', count: 15 },
    { name: 'DevOps', count: 15 },
  ];

  return (
    <>
      <div className='container'>
        <div className='search-bar'>
          <input
            type='text'
            name='search'
            id='search'
            className='input-field'
            placeholder='Search by category'
          />
        </div>

        <div className='categories mb-9'>
          {categories.map((category, index) => (
            <CategoryTag
              key={index}
              name={category.name}
              count={category.count}
            />
          ))}
        </div>

        <div className='grid grid-cols-2 gap-4'>
          {[1, 2, 3, 4].map((item) => (
            <CourseCard key={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
