import useSWR from 'swr';

export const useVerifiedDeFiNfts = () =>
  useSWR('verified-defi-nfts', () =>
    fetch(
      'https://interest-protocol.github.io/public/sui/verified-defi-nfts.json'
    ).then((res) => res.json?.())
  );