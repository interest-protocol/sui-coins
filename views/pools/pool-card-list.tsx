import {
  Box,
  Motion,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { useNetwork } from '@/context/network';
import { useFindPoolsByCoinTypes } from '@/hooks/use-find-pools-by-coin-types';
import { useGetCoinMetadata } from '@/hooks/use-get-coin-metadata';
import useGetMultipleTokenPriceBySymbol from '@/hooks/use-get-multiple-token-price-by-symbol';
import { useModal } from '@/hooks/use-modal';
import { usePools } from '@/hooks/use-pools';
import { AmmPool } from '@/interface';
import { getAllSymbols } from '@/views/pools/pools.utils';

import FindPoolDialog from './find-pool-modal/find-pool-dialog';
import PoolCard from './pool-card';
import {
  PoolCardListContentProps,
  PoolCardListProps,
  PoolCardListWrapper,
  PoolForm,
  PoolTabEnum,
} from './pools.types';

const Pools: FC<PoolCardListWrapper> = ({ network }) => {
  const { data: pools, isLoading: arePoolsLoading } = usePools();

  return (
    <PoolCardListContent
      network={network}
      pools={pools || []}
      arePoolsLoading={arePoolsLoading}
    />
  );
};

const Position: FC<PoolCardListWrapper> = ({ network }) => {
  const { data, isLoading } = useFindPoolsByCoinTypes();

  return (
    <PoolCardListContent
      network={network}
      pools={data || []}
      arePoolsLoading={isLoading}
    />
  );
};

const PoolCardListContent: FC<PoolCardListContentProps> = ({
  arePoolsLoading,
  pools,
}) => {
  const { setModal, handleClose } = useModal();

  const symbols = getAllSymbols(pools);

  const { data: pricesRecord, isLoading: arePricesLoading } =
    useGetMultipleTokenPriceBySymbol(symbols);

  const { data: coinMetadataMap, isLoading: isCoinMetadataLoading } =
    useGetCoinMetadata([
      ...new Set(pools.flatMap((x) => [x.coinTypes.coinX, x.coinTypes.coinY])),
    ]);

  const { control, setValue } = useFormContext<PoolForm>();
  const filterList = useWatch({ control, name: 'filterList' });
  const tokenList = useWatch({ control, name: 'tokenList' });
  const [listPools, setListPools] = useState<readonly AmmPool[] | undefined>();

  const onClose = () => {
    setValue('isFindingPool', false);
    handleClose();
  };

  const sortedPoolList = (poolList?: readonly AmmPool[]) =>
    poolList?.filter((pool) =>
      filterList?.length
        ? filterList.every(({ type, description }) => {
            if (
              type === 'algorithm' &&
              (description === 'stable') === !pool.isVolatile
            )
              return true;

            if (type === 'pool_type' && description === pool.poolType)
              return true;

            return false;
          })
        : true
    );

  const isFindingPool = useWatch({ control, name: 'isFindingPool' });

  const { data: _pools, isLoading: isFilteredPoolsLoading } = useSWR(
    `${isFindingPool}` +
      pools.map((x) => x.poolId).toString() +
      tokenList?.toString(),
    async () => {
      if (!isFindingPool) return pools;

      const filteredPools = pools.filter((pool) => {
        const coinTypes = [pool.coinTypes.coinX, pool.coinTypes.coinY];

        return tokenList.every((x) => coinTypes.includes(x.type));
      });

      toast.dismiss();
      return filteredPools;
      poolPairLoadingModal();
    }
  );

  const poolPairLoadingModal = () => {
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <Box
          display="flex"
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <FindPoolDialog
            title="Finding Pair"
            description="Loading"
            Icon={<ProgressIndicator variant="loading" />}
            onClose={onClose}
            withoutButton
          />
        </Box>
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );
  };

  useEffect(() => {
    setListPools(sortedPoolList(_pools));
  }, [filterList, _pools]);

  if (
    arePoolsLoading ||
    !pricesRecord ||
    !coinMetadataMap ||
    arePricesLoading ||
    isCoinMetadataLoading ||
    !!(isFindingPool && isFilteredPoolsLoading)
  )
    return (
      <Box pt="3xl" width="100%" display="flex" justifyContent="center">
        <ProgressIndicator variant="loading" />
      </Box>
    );

  return (
    <Box
      gap="xs"
      borderRadius="xs"
      p={['s', 's', 's', 'l']}
      display={listPools?.length || pools?.length ? 'grid' : 'flex'}
      gridTemplateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr']}
    >
      {isFindingPool ? (
        listPools?.map((pool) => (
          <PoolCard
            key={v4()}
            pool={pool}
            prices={pricesRecord}
            coinMetadata={coinMetadataMap || {}}
          />
        ))
      ) : pools?.length ? (
        pools.map((pool) => (
          <PoolCard
            key={v4()}
            pool={pool}
            prices={pricesRecord}
            coinMetadata={coinMetadataMap || {}}
          />
        ))
      ) : (
        <Box width="100%" color="white">
          <Typography size="small" variant="display">
            No pool found!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const PoolCardList: FC<PoolCardListProps> = ({ tab }) => {
  const network = useNetwork();

  return tab === PoolTabEnum.Pools ? (
    <Pools network={network} />
  ) : (
    <Position network={network} />
  );
};

export default PoolCardList;
