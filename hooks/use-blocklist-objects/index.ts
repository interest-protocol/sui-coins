import {
  useCurrentAccount,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import useSWR from 'swr';

import {
  COIN_GUARDIANS_BLOCKLIST,
  OBJECT_GUARDIANS_BLOCKLIST,
} from '@/constants/guardians';

export const useBlocklist = () => {
  const suiClient = useSuiClient();
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();

  return useSWR('suiet-guardians', async () => {
    const objectsList = await Promise.all([
      fetch('https://guardians.suiet.app/object-list.json')
        .then((response) => response.json?.())
        .then((data) => data.blocklist)
        .catch(() => OBJECT_GUARDIANS_BLOCKLIST),
      fetch('https://guardians.suiet.app/coin-list.json')
        .then((response) => response.json?.())
        .then((data) => data.blocklist)
        .catch(() => COIN_GUARDIANS_BLOCKLIST),
    ]).then((response) => response.flat());
  });
};
