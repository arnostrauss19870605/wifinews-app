/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['alison.com', 'images.unsplash.com', 'cdn01.alison-static.net', 'cdn02.alison-static.net', 'cdn03.alison-static.net'],
  },
  async rewrites() {
    return [
      {
        source: '/api/google/:path*',
        destination: 'https://play.google.com/:path*',
      },
      {
        source: '/api/cse/:path*',
        destination: 'https://cse.google.com/:path*',
      },
    ];
  },
};

export default nextConfig;
