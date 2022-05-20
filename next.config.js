/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.graphassets.com', 'res.cloudinary.com'],
  },
}

module.exports = nextConfig
