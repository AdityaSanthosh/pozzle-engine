/** Copyright (c) 2023, Poozle, all rights reserved. **/

module.exports = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/authentication/signin',
        permanent: true,
      },
    ];
  },
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  swcMinify: true,
  pageExtensions: ['page.tsx', 'page.js'],
  publicRuntimeConfig: {
    // Will be available on both server and client
    baseHost: process.env.BASE_HOST,
  },
};
