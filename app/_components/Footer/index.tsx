'use client';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../_assets/images/logo.png';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  const hideFooter = pathname === '/landing' || pathname === '/interstitial';
  if (hideFooter) {
    return null;
  }

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
      <div className='flex flex-col items-center space-y-2 text-center text-sm text-gray-400 md:flex-row md:space-x-4 md:space-y-0'>
        <div>© Copyright. All rights reserved</div>
        <Link href='/privacy-policy' className='hover:underline'>
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
