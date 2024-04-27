export const getOrigin = () => {
  const origin =
    process.env.NODE_ENV === 'development'
      ? '*'
      : [
          'https://www.suicoins.com',
          'https://www.dev.suicoins.com',
          'https://dev.suicoins.com',
          'https://suicoins.com',
          'https://sui.interestprotocol.com',
        ].join(',');

  console.log('>> origin :: ', origin);

  return origin;
};
