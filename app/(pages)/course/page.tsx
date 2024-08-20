import Image from 'next/image';
import playicon from '../../_assets/svgs/play-icon.svg';
import star from '../../_assets/svgs/star.svg';
import DashboardHeader from '../../_components/DashboardHeader';

const InfoItem = ({ title, value }: any) => (
  <div className='px-3 py-5'>
    <p className='font-medium'>{title}</p>
    <p>{value}</p>
  </div>
);

const LessonItem = ({ number, duration }: any) => (
  <div className='mb-3 flex items-center justify-between bg-gray-300 p-4'>
    <div className='flex items-center font-medium'>
      <span className='mr-2'>
        <Image src={playicon} alt='Play icon' width={32} height={32} />
      </span>{' '}
      Lesson {number}
    </div>
    <div>{duration}</div>
  </div>
);

function Page() {
  return (
    <>
      <DashboardHeader />
      <div className='container'>
        <div className='mb-5 font-semibold'>
          Module 1 - Concepts of Information Technology
        </div>

        <div className='video-section mb-5 flex items-center justify-center bg-gray-300 p-24'>
          <Image src={playicon} alt='Play video' width={48} height={48} />
        </div>

        <div className='mb-5 bg-gray-200'>
          <div className='grid grid-cols-3 gap-4'>
            <InfoItem title='Updated at' value='2019-07-01' />
            <InfoItem title='Language' value='English' />
            <InfoItem title='Duration' value='3 hrs' />
            <InfoItem title='Publisher' value='AngloLink' />
            <InfoItem title='Category' value='IT' />
            <div className='px-3 py-5'>
              <p className='mb-2 font-medium'>Rating</p>
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
          <div className='text-lg'>Alex</div>
        </div>

        <div className='font-semibold'>Description</div>
        <p className='mb-5'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries
        </p>

        <div className='mb-5 font-semibold'>Lessons</div>

        <LessonItem number={1} duration='02:10' />
        <LessonItem number={2} duration='02:10' />
        <LessonItem number={3} duration='02:10' />

        <div>
          <button
            type='button'
            className='mb-5 w-full rounded-md bg-slate-950 px-10 py-3 font-medium text-white focus:outline-none'
          >
            Start Now
          </button>
        </div>
      </div>
    </>
  );
}

export default Page;
