import { CLAMM } from '@interest-protocol/clamm-sdk';
import { useSuiClient, useSuiClientContext } from '@mysten/dapp-kit';

import { Network } from '@/constants';

let cachedClamm: CLAMM;

export const useClammSdk = (): CLAMM => {
  const suiClient = useSuiClient();
  const { network } = useSuiClientContext();

  cachedClamm =
    cachedClamm ??
    new CLAMM({
      suiClient: suiClient as any,
      network: network === Network.MAINNET ? 'mainnet' : 'testnet',
    });

  return cachedClamm;
};
