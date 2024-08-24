'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiX } from 'react-icons/fi';
import { MdOutlineMenu } from 'react-icons/md';
import wifinewslogo from '../../_assets/images/logo.png';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // List of paths where the navigation should be visible
    const allowedPaths = ['/', '/posts', '/topics', '/login', '/register'];

    // Check if the current path matches any of the allowed paths or dynamic paths
    const isMatchingPath =
      allowedPaths.includes(pathname) ||
      pathname.startsWith('/posts/') ||
      pathname.startsWith('/topics/');

    setIsVisible(isMatchingPath);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (!isVisible) {
    return null;
  }

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
              {
                name: 'Home',
                href: '/',
              },
              {
                name: 'Posts',
                href: '/posts',
              },
              {
                name: 'Topics',
                href: '/topics',
              },
              {
                name: 'Learn',
                href: '/login',
              },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className='block py-2 uppercase hover:text-[#FF4644] lg:p-4'
                >
                  {item.name}
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
