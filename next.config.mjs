/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns  该数组列出了允许从哪些远程服务器加载图像。
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
