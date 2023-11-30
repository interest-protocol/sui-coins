import { bcs } from '@mysten/sui.js/bcs';
import { SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import useSWR from 'swr';

import { CONTROLLERS_MAP } from '@/constants';
import { ETH_TYPE, USDC_TYPE } from '@/constants/coins';
import { MINT_MODULE_NAME_MAP, PACKAGES } from '@/constants/packages';
import { TOKEN_SYMBOL } from '@/lib';
import { makeSWRKey } from '@/utils';
import { getReturnValuesFromInspectResults } from '@/utils';

import { useMovementClient } from '../use-movement-client';
import { useWeb3 } from '../use-web3';
const getLastMintEpoch = async (
  suiClient: SuiClient,
  coinType: string,
  account: string
) => {
  const txb = new TransactionBlock();

  txb.moveCall({
    target: `${PACKAGES.COINS}::${MINT_MODULE_NAME_MAP[coinType]}::user_last_epoch`,
    arguments: [txb.object(CONTROLLERS_MAP[coinType]), txb.pure(account)],
  });

  const response = await suiClient.devInspectTransactionBlock({
    transactionBlock: txb,
    sender: account,
  });

  if (response.effects.status.status === 'failure') return '0';

  const data = getReturnValuesFromInspectResults(response);

  if (!data || !data.length) return '0';

  const result = data[0];

  return bcs.de(result[1], Uint8Array.from(result[0])) as string;
};

export const useUserMintEpoch = () => {
  const { account } = useWeb3();
  const client = useMovementClient();

  const { data } = useSWR(
    makeSWRKey([account], ''),
    async () => {
      if (!account) return;

      const [ethLastMintResponse, usdcLastMintEpoch] = await Promise.all([
        getLastMintEpoch(client, ETH_TYPE, account),
        getLastMintEpoch(client, USDC_TYPE, account),
      ]);

      return {
        [TOKEN_SYMBOL.ETH]: ethLastMintResponse,
        [TOKEN_SYMBOL.USDC]: usdcLastMintEpoch,
      };
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
      refreshInterval: 10000,
    }
  );

  return (
    data ?? {
      [TOKEN_SYMBOL.ETH]: '0',
      [TOKEN_SYMBOL.USDC]: '0',
    }
  );
};
