import Image from 'next/image';
import playicon from '../../_assets/svgs/play-icon.svg';
import star from '../../_assets/svgs/star.svg';

const InfoItem = ({ title, value }: any) => (
  <div className='p-4'>
    <p className='font-semibold text-gray-700'>{title}</p>
    <p className='text-gray-600'>{value}</p>
  </div>
);

const LessonItem = ({ number, duration }: any) => (
  <div className='mb-3 flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow-sm'>
    <div className='flex items-center font-medium text-gray-700'>
      <span className='mr-2'>
        <Image src={playicon} alt='Play icon' width={24} height={24} />
      </span>
      Lesson {number}
    </div>
    <div className='text-gray-600'>{duration}</div>
  </div>
);

function Page() {
  return (
    <>
      <div className='container mx-auto p-6 lg:px-8'>
        <div className='mb-6 text-xl font-bold text-gray-900'>
          Module 1 - Concepts of Information Technology
        </div>

        <div className='video-section mb-8 flex items-center justify-center rounded-lg bg-gray-200 p-24 shadow-sm'>
          <Image src={playicon} alt='Play video' width={64} height={64} />
        </div>

        <div className='mb-8 rounded-lg bg-gray-50 p-6 shadow-sm'>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            <InfoItem title='Updated at' value='2019-07-01' />
            <InfoItem title='Language' value='English' />
            <InfoItem title='Duration' value='3 hrs' />
            <InfoItem title='Publisher' value='AngloLink' />
            <InfoItem title='Category' value='IT' />
            <div className='p-4'>
              <p className='mb-2 font-semibold text-gray-700'>Rating</p>
              <div className='flex'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Image
                    key={i}
                    src={star}
                    alt='Rating star'
                    width={20}
                    height={20}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='mb-6 flex items-center'>
          <div className='relative mr-3 h-10 w-10'>
            <Image
              alt='User avatar'
              src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              className='rounded-full ring-2 ring-white'
              fill
              sizes='40px'
            />
          </div>
          <div className='text-lg font-medium text-gray-900'>Alex</div>
        </div>

        <div className='mb-4 text-lg font-semibold text-gray-900'>
          Description
        </div>
        <p className='mb-8 text-gray-700'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries.
        </p>

        <div className='mb-4 text-lg font-semibold text-gray-900'>Lessons</div>

        <div className='space-y-3'>
          <LessonItem number={1} duration='02:10' />
          <LessonItem number={2} duration='02:10' />
          <LessonItem number={3} duration='02:10' />
        </div>

        <div className='mt-8'>
          <button
            type='button'
            className='w-full rounded-md bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2'
          >
            Start Now
          </button>
        </div>
      </div>
    </>
  );
}

export default Page;
