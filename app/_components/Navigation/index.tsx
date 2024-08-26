'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiX } from 'react-icons/fi';
import { MdOutlineMenu } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import wifinewslogo from '../../_assets/images/logo.png';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      // Disable scrolling on the body when the menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling on the body when the menu is closed
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Replace 'User' with the actual user's first name
  const userFirstName = 'User';

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'News', href: '/news' },
    { name: 'Topics', href: '/topics' },
    { name: 'Learn', href: '/login' },
  ];

  return (
    <header className='bg-white shadow'>
      <nav className='container mx-auto flex items-center justify-between p-4'>
        <div className='flex items-center'>
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
        </div>

        <div className='hidden lg:flex lg:flex-1 lg:justify-center'>
          <ul className='flex space-x-8 text-base text-gray-700'>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`uppercase hover:text-[#FF4644] ${
                    pathname === item.href ? 'font-semibold text-[#FF4644]' : ''
                  }`}
                >
                  <span
                    className={`${
                      pathname === item.href
                        ? 'underline underline-offset-4'
                        : ''
                    }`}
                  >
                    {item.name.charAt(0)}
                  </span>
                  {item.name.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='hidden lg:flex lg:items-center'>
          <FaUserCircle size={36} className='text-gray-700' />
          <span className='ml-2 text-base text-gray-700'>
            Hi, {userFirstName}
          </span>
        </div>

        <button
          onClick={toggleMenu}
          className='ml-4 block h-[32px] w-[32px] cursor-pointer lg:hidden'
          aria-label='Toggle menu'
        >
          {isMenuOpen ? (
            <FiX size={32} />
          ) : (
            <MdOutlineMenu size={32} color='#FF4644' />
          )}
        </button>

        {isMenuOpen && (
          <div className='fixed inset-0 z-50 flex flex-col bg-white'>
            <div className='flex items-center justify-between p-4'>
              <div className='flex items-center'>
                <FaUserCircle size={36} className='text-gray-700' />
                <span className='ml-2 text-base text-gray-700'>
                  Hi, {userFirstName}
                </span>
              </div>
              <button
                onClick={closeMenu}
                className='block h-[32px] w-[32px] cursor-pointer'
                aria-label='Close menu'
              >
                <FiX size={32} color='#FF4644' />
              </button>
            </div>

            <ul className='flex flex-col items-center space-y-4 p-4 text-base text-gray-700'>
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`w-full pt-4 text-center first:border-t-0 ${
                    pathname === item.href
                      ? 'font-bold text-[#FF4644]'
                      : 'border-t border-gray-300'
                  }`}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className='block py-2 uppercase hover:text-[#FF4644]'
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      {isMenuOpen && (
        <div
          className='fixed inset-0 z-40 bg-black opacity-50'
          onClick={closeMenu}
        />
      )}
    </header>
  );
}

export default Navigation;
