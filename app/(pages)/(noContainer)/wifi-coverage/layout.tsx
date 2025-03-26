import React from 'react';

export default function WifiCoverageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='h-full min-h-screen w-full'>{children}</div>;
}
