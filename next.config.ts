/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/photos/**',
      },
    ],
    domains: ['unsplash.com','images.unsplash.com' ], // Allow images from unsplash.com
  },
  // Enable serving images from the public folder
  publicRuntimeConfig: {
    staticFolder: '/public',
  },
}

module.exports = nextConfig

// local machine git folders