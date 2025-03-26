import React from 'react';
import Container from '@/app/_components/Container';

export default function WithContainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
