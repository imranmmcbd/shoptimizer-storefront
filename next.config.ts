import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.ibadateshop.com',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
  // Keep your Turbopack settings
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
