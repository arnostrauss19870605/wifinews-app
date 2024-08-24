import Image from 'next/image';
import wifinewslogo from '../../_assets/images/logo.png';

function Register() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mx-auto max-w-md'>
        <div className='mb-8 text-center'>
          <Image
            src={wifinewslogo}
            alt='WifiNews Logo'
            width={174}
            height={0}
            className='mx-auto h-auto w-full max-w-[174px]'
            priority
          />
        </div>

        <form className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label
                htmlFor='fname'
                className='block text-sm font-medium text-gray-700'
              >
                First Name
              </label>
              <input
                id='fname'
                name='fname'
                type='text'
                placeholder='Jon'
                className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
              />
            </div>
            <div>
              <label
                htmlFor='lname'
                className='block text-sm font-medium text-gray-700'
              >
                Last Name
              </label>
              <input
                id='lname'
                name='lname'
                type='text'
                placeholder='Doe'
                className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
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
              placeholder='you@example.com'
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
            />
          </div>

          <div>
            <label
              htmlFor='country'
              className='block text-sm font-medium text-gray-700'
            >
              Country
            </label>
            <select
              name='country'
              id='country'
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
            >
              <option value='sa'>South Africa</option>
              <option value='ger'>Germany</option>
            </select>
          </div>

          <div>
            <label
              htmlFor='city'
              className='block text-sm font-medium text-gray-700'
            >
              City
            </label>
            <select
              name='city'
              id='city'
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
            >
              <option value='sa'>South Africa</option>
              <option value='ger'>Germany</option>
            </select>
          </div>

          <div className='mt-6'>
            <button
              type='button'
              className='w-full rounded-lg bg-slate-950 px-4 py-2 font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2'
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
