/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["res.cloudinary.com"], // Add Cloudinary domain here
  },
  env: {
    CLOUDINARY_IMAGE_URL: process.env.CLOUDINARY_IMAGE_URL,
    // Add more environment variables as needed
  },
};

module.exports = nextConfig;
