import Image from 'next/image';

function CompletedCourse() {
  return (
    <>
      <div className='container'>
        <div className='mb-5 text-base font-semibold'>
          List of completed course
        </div>

        <div className='grid grid-cols-2 gap-4'>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className='rounded-lg border border-gray-400 p-2'>
              <div className='course-preview mb-3 flex items-center justify-center bg-green-300 font-bold text-green-900'>
                Completed
              </div>
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
          ))}
        </div>
      </div>
    </>
  );
}

export default CompletedCourse;
