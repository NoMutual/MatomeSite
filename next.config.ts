import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "pics.dmm.co.jp" },
      { protocol: "https", hostname: "pics.dmm.com" },
      { protocol: "https", hostname: "cc3001.dmm.co.jp" },
    ],
  },
};

export default nextConfig;
