import { bcs } from '@mysten/sui.js/bcs';
import { SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import useSWR from 'swr';

import { ETH_CONTROLLER, USDC_CONTROLLER } from '@/constants';
import { ETH_TYPE, USDC_TYPE } from '@/constants/coins';
import { PACKAGES } from '@/constants/packages';
import { makeSWRKey } from '@/utils';
import { getReturnValuesFromInspectResults } from '@/utils';

import { useMovementClient } from '../use-movement-client';
import { useWeb3 } from '../use-web3';

const CONTROLLER_MAP = {
  [USDC_TYPE]: USDC_CONTROLLER,
  [ETH_TYPE]: ETH_CONTROLLER,
} as Record<string, string>;

const MODULE = {
  [USDC_TYPE]: 'usdc',
  [ETH_TYPE]: 'eth',
} as Record<string, string>;

const getLastMintEpoch = async (
  suiClient: SuiClient,
  coinType: string,
  account: string
) => {
  const txb = new TransactionBlock();

  txb.moveCall({
    target: `${PACKAGES.COINS}::${MODULE[coinType]}::user_last_epoch`,
    arguments: [txb.object(CONTROLLER_MAP[coinType]), txb.pure(account)],
  });

  const response = await suiClient.devInspectTransactionBlock({
    transactionBlock: txb,
    sender: account,
  });

  if (response.effects.status.status === 'failure') return '0';

  const data = getReturnValuesFromInspectResults(response);

  if (!data || !data.length) return '0';

  const result = data[0];

  console.log('RESULT', result);

  return bcs.de(result[1], Uint8Array.from(result[0])) as string;
};

export const useUserMintEpoch = () => {
  const { account } = useWeb3();
  const client = useMovementClient();

  const { data, error } = useSWR(
    makeSWRKey([account], ''),
    async () => {
      if (!account)
        return {
          lastETHEpoch: '0',
          lastUSDCEpoch: '0',
        };

      const [ethLastMintResponse, usdcLastMintEpoch] = await Promise.all([
        getLastMintEpoch(client, ETH_TYPE, account),
        getLastMintEpoch(client, USDC_TYPE, account),
      ]);

      return {
        lastETHEpoch: ethLastMintResponse,
        lastUSDCEpoch: usdcLastMintEpoch,
      };
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
      refreshInterval: 10000,
    }
  );

  console.log('ERROR', error);

  return data
    ? data
    : {
        lastETHEpoch: '0',
        lastUSDCEpoch: '0',
      };
};
