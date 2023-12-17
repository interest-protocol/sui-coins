/**
 * @RoutesEnum is a custom data type
 * @description this data type will help us to uniformize our route names
 */
export enum RoutesEnum {
  Swap = 'swap',
  Pools = 'pools',
  MyCoins = 'my-coins',
  CreateCoin = 'create-coin',
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
  [RoutesEnum.PoolDetails]: '/pools/details',
  [RoutesEnum.MyCoins]: '/my-coins',
};
