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
    //  BASE_URL: "https://13.60.168.95.nip.io",
  //  BASE_URL: "http://localhost:3000",
    BASE_URL: "https://tranpsort-be.vercel.app",
    API_KEY: "AIzaSyDkjJ1mFIgDgUg-j2sT41VHOs-Mn2JyxKc",
    AUTH_DOMAIN: "transport-ease-a2183.firebaseapp.com",
    PROJECT_ID: "transport-ease-a2183",
    STORAGE_BUCKET: "transport-ease-a2183.firebasestorage.app",
    MESSAGING_SENDER_ID: "640785840814",
    APP_ID: "1:640785840814:web:cba910609b4ec07f224b3f",
    VAPID_KEY:
      "BLZX_R7Ti3QsPebhEnSjAx-audl8jyStcoH94vITsUg-vzbR-7dR64f76IoTK4ZlSblrXqRYULW-enPmMvnOUr0",
    measurementId: "G-M64GYZ8TZZ",
  },
};

module.exports = withPWA(nextConfig);
