/**
 * @RoutesEnum is a custom data type
 * @description this data type will help us to uniformize our route names
 */
export enum RoutesEnum {
  Swap = 'swap',
  Faucet = 'faucet',
  Airdrop = 'airdrop',
  MyCoins = 'my-coins',
  CreateToken = 'create-token',
  Pools = 'pools',
}

/**
 * @Routes is the constant with our internal or external routes
 * @description this constant will help us to create standard routes
 */
export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.Swap]: '/',
  [RoutesEnum.Faucet]: '/faucet',
  [RoutesEnum.Airdrop]: '/airdrop',
  [RoutesEnum.MyCoins]: '/my-coins',
  [RoutesEnum.CreateToken]: '/create-token',
  [RoutesEnum.Pools]: '/pools',
};
