/**
 * @RoutesEnum is a custom data type
 * @description this data type will help us to uniformize our route names
 */
export enum RoutesEnum {
  Swap = 'swap',
  Pools = 'pools',
  Faucet = 'faucet',
  Airdrop = 'airdrop',
  Metrics = 'metrics',
  MyCoins = 'my-coins',
  CreateCoin = 'create-coin',
  CreatePool = 'create-pool',
  FindPool = 'find-pool',
  PoolDetails = 'pool-details',
}

/**
 * @Routes is the constant with our internal or external routes
 * @description this constant will help us to create standard routes
 */
export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.CreateCoin]: '/',
  [RoutesEnum.Swap]: '/swap',
  [RoutesEnum.Pools]: '/pools',
  [RoutesEnum.Faucet]: '/faucet',
  [RoutesEnum.Metrics]: '/metrics',
  [RoutesEnum.Airdrop]: '/airdrop',
  [RoutesEnum.MyCoins]: '/my-coins',
  [RoutesEnum.FindPool]: '/pools/find',
  [RoutesEnum.CreatePool]: '/pools/create',
  [RoutesEnum.PoolDetails]: '/pools/details',
};
