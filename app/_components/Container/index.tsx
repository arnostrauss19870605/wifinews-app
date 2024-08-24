import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className='flex justify-center'>
      <div className='mx-auto w-full max-w-[768px] px-4'>{children}</div>
    </div>
  );
};

export default Container;
