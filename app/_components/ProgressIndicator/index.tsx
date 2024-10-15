import React from 'react';

function ProgressIndicator({ currentStep, totalSteps }: any) {
  return (
    <div>
      <div className='my-3 text-center text-lg font-semibold'>
        Step {`${currentStep}/${totalSteps}`}
      </div>
      <div className='relative my-4 h-2 w-full overflow-hidden rounded-full bg-gray-200'>
        <div className='animate-moving absolute left-0 top-0 h-full w-full rounded-full bg-gray-500'></div>
      </div>
    </div>
  );
}

export default ProgressIndicator;
