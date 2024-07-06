import BigNumber from 'bignumber.js';

import { FAUCET_AMOUNT, FAUCET_URL } from '@/constants';
import { Network } from '@/constants/network';
import { CoinData } from '@/interface';
import { FixedPointMath } from '@/lib';
import { Quest } from '@/server/model/quest';

export const requestMov = async (account: string, network: Network) =>
  fetch(FAUCET_URL[network], {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      FixedAmountRequest: {
        recipient: account,
      },
    }),
  });

export const logFaucet = (address: string, token: CoinData) => {
  fetch('/api/v1/quest/faucet', {
    method: 'POST',
    headers: {
      Origin: 'https://dashboard.galxe.com',
      'Access-Control-Request-Headers': 'Content-Type',
      'Access-Control-Request-Method': 'POST',
    },
    body: JSON.stringify({
      address,
      kind: 'faucet',
      data: {
        coin: {
          type: token.type,
          symbol: token.symbol,
          amount: String(
            FixedPointMath.toNumber(
              BigNumber(FAUCET_AMOUNT[token.type]),
              token.decimals
            )
          ),
        },
      },
    } as Omit<Quest, 'timestamp'>),
  });
};
