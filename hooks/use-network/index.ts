import { useSuiClientContext } from '@mysten/dapp-kit';

import { Network } from '@/constants';

export const useNetwork = () => useSuiClientContext().network as Network;
