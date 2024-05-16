import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';
import { usePool } from '@/hooks/use-pools';
import { FixedPointMath } from '@/lib';
import { formatDollars } from '@/utils';

import { LINES } from './pool-card.data';
import { FormFilterValue, PoolCardProps } from './pool-card.types';
import {
  getStableLiquidity,
  getVolatileLiquidity,
  isStablePool,
} from './pool-card.utils';
import PoolCardHeader from './pool-card-header';
import PoolCardInfo from './pool-card-info';
import PoolCardTrade from './pool-card-trade';

const PoolCard: FC<PoolCardProps> = ({ pool, coinMetadata, prices }) => {
  const { data, isLoading } = usePool(pool.poolObjectId);

  const loading = isLoading || !data;

  const liquidity = data
    ? isStablePool(data, pool.isStable)
      ? getStableLiquidity(data, coinMetadata, prices)
      : getVolatileLiquidity(data, coinMetadata, prices)
    : 0;

  return (
    <Link
      href={`${Routes[RoutesEnum.PoolDetails]}?objectId=${pool.poolObjectId}`}
    >
      <Box
        p="m"
        flex="1"
        gap="xs"
        height="100%"
        display="flex"
        borderRadius="xs"
        bg="lowestContainer"
        flexDirection="column"
        border="0.063rem solid"
        borderColor="outlineVariant"
        justifyContent="space-between"
        transition="all 300ms ease-in-out"
        nHover={{
          cursor: 'pointer',
          borderColor: '#76767A',
          boxShadow: '0px 24px 46px -10px rgba(13, 16, 23, 0.16)',
          '.arrow-wrapper': { opacity: 1 },
        }}
      >
        <PoolCardHeader
          tags={[
            'CLAMM',
            pool.isStable ? FormFilterValue.stable : FormFilterValue.volatile,
          ]}
        />
        <PoolCardInfo coinTypes={pool.coinTypes} coinMetadata={coinMetadata} />
        <Box px="m" py="xs" bg="surface" borderRadius="1rem">
          {LINES.map((line, index) => (
            <PoolCardTrade
              {...line}
              index={index}
              key={v4()}
              amount={
                loading
                  ? '--'
                  : !pool
                    ? '0'
                    : index
                      ? !prices
                        ? '0'
                        : formatDollars(liquidity)
                      : isStablePool(data, pool.isStable)
                        ? `${FixedPointMath.toNumber(
                            BigNumber(
                              String(data.state.fees.feeInPercent)
                            ).times(100),
                            18
                          )}% / ${FixedPointMath.toNumber(
                            BigNumber(
                              String(data.state.fees.feeOutPercent)
                            ).times(100),
                            18
                          )}%`
                        : `${FixedPointMath.toNumber(
                            BigNumber(String(data.state.fees.midFee)).div(
                              100000000
                            ),
                            0
                          )}% / ${FixedPointMath.toNumber(
                            BigNumber(String(data.state.fees.outFee)).div(
                              100000000
                            ),
                            0
                          )}%`
              }
            />
          ))}
        </Box>
      </Box>
    </Link>
  );
};

export default PoolCard;
