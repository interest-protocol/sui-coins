import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import Layout from '@/components/layout';
import { Network, Routes, RoutesEnum, TOKEN_ICONS } from '@/constants';
import { RECOMMENDED_POOLS } from '@/constants/pools';
import { useNetwork } from '@/context/network';

import { getSymbol } from '../airdrop/airdrop.utils';
import PoolTitleBar from '../components/pool-title-bar';
import Error from '../error';
import { PoolDetailsProps } from './pool-details.types';
import PoolForm from './pool-form';
import PoolTransaction from './pool-transaction';

const PoolDetails: FC<PoolDetailsProps> = ({ objectId }) => {
  const { push } = useRouter();
  const { network } = useNetwork();

  const pool = RECOMMENDED_POOLS[network].find(
    ({ poolObjectId }) => poolObjectId === objectId
  );

  if (!pool) return <Error message="Pool Not Found" />;

  const isMainnet = Network.MAINNET === network;

  const { token0, token1 } = pool;
  const Token0Icon =
    TOKEN_ICONS[network][isMainnet ? token0.type : token0.symbol];
  const Token1Icon =
    TOKEN_ICONS[network][isMainnet ? token1.type : token1.symbol];

  return (
    <Layout>
      <PoolTitleBar
        iconTokenList={[Token0Icon, Token1Icon]}
        onBack={() => push(Routes[RoutesEnum.Pools])}
        name={`${getSymbol(token0.symbol, token0.type)}•${getSymbol(
          token1.symbol,
          token1.type
        )}`}
      />
      <Box
        gap="xs"
        mx="auto"
        flexDirection="column"
        gridTemplateColumns="62% 38%"
        display={['flex', 'flex', 'flex', 'grid']}
        width="100%"
      >
        <PoolForm />
        <PoolTransaction />
      </Box>
    </Layout>
  );
};

export default PoolDetails;
