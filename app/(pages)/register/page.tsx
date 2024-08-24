import Link from 'next/link';

function Register() {
  return (
    <div
      className='flex items-center justify-center'
      style={{ minHeight: 'calc(100vh - 220px)' }}
    >
      <div className='w-full max-w-md space-y-8'>
        <h2 className='text-center text-2xl font-bold uppercase text-gray-900'>
          Register
        </h2>
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
