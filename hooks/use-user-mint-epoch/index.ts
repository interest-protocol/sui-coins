import { useSuiClient } from '@mysten/dapp-kit';
import { bcs } from '@mysten/sui.js/bcs';
import { SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import useSWR from 'swr';

import { CONTROLLERS_MAP } from '@/constants';
import {
  ETH_TYPE,
  MINT_MODULE_NAME_MAP,
  Network,
  PACKAGES,
  USDC_TYPE,
} from '@/constants';
import { useNetwork } from '@/context/network';
import { makeSWRKey } from '@/utils';
import { getReturnValuesFromInspectResults } from '@/utils';

import { useWeb3 } from '../use-web3';

const getLastMintEpoch = async (
  suiClient: SuiClient,
  coinType: string,
  account: string,
  network: Network
) => {
  const txb = new TransactionBlock();

  txb.moveCall({
    target: `${PACKAGES[network].COINS}::${MINT_MODULE_NAME_MAP[coinType]}::user_last_epoch`,
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
  const network = useNetwork();
  const client = useSuiClient();
  const { account } = useWeb3();

  const { data } = useSWR(
    makeSWRKey([account], ''),
    async () => {
      if (!account) return;

      const [ethLastMintResponse, usdcLastMintEpoch] = await Promise.all([
        getLastMintEpoch(client, ETH_TYPE, account, network),
        getLastMintEpoch(client, USDC_TYPE, account, network),
      ]);

      return {
        ETH: ethLastMintResponse,
        USDC: usdcLastMintEpoch,
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
      ETH: '0',
      USDC: '0',
    }
  );
};
