export const getOrigin = () =>
  process.env.NODE_ENV === 'development'
    ? '*'
    : 'https://www.suicoins.com,https://www.dev.suicoins.com/';
