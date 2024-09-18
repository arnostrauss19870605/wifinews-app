'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiX, FiLogOut } from 'react-icons/fi';
import { MdOutlineMenu } from 'react-icons/md';
import wifinewslogo from '../../_assets/images/logo.png';
import { useAuth } from '@/app/_context/authContext';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const alisonId = localStorage.getItem('alisonId');
    if (alisonId) {
      setAvatarUrl(`https://alison.com/images/users/default/${alisonId}.jpg`);
    }
  }, [user]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'News', href: '/news' },
    { name: 'Topics', href: '/topics' },
    { name: 'Learn', href: '/learn' },
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
          {isAuthenticated ? (
            <div className='flex items-center'>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt='User Avatar'
                  className='h-10 w-10 rounded-full'
                />
              ) : (
                <div className='h-10 w-10 rounded-full bg-gray-300'></div>
              )}
              <span className='ml-2 text-base text-gray-700'>
                Hi, {user?.firstname}
              </span>
              <button
                onClick={handleLogout}
                className='ml-4 flex items-center rounded-full border border-red-500 px-4 py-2 text-red-500 transition-colors hover:bg-red-500 hover:text-white'
              >
                <FiLogOut className='mr-1' size={20} /> Logout
              </button>
            </div>
          ) : (
            <div className='flex space-x-4'>
              <Link
                href='/login'
                className='rounded-full border border-[#FF4644] px-4 py-2 uppercase text-gray-700 transition-colors hover:bg-[#FF4644] hover:text-white'
              >
                Login
              </Link>
              <Link
                href='/register'
                className='rounded-full bg-[#FF4644] px-4 py-2 uppercase text-white transition-colors hover:bg-[#e33a3a]'
              >
                Register
              </Link>
            </div>
          )}
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
              {isAuthenticated ? (
                <div className='flex items-center'>
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt='User Avatar'
                      className='h-10 w-10 rounded-full'
                    />
                  ) : (
                    <div className='h-10 w-10 rounded-full bg-gray-300'></div>
                  )}
                  <span className='ml-2 text-base text-gray-700'>
                    Hi, {user?.firstname}
                  </span>
                </div>
              ) : (
                <div className='flex space-x-4'>
                  <Link
                    href='/login'
                    className='rounded-full border border-[#FF4644] px-4 py-2 uppercase text-gray-700 transition-colors hover:bg-[#FF4644] hover:text-white'
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    href='/register'
                    className='rounded-full bg-[#FF4644] px-4 py-2 uppercase text-white transition-colors hover:bg-[#e33a3a]'
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </div>
              )}
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
                  className={`w-full border-t border-gray-300 pt-4 text-center ${
                    pathname === item.href ? 'font-bold text-[#FF4644]' : ''
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

            {isAuthenticated && (
              <div className='flex w-full justify-center px-4'>
                <button
                  onClick={handleLogout}
                  className='mt-6 flex w-full max-w-xs items-center justify-center rounded-full border border-red-500 px-4 py-2 uppercase text-red-500 transition-colors hover:bg-red-500 hover:text-white'
                >
                  <FiLogOut className='mr-1' size={20} /> Logout
                </button>
              </div>
            )}
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
