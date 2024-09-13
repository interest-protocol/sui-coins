export const isValidSuiNetwork = (
  network: string
): network is 'mainnet' | 'testnet' | 'devnet' | 'localnet' =>
  ['mainnet', 'testnet', 'devnet', 'localnet'].includes(network);
