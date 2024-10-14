const cspHeader = `
    default-src *;
    script-src * 'unsafe-eval' 'unsafe-inline';
    style-src * 'unsafe-inline';
    img-src * blob: data:;
    font-src *;
    connect-src *;
    object-src *;
    base-uri *;
    form-action *;
    frame-ancestors *;
`.trim().replace(/\n/g, '');

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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ]
  },
};

export default nextConfig;
