import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack: (config) => {
    config.optimization.minimize = false;
    return config;
  },
};

export default nextConfig;

