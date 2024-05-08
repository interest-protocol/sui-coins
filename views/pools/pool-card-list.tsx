import {
  Box,
  Motion,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { useGetPoolsByLpCoinTypes } from 'hooks/use-get-pools-by-lpcointypes';
import { useRouter } from 'next/router';
import { inc } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { PAGE_SIZE, Routes, RoutesEnum } from '@/constants';
import { useGetCoinMetadata } from '@/hooks/use-get-coin-metadata';
import useGetMultipleTokenPriceBySymbol from '@/hooks/use-get-multiple-token-price-by-symbol';
import { useModal } from '@/hooks/use-modal';
import { usePools } from '@/hooks/use-pools';
import { AmmPool } from '@/interface';
import { PlusSVG } from '@/svg';
import { getAllSymbols } from '@/views/pools/pools.utils';

import FindPoolDialog from './find-pool-modal/find-pool-dialog';
import PoolCard from './pool-card';
import PoolCardSkeleton from './pool-card/pool-card-skeleton';
import {
  PoolCardListContentProps,
  PoolCardListProps,
  PoolForm,
  PoolTabEnum,
} from './pools.types';

const Pools: FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading: arePoolsLoading } = usePools(page);
  const [pools, setPools] = useState<ReadonlyArray<AmmPool>>([]);

  const safeData = data ?? { pools: [], totalItems: 0 };

  const nextPage = () => setPage(inc);

  useEffect(() => {
    if (page > Math.ceil(pools.length / PAGE_SIZE))
      setPools([...pools, ...safeData.pools]);
  }, [safeData]);

  return (
    <PoolCardListContent
      pools={pools}
      nextPage={nextPage}
      totalItems={safeData.totalItems}
      arePoolsLoading={arePoolsLoading}
      hasMore={safeData.totalItems - page * PAGE_SIZE > 0}
    />
  );
};

const Position: FC = () => {
  const { data, isLoading } = useGetPoolsByLpCoinTypes();

  const safeData = data ?? [];

  return <PoolCardListContent pools={safeData} arePoolsLoading={isLoading} />;
};

const PoolCardListContent: FC<PoolCardListContentProps> = ({
  pools,
  hasMore,
  nextPage,
  totalItems,
  arePoolsLoading,
}) => {
  const { push } = useRouter();
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

      if (filteredPools.length) return filteredPools;

      poolPairLoadingModal();
      toast.dismiss();
      poolPairFailedModal();
      return [];
    }
  );

  const createPool = () => {
    push(Routes[RoutesEnum.PoolCreate]);
    onClose();
  };

  const poolPairFailedModal = () => {
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
            onClose={onClose}
            onCreatePool={createPool}
            title="Pool doesn't exist"
            description="If you like, you can create this pool"
            Icon={<PlusSVG maxWidth="1rem" maxHeight="1rem" width="100%" />}
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

  if (isFindingPool)
    return (
      <Box
        gap="xs"
        borderRadius="xs"
        p={['s', 's', 's', 'l']}
        display={listPools?.length || pools?.length ? 'grid' : 'flex'}
        gridTemplateColumns={[
          '1fr',
          '1fr',
          '1fr 1fr',
          '1fr 1fr',
          '1fr 1fr 1fr',
        ]}
      >
        {listPools?.map((pool) => (
          <PoolCard
            key={v4()}
            pool={pool}
            prices={pricesRecord}
            coinMetadata={coinMetadataMap || {}}
          />
        ))}
      </Box>
    );

  if (!pools)
    return (
      <Box width="100%" color="white">
        <Typography size="small" variant="display">
          No pool found!
        </Typography>
      </Box>
    );

  if (!pools.length)
    return (
      <Box
        gap="xs"
        display="grid"
        borderRadius="xs"
        p={['s', 's', 's', 'l']}
        gridTemplateColumns={[
          '1fr',
          '1fr',
          '1fr 1fr',
          '1fr 1fr',
          '1fr 1fr 1fr',
        ]}
      >
        <PoolCardSkeleton />
      </Box>
    );

  return (
    <InfiniteScroll
      hasMore={!!hasMore}
      dataLength={totalItems ?? 0}
      next={() => nextPage?.()}
      loader={
        <Box pt="3xl" width="100%" display="flex" justifyContent="center">
          <ProgressIndicator variant="loading" />
        </Box>
      }
    >
      <Box
        gap="xs"
        borderRadius="xs"
        p={['s', 's', 's', 'l']}
        display={listPools?.length || pools?.length ? 'grid' : 'flex'}
        gridTemplateColumns={[
          '1fr',
          '1fr',
          '1fr 1fr',
          '1fr 1fr',
          '1fr 1fr 1fr',
        ]}
      >
        {pools.map((pool) => (
          <PoolCard
            key={v4()}
            pool={pool}
            prices={pricesRecord}
            coinMetadata={coinMetadataMap || {}}
          />
        ))}
      </Box>
    </InfiniteScroll>
  );
};

const PoolCardList: FC<PoolCardListProps> = ({ tab }) =>
  tab === PoolTabEnum.Pools ? <Pools /> : <Position />;

export default PoolCardList;
