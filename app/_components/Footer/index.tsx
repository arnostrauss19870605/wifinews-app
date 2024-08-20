import Image from 'next/image';
import logo from '../../_assets/images/wifinews-logo-color.jpeg';

const Footer = () => {
  return (
    <footer className='flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4'>
      <div className='relative h-[18px] w-[82px]'>
        <Image
          src={logo}
          alt='WifiNews Logo'
          fill
          sizes='82px'
          className='object-contain'
          priority
        />
      </div>
      <div className='text-sm text-gray-400'>
        © copyright. All rights are reserved
      </div>
    </footer>
  );
};

export default Footer;
