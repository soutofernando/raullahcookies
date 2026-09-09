import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  allowedDevOrigins: ["127.0.0.1", "localhost", "0.0.0.0", "192.168.0.5"],
  images: {
    formats: ["image/webp"],
  },
};

export default nextConfig;
