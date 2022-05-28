/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
  images: {
    domains: ["media.graphassets.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
