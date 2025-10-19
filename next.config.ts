import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'lh3.googleusercontent.com',
      port: '',
      pathname: '/**'
    },{
      protocol: 'https',
      hostname: 'encrypted-tbn0.gstatic.com',
      port: '',
      pathname: '/**'

    }]
  },

};

    // next.config.js

export default nextConfig;