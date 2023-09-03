/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
      },
      {
        protocol: "http",
        hostname: "ia.media-imdb.com",
      },
    ],
  },
};

module.exports = nextConfig;
