import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.crunchbase.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "account.asus.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
