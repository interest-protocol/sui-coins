import { FAUCET_URL } from '@/constants';
import { Network } from '@/constants/network';

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
