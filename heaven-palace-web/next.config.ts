import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Allow local images in /public/images/** (permits query strings like ?v=1)
    localPatterns: [
      {
        // Only `pathname` is supported for localPatterns — keep it simple
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
