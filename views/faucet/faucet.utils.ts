import { FAUCET_URL, Network } from '@/constants';

export const requestMov = async (account: string, network: Network) => {
  return fetch(FAUCET_URL[network], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      FixedAmountRequest: {
        recipient: account,
      },
    }),
  });
};
