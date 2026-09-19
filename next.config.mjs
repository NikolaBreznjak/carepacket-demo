/** @type {import('next').NextConfig} */
const isGhPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isGhPages ? '/carepacket-demo' : '',
  assetPrefix: isGhPages ? '/carepacket-demo/' : undefined,
};

export default nextConfig;
