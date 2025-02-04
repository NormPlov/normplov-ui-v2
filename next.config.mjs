/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();


const nextConfig = {
  images: {
    domains: ['normplov-api.shinoshike.studio','lh3.googleusercontent.com','normplov-api.istad.co','www.aupp.edu.kh','rupp.edu.kh','foodstem-euproject.itc.edu.kh','www.aub.edu.kh','136.228.158.126','cdn.prod.website-files.com','qiniu.cambojob.com','bongsrey.sgp1.digitaloceanspaces.com','jobify-prod-bucket.s3.ap-southeast-1.amazonaws.com','jobify.works','jobify-prod-bucket.s3.ap-southeast-1.amazonaws.com','youtu.be'], // Add the external domain for images
  },
    // Ensure the build is standalone
    output: 'standalone',
};

export default withNextIntl(nextConfig);
