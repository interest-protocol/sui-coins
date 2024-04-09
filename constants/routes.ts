/**
 * @RoutesEnum is a custom data type
 * @description this data type will help us to uniformize our route names
 */
export enum RoutesEnum {
  Swap = 'swap',
  Send = 'send',
  Pools = 'pools',
  Faucet = 'faucet',
  Airdrop = 'airdrop',
  Metrics = 'metrics',
  FindPool = 'find-pool',
  SendLink = 'send-link',
  SendBulk = 'send-bulk',
  CreateCoin = 'create-coin',
  CreatePool = 'create-pool',
  SendHistory = 'send-history',
  PoolDetails = 'pool-details',
}

/**
 * @Routes is the constant with our internal or external routes
 * @description this constant will help us to create standard routes
 */
export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.Swap]: '/',
  [RoutesEnum.Send]: '/send',
  [RoutesEnum.Pools]: '/pools',
  [RoutesEnum.Faucet]: '/faucet',
  [RoutesEnum.Metrics]: '/metrics',
  [RoutesEnum.Airdrop]: '/airdrop',
  [RoutesEnum.SendLink]: '/send/link',
  [RoutesEnum.SendBulk]: '/send-bulk',
  [RoutesEnum.FindPool]: '/pools/find',
  [RoutesEnum.CreateCoin]: '/create-coin',
  [RoutesEnum.CreatePool]: '/pools/create',
  [RoutesEnum.SendHistory]: '/send/history',
  [RoutesEnum.PoolDetails]: '/pools/details',
};
