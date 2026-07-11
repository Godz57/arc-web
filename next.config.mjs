/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Defense-in-depth with middleware.ts (host-based www → apex)
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.arcweb.com.br" }],
        destination: "https://arcweb.com.br/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
