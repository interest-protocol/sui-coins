export const getPoolCoinTypes = (poolType: string) => {
  const [coinX, coinY, lpCoin] = poolType.split('PoolState<')[1].split(',');

  return {
    coinX,
    coinY: coinY.trim(),
    lpCoin: lpCoin.trim().slice(0, -1),
  };
};
