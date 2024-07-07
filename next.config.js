const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/v1/quest/galxe/:path*',
        headers: [
          { key: 'Access-Control-Allow-Methods', value: 'GET' },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://dashboard.galxe.com',
          },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
