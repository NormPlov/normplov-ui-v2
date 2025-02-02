/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
      locales: ['en', 'km'],
      defaultLocale: 'km',
      localeDetection: false,
  },
  images: {
    domains: ['normplov-api.shinoshike.studio','www.aupp.edu.kh','rupp.edu.kh','foodstem-euproject.itc.edu.kh','www.aub.edu.kh','136.228.158.126'], // Add the external domain for images
  },
};

export default nextConfig;
