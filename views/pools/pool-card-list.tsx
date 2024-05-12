import { PoolMetadata } from '@interest-protocol/clamm-sdk';
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
import { useGetCoinMetadata } from '@/hooks/use-get-coin-metadata';
import useGetMultipleTokenPriceBySymbol from '@/hooks/use-get-multiple-token-price-by-symbol';
import { useModal } from '@/hooks/use-modal';
import { usePools } from '@/hooks/use-pools';
import { useWeb3 } from '@/hooks/use-web3';
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
  const [page] = useState(1);
  const { data, isLoading: arePoolsLoading } = usePools(page, {
    $or: [{ hooks: { $exists: false } }, { hooks: null }],
  });

  return (
    <PoolCardListContent
      network={network}
      pools={data?.pools || []}
      arePoolsLoading={arePoolsLoading}
    />
  );
};

const Position: FC<PoolCardListWrapper> = ({ network }) => {
  const [page] = useState(1);
  const { coins } = useWeb3();
  const { data, isLoading } = usePools(page, {
    lpCoinType: {
      $in: coins.map((elem) => elem.type.includes('IPX')),
    },
  });
  return (
    <PoolCardListContent
      network={network}
      pools={data?.pools || []}
      arePoolsLoading={isLoading}
    />
  );
};

const PoolCardListContent: FC<PoolCardListContentProps> = ({
  arePoolsLoading,
  pools,
}) => {
  const network = useNetwork();
  const { setModal, handleClose } = useModal();

  const symbols = getAllSymbols(pools, network);

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
            ({ type, description }) =>
              type === 'algorithm' &&
              description === (pool.isStable ? 'stable' : 'volatile')
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
      {listPools.length ? (
        listPools?.map((pool) => (
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
