import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  basePath: "/admin",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/games",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
