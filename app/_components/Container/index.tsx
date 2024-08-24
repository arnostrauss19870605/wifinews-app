import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-[768px] mx-auto px-4">
        {children}
      </div>
    </div>
  );
};

export default Container;
