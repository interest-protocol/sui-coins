import { InterestPool, PoolMetadata } from '@interest-protocol/clamm-sdk';
import {
  Box,
  Motion,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { inc, isEmpty } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { Network, PAGE_SIZE } from '@/constants';
import { CATEGORY_POOLS } from '@/constants/clamm';
import { useGetCoinMetadata } from '@/hooks/use-get-coin-metadata';
import useGetMultipleTokenPriceBySymbol from '@/hooks/use-get-multiple-token-price-by-symbol';
import { useModal } from '@/hooks/use-modal';
import { usePools } from '@/hooks/use-pools';
import { useWeb3 } from '@/hooks/use-web3';
import { FormFilterValue } from '@/views/pools/pool-card/pool-card.types';
import { getAllSymbols } from '@/views/pools/pools.utils';

import FindPoolDialog from './find-pool-modal/find-pool-dialog';
import PoolCard from './pool-card';
import PoolCardSkeleton from './pool-card/pool-card-skeleton';
import {
  FilterTypeEnum,
  PoolCardListContentProps,
  PoolCardListProps,
  PoolForm,
  PoolTabEnum,
} from './pools.types';

const DEFAULT_QUERY = [
  { $or: [{ hooks: { $exists: false } }, { hooks: null }] },
] as Record<any, any>[];

const Pools: FC = () => {
  const [page, setPage] = useState(1);
  const formContext = useFormContext<PoolForm>();
  const { network } = useSuiClientContext();

  const filterProps = useWatch({
    control: formContext.control,
    name: 'filterList',
  });

  const filterQuery = filterProps.reduce(
    (acc, filterProp) => {
      if (
        filterProp.type === FilterTypeEnum.CATEGORY &&
        filterProp.value !== FormFilterValue.all
      ) {
        const ids: string[] =
          CATEGORY_POOLS[filterProp.value][network as Network];
        return [...acc, { poolObjectId: { $in: ids } }];
      }

      if (filterProp.type === FilterTypeEnum.ALGORITHM) {
        const pred = filterProp.value !== FormFilterValue.volatile;
        return [...acc, { isStable: pred }];
      }

      return acc;
    },
    [] as Record<any, any>[]
  );

  const [pools, setPools] = useState<ReadonlyArray<InterestPool>>([]);
  const { data, isLoading: arePoolsLoading } = usePools(page, {
    $and: isEmpty(filterQuery)
      ? DEFAULT_QUERY
      : DEFAULT_QUERY.concat(filterQuery),
  });

  const safeData = data ?? { pools: [], totalPages: 0 };

  const nextPage = () => setPage(inc);

  useEffect(() => {
    const dataIds = safeData.pools.map(({ poolObjectId }) => poolObjectId);

    if (
      safeData &&
      safeData.totalPages &&
      page <= safeData.totalPages &&
      !pools.some(({ poolObjectId }) => dataIds.includes(poolObjectId))
    )
      setPools((pools) => pools.concat(safeData.pools));
  }, [safeData, pools]);

  return (
    <PoolCardListContent
      pools={pools}
      nextPage={nextPage}
      totalItems={safeData?.totalPages ?? 0}
      arePoolsLoading={arePoolsLoading}
      hasMore={(safeData?.totalPages ?? 0) - page * PAGE_SIZE > 0}
    />
  );
};

const Position: FC = () => {
  const { coins } = useWeb3();
  const [page, setPage] = useState(1);
  const [pools, setPools] = useState<ReadonlyArray<InterestPool>>([]);
  const { data, isLoading: arePoolsLoading } = usePools(page, {
    lpCoinType: {
      $in: coins.reduce(
        (acc, { type }) => (type.includes('IPX') ? [...acc, type] : acc),
        [] as ReadonlyArray<string>
      ),
    },
  });

  const safeData = data ?? { pools: [], totalPages: 0 };

  const nextPage = () => setPage(inc);

  useEffect(() => {
    const dataIds = safeData.pools.map(({ poolObjectId }) => poolObjectId);

    if (
      data &&
      data.totalPages &&
      page <= data.totalPages &&
      !pools.some(({ poolObjectId }) => dataIds.includes(poolObjectId))
    )
      setPools([...pools, ...safeData.pools]);
  }, [data]);

  return (
    <PoolCardListContent
      pools={pools}
      nextPage={nextPage}
      arePoolsLoading={arePoolsLoading}
      totalItems={data?.totalPages ?? 0}
      hasMore={(data?.totalPages ?? 0) - page * PAGE_SIZE > 0}
    />
  );
};

const PoolCardListContent: FC<PoolCardListContentProps> = ({
  pools,
  hasMore,
  nextPage,
  totalItems,
  arePoolsLoading,
}) => {
  const { network } = useSuiClientContext();
  const { setModal, handleClose } = useModal();

  const symbols = getAllSymbols(pools, network as Network);

  const { data: pricesRecord, isLoading: arePricesLoading } =
    useGetMultipleTokenPriceBySymbol(symbols);

  const { data: coinMetadataMap, isLoading: isCoinMetadataLoading } =
    useGetCoinMetadata([...new Set(pools.flatMap((pool) => pool.coinTypes))]);

  const { control, setValue } = useFormContext<PoolForm>();
  const filterList = useWatch({ control, name: 'filterList' });
  const tokenList = useWatch({ control, name: 'tokenList' });
  const [listPools, setListPools] = useState<ReadonlyArray<PoolMetadata>>([]);

  const onClose = () => {
    setValue('isFindingPool', false);
    handleClose();
  };

  const sortedPoolList = (
    poolList: ReadonlyArray<PoolMetadata>
  ): ReadonlyArray<PoolMetadata> =>
    poolList.filter((pool) =>
      filterList?.length
        ? filterList.every(
            ({ type, value }) =>
              type === 'algorithm' &&
              value === (pool.isStable ? 'stable' : 'volatile')
          )
        : true
    );

  const isFindingPool = useWatch({ control, name: 'isFindingPool' });

  const { data: _pools, isLoading: isFilteredPoolsLoading } = useSWR<
    ReadonlyArray<PoolMetadata>
  >(
    `${isFindingPool}` +
      pools.map((x) => x.poolObjectId).toString() +
      tokenList?.toString(),
    async () => {
      if (!isFindingPool) return pools;

      const filteredPools = pools.filter((pool) =>
        tokenList.every((x) => pool.coinTypes.includes(x.type))
      );

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
    setListPools(sortedPoolList(_pools ?? []));
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
