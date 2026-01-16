/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  // Allow importing images from the public directory
  images: {
    unoptimized: true,
  },
  /**
   * Hide the small Next.js dev build indicator (the round “N” icon) that shows
   * up in development. This does not affect production.
   */
  devIndicators: {
    buildActivity: false,
  },
};

module.exports = nextConfig;