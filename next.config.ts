import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during `next build`
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  swcMinify: true, // Enable SWC minification
  experimental: {
    optimizePackageImports: ['react-icons', 'lucide-react', 'framer-motion']
  }
};

export default nextConfig;

