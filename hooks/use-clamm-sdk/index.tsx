import { CLAMM } from '@interest-protocol/clamm-sdk';
import { useSuiClient } from '@mysten/dapp-kit';

import { Network } from '@/constants';
import { CLAMM_PACKAGE_ADDRESSES } from '@/constants/dex';
import { useNetwork } from '@/context/network';

let cachedClamm: CLAMM;

export const useClammSdk = (): CLAMM => {
  const network = useNetwork();
  const suiClient = useSuiClient();

  cachedClamm =
    cachedClamm ??
    new CLAMM({
      suiClient,
      packageAddress: CLAMM_PACKAGE_ADDRESSES[network].CLAMM,
      suiTearsAddress: CLAMM_PACKAGE_ADDRESSES[network].SUITEARS,
      network: network === Network.MAINNET ? 'mainnet' : 'testnet',
    });

  return cachedClamm;
};
