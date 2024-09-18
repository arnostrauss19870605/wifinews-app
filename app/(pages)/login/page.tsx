'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_context/authContext';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok && data.access_token && data.refresh_token) {
        login(data.access_token, data.refresh_token);
        router.push('/');
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div
      className='flex items-center justify-center'
      style={{ minHeight: 'calc(100vh - 220px)' }}
    >
      <div className='w-full max-w-md space-y-8'>
        <h2 className='text-center text-2xl font-bold uppercase text-gray-900'>
          Login
        </h2>

        {errorMessage && (
          <div className='mb-4 text-center text-red-500'>{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='email'
              className='mb-2 block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='you@example.com'
              className='w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor='password'
              className='mb-2 block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <div className='relative'>
              <input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'} // Toggle input type
                placeholder='**********'
                className='w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)} // Toggle show/hide password
                className='absolute inset-y-0 right-0 flex items-center px-3 text-gray-600'
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={24} /> // Eye icon when password is shown
                ) : (
                  <AiFillEye size={24} /> // Eye icon when password is hidden
                )}
              </button>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='w-full rounded-lg bg-slate-950 px-4 py-2 font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2'
            >
              Login
            </button>
          </div>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            Don&apos;t have an account?{' '}
            <Link href='/register' className='text-[#FF4644] hover:underline'>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
