const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/v1/quest/*',
        headers: [
          { key: 'Access-Control-Request-Method', value: 'GET' },
          { key: 'Origin', value: 'https://dashboard.galxe.com' },
          { key: 'Access-Control-Request-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
