import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracing: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
