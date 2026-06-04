/** @type {import('next').NextConfig} */
// basePath is only needed when hosting on a project page (e.g.
// https://<user>.github.io/<repo>). The deploy workflow sets these envs
// automatically; locally they're empty and the site runs at "/".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;
