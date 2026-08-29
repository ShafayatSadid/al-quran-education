/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Keep this disabled because Turbopack 16.3.1 can panic on Bengali UTF-8 text.
  // The stable workaround is to run the dev server with webpack.
  reactCompiler: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
