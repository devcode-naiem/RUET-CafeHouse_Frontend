module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
        pathname: '/photos/**',
      },
    ],
    domains: ['unsplash.com'], // Allow images from unsplash.com
  },
  // Enable serving images from the public folder
  publicRuntimeConfig: {
    staticFolder: '/public',
  },
};
