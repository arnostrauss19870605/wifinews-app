import Image from 'next/image';
import logo from '../../_assets/images/logo.png';

const Footer = () => {
  return (
    <footer className='mt-[50px] flex flex-col items-center justify-between border-t border-gray-200 bg-white px-4 py-6 md:flex-row md:px-6'>
      <div className='relative mb-4 h-[18px] w-[82px] md:mb-0'>
        <Image
          src={logo}
          alt='WifiNews Logo'
          fill
          sizes='82px'
          className='object-contain'
          priority
        />
      </div>
      <div className='text-center text-sm text-gray-400'>
        © copyright. All rights are reserved
      </div>
    </footer>
  );
};

export default Footer;
