const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        // BASE_URL:'http://192.168.1.108:3000'
<<<<<<< HEAD
        BASE_URL:'https://16.170.245.209.nip.io'
        // BASE_URL:'http://localhost:3001'
=======
        BASE_URL:'https://13.60.168.95.nip.io'
        // BASE_URL:'http://localhost:3000'
>>>>>>> d6c654320a0d333355f9a667f4938da6bcd25a22
    }
}

module.exports = withPWA(nextConfig);