import Image from 'next/image';
import wifinewslogo from '../../_assets/images/wifinews-logo-color.jpeg';

function DashboardHeader() {
  return (
    <div className='container mx-auto px-6'>
      <div className='my-5 flex items-center justify-between'>
        <div className='w-full max-w-[174px]'>
          <Image
            src={wifinewslogo}
            alt='wifi-news-logo'
            width={174}
            height={0}
            className='h-auto w-full'
            priority
          />
        </div>

        <div className='avatar'>
          <Image
            alt='User avatar'
            src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            width={40}
            height={40}
            className='rounded-full ring-2 ring-white'
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
