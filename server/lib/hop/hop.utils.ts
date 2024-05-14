import type { GetQuoteResponse } from '@hop.ag/sdk/dist/sdk/routes/quote';
import type { Trade } from '@hop.ag/sdk/dist/sdk/util';

export interface JSONQuoteResponse {
  trade: Trade;
  amount_out_with_fee: string;
}

export const quoteResponseToJSONQuoteResponse = (
  quote: GetQuoteResponse
): JSONQuoteResponse =>
  JSON.parse(
    JSON.stringify(quote, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );
