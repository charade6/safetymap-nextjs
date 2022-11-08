/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['mepv2.safekorea.go.kr'],
  },
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.svg$/i,
        resourceQuery: { not: [/url/] },
        use: ['@svgr/webpack'],
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/,
      },
    );
    return config;
  },
  async redirects() {
    return [
      { source: '/', destination: '/map', permanent: true, statusCode: 301 },
    ];
  },
};

module.exports = nextConfig;
