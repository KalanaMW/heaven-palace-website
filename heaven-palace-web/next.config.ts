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
    // Allow images served from Supabase storage public buckets
    remotePatterns: [
      {
        protocol: 'https',
        // allow project-specific subdomains like mrkgmbepenpqmvcktkpr.supabase.co
        hostname: '*.supabase.co',
        // match the public storage URL path
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
