/**
 * @RoutesEnum is a custom data type
 * @description this data type will help us to uniformize our route names
 */
export enum RoutesEnum {
  Swap = 'swap',
  Pools = 'pools',
  Faucet = 'faucet',
  Airdrop = 'airdrop',
  Analytics = 'analytics',
  PoolCreate = 'pool-create',
  CreateToken = 'create-token',
  PoolDetails = 'pool-details',
}

/**
 * @Routes is the constant with our internal or external routes
 * @description this constant will help us to create standard routes
 */
export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.Swap]: '/',
  [RoutesEnum.Pools]: '/pools',
  [RoutesEnum.Faucet]: '/faucet',
  [RoutesEnum.Airdrop]: '/airdrop',
  [RoutesEnum.Analytics]: '/analytics',
  [RoutesEnum.PoolCreate]: '/pools/create',
  [RoutesEnum.CreateToken]: '/create-token',
  [RoutesEnum.PoolDetails]: '/pools/details',
};
