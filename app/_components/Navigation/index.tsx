'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FiX, FiLogOut } from 'react-icons/fi';
import { MdOutlineMenu } from 'react-icons/md';
import wifinewslogo from '../../_assets/images/logo.png';
import { useAuth } from '@/app/_context/authContext';
import isLocalStorageAvailable from '@/app/_utils/local-storage.util';

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
    if (isLocalStorageAvailable()) {
      const alisonId = localStorage.getItem('alisonId');
      if (alisonId) {
        setAvatarUrl(`https://alison.com/images/users/default/${alisonId}.jpg`);
      }
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

  useEffect(() => {
    console.log('pathname =>', pathname);
  }, [pathname]);

  const hideNav = pathname === '/landing' || pathname === '/interstitial';

  if (hideNav) {
    return null;
  }

  return (
    <header className='bg-white shadow'>
      <nav className='container mx-auto flex items-center justify-between p-4'>
        <div className='flex items-center'>
          <div className='relative h-[40px] w-[174px]'>
            <a href='/'>
              <Image
                src={wifinewslogo}
                alt='wifinews-logo'
                fill
                sizes='174px'
                className='object-contain'
                priority
              />
            </a>
          </div>
        </div>

        <div className='hidden lg:flex lg:flex-1 lg:justify-center'>
          <ul className='flex space-x-8 text-base text-gray-700'>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
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
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className='hidden lg:flex lg:items-center'>
          {isAuthenticated ? (
            <div className='flex items-center'>
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt='User Avatar'
                  width={40}
                  height={40}
                  className='rounded-full'
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
              <a
                href='/login'
                className='rounded-[2px] border border-[#FF4644] px-4 py-2 uppercase text-[#FF4644] transition-colors hover:bg-[#FF4644] hover:text-white'
              >
                Login
              </a>
              <a
                href='/register'
                className='rounded-[2px] bg-[#FF4644] px-4 py-2 uppercase text-white transition-colors hover:bg-[#e33a3a]'
              >
                Register
              </a>
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
          <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col bg-white'>
            <div className='flex items-center justify-between p-4'>
              {isAuthenticated ? (
                <div className='flex items-center'>
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt='User Avatar'
                      width={40}
                      height={40}
                      className='rounded-full'
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
                  <a
                    href='/login'
                    className='rounded-[2px] border border-[#FF4644] px-4 py-2 uppercase text-[#FF4644] transition-colors hover:bg-[#FF4644] hover:text-white'
                    onClick={closeMenu}
                  >
                    Login
                  </a>
                  <a
                    href='/register'
                    className='rounded-[2px] bg-[#FF4644] px-4 py-2 uppercase text-white transition-colors hover:bg-[#e33a3a]'
                    onClick={closeMenu}
                  >
                    Register
                  </a>
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
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className='block py-2 uppercase hover:text-[#FF4644]'
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            {isAuthenticated && (
              <div className='flex w-full justify-center px-4'>
                <button
                  onClick={handleLogout}
                  className='mt-6 flex w-full max-w-xs items-center justify-center rounded-[2px] border border-red-500 px-4 py-2 uppercase text-red-500 transition-colors hover:bg-red-500 hover:text-white'
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
          className='fixed bottom-0 left-0 right-0 top-0 z-40 bg-black opacity-50'
          onClick={closeMenu}
        />
      )}
    </header>
  );
}

export default Navigation;
