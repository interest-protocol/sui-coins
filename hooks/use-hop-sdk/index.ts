import type { Trade } from '@hop.ag/sdk';
import { Transaction } from '@mysten/sui/transactions';

import type { JSONQuoteResponse } from '@/server/lib/hop/hop.utils';

export const useHopSdk = () => ({
  quote: (coinIn: string, coinOut: string, amountIn: string) =>
    fetch(
      `/api/auth/v1/hop/quote?coinIn=${coinIn}&coinOut=${coinOut}&amountIn=${amountIn}`
    ).then((response) => response.json?.()) as Promise<JSONQuoteResponse>,
  swap: (trade: Trade, account: string, slippage: number) =>
    fetch(`/api/auth/v1/hop/swap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trade, account, slippage }),
    })
      .then((response) => response.json?.())
      .then(({ txb }: { txb: string }) =>
        Transaction.fromKind(txb)
      ) as Promise<Transaction>,
});
