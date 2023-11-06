import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';

const localClient = new SuiClient({ url: getFullnodeUrl('localnet') });
const devClient = new SuiClient({ url: getFullnodeUrl('devnet') });
const testnetClient = new SuiClient({ url: getFullnodeUrl('testnet') });
const mainnetClient = new SuiClient({
  url: 'https://api.shinami.com/node/v1/sui_mainnet_f8ba2ad72d9ad60899e56d2f9d813e2b',
});

export type SuiNetwork =
  | 'sui:mainnet'
  | 'sui:testnet'
  | 'sui:devnet'
  | 'sui:localnet';

const map = {
  'sui:mainnet': mainnetClient,
  'sui:localnet': localClient,
  'sui:devnet': devClient,
  'sui:testnet': testnetClient,
} as Record<SuiNetwork, SuiClient>;

export const useSuiClient = (network: SuiNetwork): SuiClient => map[network];
