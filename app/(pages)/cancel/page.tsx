'use client';

function NoThankYou() {
  const handleRedirect = () => {
    window.location.replace('/landing');
  };

  return (
    <div className='flex min-h-screen justify-center px-4 py-10'>
      <div className='w-full max-w-lg space-y-6 text-center'>
        <h1 className='text-3xl font-bold leading-tight sm:text-4xl md:text-5xl'>
          You have opted not to access our free WiFi.
        </h1>

        <p className='text-lg leading-relaxed text-gray-600 sm:text-xl'>
          This service is available for FREE to you, which is made possible by
          our advertisers. To continue, please support and watch the ad to
          continue using this service.
        </p>

        <button
          type='button'
          className='w-full rounded-lg bg-slate-950 px-6 py-3 text-white transition duration-300 ease-in-out hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-400 focus:ring-opacity-50 sm:w-auto'
          onClick={handleRedirect}
        >
          PRESS TO ACCESS FREE Wi-Fi
        </button>
      </div>
    </div>
  );
}

export default NoThankYou;
