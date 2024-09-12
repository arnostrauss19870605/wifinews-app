/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
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
