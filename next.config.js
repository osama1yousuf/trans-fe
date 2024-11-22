const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: 'https://16.170.245.209.nip.io'
  }
};

module.exports = withPWA(nextConfig);