export default function Loading() {
  return (
    <div className='flex min-h-screen items-center justify-center pb-72'>
      <div className='flex flex-col items-center'>
        <div className='h-10 w-10 animate-spin rounded-full border-t-4 border-solid border-[#E33A3A]'></div>
        <p className='mt-4 text-lg font-semibold text-gray-700'>
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
