'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_context/authContext';

function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  // If user is already authenticated, redirect to homepage
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setErrorMessage('');

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            password,
            confirmPassword, // Backend expects this
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.access_token && data.refresh_token) {
        // Log the user in after successful registration
        login(data.access_token, data.refresh_token);

        // Redirect to homepage
        router.push('/');
      } else {
        setErrorMessage(data.message || 'Registration failed');
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
          Register
        </h2>

        {errorMessage && (
          <div className='mb-4 text-center text-red-500'>{errorMessage}</div>
        )}

        <form onSubmit={handleRegister} className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label
                htmlFor='firstname'
                className='block text-sm font-medium text-gray-700'
              >
                First Name
              </label>
              <input
                id='firstname'
                name='firstname'
                type='text'
                placeholder='Jane'
                className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor='lastname'
                className='block text-sm font-medium text-gray-700'
              >
                Last Name
              </label>
              <input
                id='lastname'
                name='lastname'
                type='text'
                placeholder='Doe'
                className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='jane.doe@example.com'
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='********'
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-gray-700'
            >
              Confirm Password
            </label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              placeholder='********'
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className='mt-6'>
            <button
              type='submit'
              className='w-full rounded-lg bg-slate-950 px-4 py-2 font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2'
            >
              Register
            </button>
          </div>
        </form>

        <div className='mt-4 text-center'>
          <p className='text-sm text-gray-600'>
            Already have an account?{' '}
            <Link href='/login' className='text-[#FF4644] hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
