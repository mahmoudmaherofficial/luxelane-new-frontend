import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during `next build`
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  swcMinify: true, // Enable SWC minification instead of Terser
  webpack: (config) => {
    // We're keeping this for compatibility but enabling SWC minification
    return config;
  },
};

export default nextConfig;

