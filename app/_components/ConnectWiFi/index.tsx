import { FaWifi } from 'react-icons/fa';
import ProgressIndicator from '@/app/_components/ProgressIndicator';

function ConnectWiFi({ step }: any) {
  return (
    <>
      <div className='mb-5'>
        <ProgressIndicator step={step} />
      </div>
      <div className='my-10 text-center'>
        <h2 className='mb-4 text-2xl font-semibold'>Connect to WiFi</h2>
        <div className='flex justify-center'>
          <button
            type='button'
            className='flex items-center rounded-lg bg-slate-950 px-6 py-3 font-medium text-white focus:outline-none lg:px-10'
          >
            <FaWifi className='mr-2' /> Connect Now
          </button>
        </div>
      </div>
    </>
  );
}

export default ConnectWiFi;
