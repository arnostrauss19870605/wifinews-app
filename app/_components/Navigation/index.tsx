'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiX } from 'react-icons/fi';
import { MdOutlineMenu } from 'react-icons/md';
import wifinewslogo from '../../_assets/images/wifinews-logo-color.jpeg';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <nav className='my-4 flex w-full flex-wrap items-center justify-between bg-white px-4 text-lg text-gray-700'>
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
          className='block h-[32px] w-[32px] cursor-pointer lg:hidden'
          aria-label='Toggle menu'
        >
          {isMenuOpen ? (
            <FiX size={32} />
          ) : (
            <MdOutlineMenu size={32} color='#FF4644' />
          )}
        </button>

        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full lg:flex lg:w-auto lg:items-center`}
        >
          <ul className='pt-4 text-base text-gray-700 lg:flex lg:justify-between lg:pt-0'>
            {[
              'Home',
              'Topics for discussion',
              'Featured articles',
              'Free learning material',
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href='#'
                  onClick={closeMenu}
                  className='block py-2 uppercase hover:text-[#FF4644] lg:p-4'
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
