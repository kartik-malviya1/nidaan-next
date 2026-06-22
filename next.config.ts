import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   async redirects() {
    return [
      {
        source: "/home-4",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home-3",
        destination: "/",
        permanent: true,
      },
    ];
  },
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
