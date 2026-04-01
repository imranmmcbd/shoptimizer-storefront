import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.ibadateshop.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;