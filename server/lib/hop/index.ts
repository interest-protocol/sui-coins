import type { Trade } from '@hop.ag/sdk';
import { GetQuoteResponse, HopApi } from '@hop.ag/sdk';
import { getFullnodeUrl } from '@mysten/sui/client';
import { normalizeStructTag, toB64 } from '@mysten/sui/utils';

import { TREASURY } from '@/constants';
import { EXCHANGE_FEE_BPS } from '@/constants/fees';
import { mainnetClient } from '@/server/clients';

export interface SwapArg {
  trade: Trade;
  account: string;
  slippage: number;
}

const rpc =
  process.env.NEXT_PUBLIC_SUI_MAINNET_RPC_URL || getFullnodeUrl('mainnet');

const hop_api_options = {
  api_key: process.env.HOP_API_KEY || '',
  fee_bps: EXCHANGE_FEE_BPS,
  fee_wallet: TREASURY,
};

const sdk = new HopApi(rpc, hop_api_options);

export const quote = async (
  token_in: string,
  token_out: string,
  amount_in: bigint
): Promise<GetQuoteResponse> =>
  sdk.fetchQuote({
    token_in: normalizeStructTag(token_in),
    token_out: normalizeStructTag(token_out),
    amount_in,
  });

export const swap = async ({ trade, account, slippage }: SwapArg) => {
  const { transaction } = await sdk.fetchTx({
    trade,
    gas_budget: 1e9,
    sui_address: account,
    max_slippage_bps: slippage,
  });

  const txbArray = await transaction.build({
    client: mainnetClient as any,
    onlyTransactionKind: true,
  });

  return toB64(txbArray);
};
