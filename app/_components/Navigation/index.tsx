'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiX } from 'react-icons/fi';
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
  ];

  return (
    <header className='bg-white shadow'>
      <nav className='container mx-auto flex items-center justify-between p-4'>
        {/* Logo Section */}
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

        {/* Menu Items */}
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

        {/* Auth Section (Login/Register or User Info) */}
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
                className='ml-4 text-red-500 hover:text-red-600'
              >
                Logout
              </button>
            </div>
          ) : (
            <div className='flex space-x-4'>
              <Link
                href='/login'
                className='uppercase text-gray-700 hover:text-[#FF4644]'
              >
                Login
              </Link>
              <Link
                href='/register'
                className='uppercase text-[#FF4644] hover:underline'
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
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

        {/* Mobile Menu */}
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
                    className='uppercase text-gray-700 hover:text-[#FF4644]'
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    href='/register'
                    className='uppercase text-[#FF4644] hover:underline'
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

            {/* Logout button for mobile menu */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className='mt-6 w-full uppercase text-red-500 hover:text-red-600'
              >
                Logout
              </button>
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
