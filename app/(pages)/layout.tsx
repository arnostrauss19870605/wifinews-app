import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/_styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wifi News',
  description:
    'Connecting South Africa through free and low-cost Wi-Fi. Our innovative digital marketing system provides high-speed internet access to thousands daily in high-density areas. Join our mission to bridge the digital divide.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
