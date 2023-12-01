import { FAUCET_URL } from '@/constants';

export const requestMov = async (account: string) => {
  return fetch(FAUCET_URL, {
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
