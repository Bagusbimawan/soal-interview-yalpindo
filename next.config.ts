import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mhipedpedgurkmgjwfup.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**'
      }
    ]
  }
};

export default nextConfig;
