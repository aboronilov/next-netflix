/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "deadline.com",
      "i.ytimg.com",
      "images.squarespace-cdn.com",
      "rare-gallery.com",
      "art.ucsc.edu",
      "hips.hearstapps.com",
      "dailytrojan.com",
      "immortalephemera.com",
      "static01.nyt.com",
      "a.ltrbxd.com",
      "c4.wallpaperflare.com",
      "www.slantmagazine.com",
      "m.media-amazon.com",
      "images.thedirect.com",
      "cdn.arstechnica.net"
    ],
  },
};

module.exports = nextConfig;
