/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    //TODO: remove this shit
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
