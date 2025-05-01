/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignore TypeScript errors on production builds
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
