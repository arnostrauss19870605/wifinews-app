/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'alison.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn01.alison-static.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn02.alison-static.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn03.alison-static.net',
      },
    ],
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
