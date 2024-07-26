import { InterestPool } from '@interest-protocol/clamm-sdk';
import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { inc } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Network, PAGE_SIZE } from '@/constants';
import { CATEGORY_POOLS } from '@/constants/clamm';
import { useGetCoinMetadata } from '@/hooks/use-get-coin-metadata';
import useGetMultipleTokenPriceByType from '@/hooks/use-get-multiple-token-price-by-type';
import { usePools } from '@/hooks/use-pools';
import { useWeb3 } from '@/hooks/use-web3';
import { FormFilterValue } from '@/views/pools/pool-card/pool-card.types';

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
  const isFindingPool = useWatch({
    control: formContext.control,
    name: 'isFindingPool',
  });

  const tokenList = formContext.getValues('tokenList');

  const query =
    filterProps.reduce((acc, filterProp) => {
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
    }, DEFAULT_QUERY) ?? DEFAULT_QUERY;

  const [pools, setPools] = useState<ReadonlyArray<InterestPool> | undefined>();
  const { data, isLoading: arePoolsLoading } = usePools(
    page,
    isFindingPool
      ? {
          $and: [
            ...DEFAULT_QUERY,
            ...tokenList.map(({ type }) => ({
              coinTypes: { $in: [type] },
            })),
          ],
        }
      : {
          $and: query,
        }
  );

  useEffect(() => {
    setPools(undefined);
  }, [filterProps, isFindingPool]);

  const safeData = data ?? { pools: [], totalPages: 0 };

  const nextPage = () => setPage(inc);

  useEffect(() => {
    const dataIds = safeData.pools.map(({ poolObjectId }) => poolObjectId);

    if (
      safeData &&
      safeData.totalPages &&
      page <= safeData.totalPages &&
      !!safeData.pools.length &&
      !pools?.some(({ poolObjectId }) => dataIds.includes(poolObjectId))
    )
      setPools((pools) => (pools || [])?.concat(safeData.pools));
  }, [safeData, pools]);

  return (
    <PoolCardListContent
      pools={pools}
      nextPage={nextPage}
      totalItems={safeData?.totalPages ?? 0}
      arePoolsLoading={arePoolsLoading || !data}
      done={!!data?.done}
    />
  );
};

const Position: FC = () => {
  const { coins } = useWeb3();
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
    [
      {
        lpCoinType: {
          $in: coins.reduce(
            (acc, { type }) => (type.includes('IPX') ? [...acc, type] : acc),
            [] as ReadonlyArray<string>
          ),
        },
      },
    ] as Record<any, any>[]
  ) ?? [
    {
      lpCoinType: {
        $in: coins.reduce(
          (acc, { type }) => (type.includes('IPX') ? [...acc, type] : acc),
          [] as ReadonlyArray<string>
        ),
      },
    },
  ];

  const [pools, setPools] = useState<ReadonlyArray<InterestPool>>([]);
  const { data, isLoading: arePoolsLoading } = usePools(page, {
    $and: filterQuery,
  });

  useEffect(() => {
    setPools([]);
  }, [filterProps]);

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
      arePoolsLoading={arePoolsLoading || !pools}
      totalItems={data?.totalPages ?? 0}
      done={!!data?.done}
    />
  );
};

const PoolCardListContent: FC<PoolCardListContentProps> = ({
  pools,
  nextPage,
  totalItems,
  arePoolsLoading,
  done,
}) => {
  const hasPoolsList = !!(pools && pools.length);

  const hasMore = !!(
    totalItems &&
    hasPoolsList &&
    totalItems > Math.ceil(pools.length / PAGE_SIZE)
  );

  const { data: pricesRecord, isLoading: arePricesLoading } =
    useGetMultipleTokenPriceByType([
      ...new Set(pools?.flatMap((pool) => pool.coinTypes) ?? []),
    ]);

  console.log({ pricesRecord });

  const { data: coinMetadataMap, isLoading: isCoinMetadataLoading } =
    useGetCoinMetadata([...new Set(pools?.flatMap((pool) => pool.coinTypes))]);

  if (
    (arePoolsLoading ||
      !pricesRecord ||
      !coinMetadataMap ||
      arePricesLoading ||
      isCoinMetadataLoading ||
      !pools) &&
    !done
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

  if (!!pools && !pools.length && done)
    return (
      <Box width="100%" color="onSurface" my="3xl">
        <Typography size="small" variant="display">
          No pool found!
        </Typography>
      </Box>
    );

  return (
    <>
      <Box
        gap="xs"
        borderRadius="xs"
        p={['s', 's', 's', 'l']}
        display={pools?.length ? 'grid' : 'flex'}
        gridTemplateColumns={[
          '1fr',
          '1fr',
          '1fr 1fr',
          '1fr 1fr',
          '1fr 1fr 1fr',
        ]}
      >
        {pools?.map((pool) => (
          <PoolCard
            key={v4()}
            pool={pool}
            prices={pricesRecord || {}}
            coinMetadata={coinMetadataMap || {}}
          />
        ))}
        {arePoolsLoading && <PoolCardSkeleton />}
      </Box>
      {hasMore && (
        <Box mx="m" display="flex" justifyContent="center">
          <Button variant="filled" onClick={nextPage}>
            Load more
          </Button>
        </Box>
      )}
    </>
  );
};

const PoolCardList: FC<PoolCardListProps> = ({ tab }) =>
  tab === PoolTabEnum.Pools ? <Pools /> : <Position />;

export default PoolCardList;
