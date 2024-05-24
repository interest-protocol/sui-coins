import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { FilterQuery } from 'mongoose';
import { inc, values } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIsMounted } from 'usehooks-ts';
import { v4 } from 'uuid';

import { Network, PAGE_SIZE } from '@/constants';
import { CATEGORY_POOLS } from '@/constants/pools';
import { useWeb3 } from '@/hooks';
import { useGetCoinMetadata } from '@/hooks/use-get-coin-metadata';
import useGetMultipleTokenPriceBySymbol from '@/hooks/use-get-multiple-token-price-by-symbol';
import { usePools } from '@/hooks/use-pools';
import { getAllSymbols } from '@/views/pools/pools.utils';

import PoolCard from './pool-card';
import { FormFilterValue } from './pool-card/pool-card.types';
import PoolCardSkeleton from './pool-card/pool-card-skeleton';
import PoolsCardListManager from './pool-card-list-manager';
import {
  AMMPoolWithMetadata,
  FilterTypeEnum,
  PoolCardListContentProps,
  PoolCardListProps,
  PoolForm,
  PoolTabEnum,
} from './pools.types';

const Pools: FC = () => {
  const isMounted = useIsMounted();
  const [page, setPage] = useState(1);
  const { network } = useSuiClientContext();
  const formContext = useFormContext<PoolForm>();

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
    filterProps?.reduce((acc, filterProp) => {
      if (
        filterProp.type === FilterTypeEnum.CATEGORY &&
        filterProp.value === FormFilterValue.official
      ) {
        const ids: string[] =
          CATEGORY_POOLS[FormFilterValue.official][network as Network];

        return [...acc, { poolObjectId: { $in: ids } }];
      }

      if (filterProp.type === FilterTypeEnum.ALGORITHM) {
        const isVolatile = filterProp.value === FormFilterValue.volatile;

        return [...acc, { isVolatile }];
      }

      return acc;
    }, [] as FilterQuery<any>[]) ?? [];

  const [pools, setPools] = useState<Record<string, AMMPoolWithMetadata>>({});

  const { data, isLoading: arePoolsLoading } = usePools(
    page,
    isFindingPool
      ? {
          $and: [
            ...tokenList.map(({ type }) => ({
              coinTypes: { $in: [type] },
            })),
          ],
        }
      : query.length
        ? {
            $and: query,
          }
        : {}
  );

  useEffect(() => {
    setPools({});
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
      !values(pools).some(({ poolObjectId }) => dataIds.includes(poolObjectId))
    )
      setPools({
        ...pools,
        ...safeData.pools.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.poolObjectId]: curr,
          }),
          {} as Record<string, AMMPoolWithMetadata>
        ),
      });
  }, [safeData, pools]);

  return (
    <>
      <PoolsCardListManager pools={pools} setPools={setPools} />
      <PoolCardListContent
        nextPage={nextPage}
        pools={values(pools)}
        done={isMounted() && !!data?.done}
        totalItems={safeData?.totalPages ?? 0}
        arePoolsLoading={arePoolsLoading || !data}
        hasMore={(safeData?.totalPages ?? 0) - page * PAGE_SIZE > 0}
      />
    </>
  );
};

const Position: FC = () => {
  const { coins } = useWeb3();
  const isMounted = useIsMounted();
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
        filterProp.value === FormFilterValue.official
      ) {
        const ids: string[] =
          CATEGORY_POOLS[filterProp.value][network as Network];
        return [...acc, { poolObjectId: { $in: ids } }];
      }

      if (filterProp.type === FilterTypeEnum.ALGORITHM) {
        const isVolatile = filterProp.value === FormFilterValue.volatile;
        return [...acc, { isVolatile }];
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

  const [pools, setPools] = useState<Record<string, AMMPoolWithMetadata>>({});
  const { data, isLoading: arePoolsLoading } = usePools(page, {
    $and: filterQuery,
  });

  useEffect(() => {
    setPools({});
  }, [filterProps]);

  const safeData = data ?? { pools: [], totalPages: 0 };

  const nextPage = () => setPage(inc);

  useEffect(() => {
    const dataIds = safeData.pools.map(({ poolObjectId }) => poolObjectId);

    if (
      safeData &&
      safeData.totalPages &&
      page <= safeData.totalPages &&
      !values(pools).some(({ poolObjectId }) => dataIds.includes(poolObjectId))
    )
      setPools({
        ...pools,
        ...safeData.pools.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.poolObjectId]: curr,
          }),
          {} as Record<string, AMMPoolWithMetadata>
        ),
      });
  }, [safeData, pools]);

  return (
    <>
      <PoolsCardListManager pools={pools} setPools={setPools} />
      <PoolCardListContent
        nextPage={nextPage}
        pools={values(pools)}
        done={isMounted() && !!data?.done}
        totalItems={data?.totalPages ?? 0}
        arePoolsLoading={arePoolsLoading || !pools}
        hasMore={(data?.totalPages ?? 0) - page * PAGE_SIZE > 0}
      />
    </>
  );
};

const PoolCardListContent: FC<PoolCardListContentProps> = ({
  done,
  pools,
  hasMore,
  nextPage,
  totalItems,
  arePoolsLoading,
}) => {
  const types = [
    ...new Set(pools?.flatMap((pool) => [pool.coinX, pool.coinY])),
  ];

  const symbols = getAllSymbols(types);

  const { data: pricesRecord, isLoading: arePricesLoading } =
    useGetMultipleTokenPriceBySymbol(symbols);

  const { data: coinMetadataMap, isLoading: isCoinMetadataLoading } =
    useGetCoinMetadata(types);

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
      </Box>
    </InfiniteScroll>
  );
};

const PoolCardList: FC<PoolCardListProps> = ({ tab }) =>
  tab === PoolTabEnum.Pools ? <Pools /> : <Position />;

export default PoolCardList;
