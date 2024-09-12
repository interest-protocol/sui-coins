/**
 * @RoutesEnum is a custom data type
 * @description this data type will help us to uniformize our route names
 */
export enum RoutesEnum {
  DCA = 'dca',
  Swap = 'swap',
  Send = 'send',
  Pools = 'pools',
  Merge = 'merge',
  Airdrop = 'airdrop',
  Metrics = 'metrics',
  FindPool = 'find-pool',
  SendLink = 'send-link',
  SendBulk = 'send-bulk',
  DCAOrders = 'dca-orders',
  CreateCoin = 'create-coin',
  Incinerator = 'incinerator',
  CreatePool = 'create-pool',
  SendHistory = 'send-history',
  PoolDetails = 'pool-details',
  SendTransfer = 'send-transfer',
}

/**
 * @Routes is the constant with our internal or external routes
 * @description this constant will help us to create standard routes
 */
export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.Swap]: '/',
  [RoutesEnum.DCA]: '/dca',
  [RoutesEnum.Send]: '/send',
  [RoutesEnum.Pools]: '/pools',
  [RoutesEnum.Merge]: '/merge',
  [RoutesEnum.Metrics]: '/metrics',
  [RoutesEnum.Airdrop]: '/airdrop',
  [RoutesEnum.SendLink]: '/send/link',
  [RoutesEnum.SendBulk]: '/send-bulk',
  [RoutesEnum.FindPool]: '/pools/find',
  [RoutesEnum.DCAOrders]: '/dca/orders',
  [RoutesEnum.CreateCoin]: '/create-coin',
  [RoutesEnum.Incinerator]: '/incinerator',
  [RoutesEnum.CreatePool]: '/pools/create',
  [RoutesEnum.SendHistory]: '/send/history',
  [RoutesEnum.PoolDetails]: '/pools/details',
  [RoutesEnum.SendTransfer]: '/send/transfer',
};
