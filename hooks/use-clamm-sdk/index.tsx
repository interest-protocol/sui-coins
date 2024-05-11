import { CLAMM } from '@interest-protocol/clamm-sdk';
import { useSuiClient } from '@mysten/dapp-kit';

import { Network } from '@/constants';
import { useNetwork } from '@/context/network';

let cachedClamm: CLAMM;

export const useClammSdk = (): CLAMM => {
  const network = useNetwork();
  const suiClient = useSuiClient();

  cachedClamm =
    cachedClamm ??
    new CLAMM({
      suiClient,
      network: network === Network.MAINNET ? 'mainnet' : 'testnet',
    });

  return cachedClamm;
};
