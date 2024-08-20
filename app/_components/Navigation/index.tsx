'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import wifinewslogo from '../../_assets/images/wifinews-logo-color.jpeg';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='container mx-auto'>
      <header>
        <nav className='navbar flex w-full flex-wrap items-center justify-between bg-white text-lg text-gray-700'>
          <div className='relative h-[40px] w-[174px]'>
            <Link href='/'>
              <Image
                src={wifinewslogo}
                alt='wifinews-logo'
                fill
                sizes='174px'
                className='object-contain'
                priority
              />
            </Link>
          </div>

          <button
            onClick={toggleMenu}
            className='block h-6 w-6 cursor-pointer md:hidden'
            aria-label='Toggle menu'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>

          <div
            className={`w-full md:flex md:w-auto md:items-center ${
              isMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <ul className='pt-4 text-base text-gray-700 md:flex md:justify-between md:pt-0'>
              {[
                'Home',
                'Topics for discussion',
                'Featured articles',
                'Free learning material',
              ].map((item) => (
                <li key={item}>
                  <Link
                    href='#'
                    className='block py-2 hover:text-purple-400 md:p-4'
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navigation;
