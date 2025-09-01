import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.dog.ceo",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
  
  },
  turbopack: {
  
    root: "/home/evanik/Desktop/Personalized-Dashboard-main", 
  },
};

export default nextConfig;
