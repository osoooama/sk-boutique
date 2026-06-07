/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  allowedDevOrigins: ["*.serveousercontent.com", "*.serveo.net", "localhost:3000"]
};

export default nextConfig;
