const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    // BASE_URL:'http://192.168.1.108:3000'
    BASE_URL: "https://13.60.168.95.nip.io",
    // BASE_URL:'http://localhost:3000'
  },
};

module.exports = withPWA(nextConfig);
