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

import { POOLS_ARRAY } from '@/constants/coins';
import { RECOMMENDED_POOLS } from '@/constants/pools';
import { useNetwork } from '@/context/network';
import useGetMultipleTokenPriceBySymbol from '@/hooks/use-get-multiple-token-price-by-symbol';
import { useModal } from '@/hooks/use-modal';
import { usePools } from '@/hooks/use-pools';
import { getAllSymbols } from '@/views/pools/pools.utils';

import FindPoolDialog from './find-pool-modal/find-pool-dialog';
import PoolCard from './pool-card';
import { PoolCardProps } from './pool-card/pool-card.types';
import { PoolForm } from './pools.types';

const PoolCardList: FC = () => {
  const network = useNetwork();
  const { setModal, handleClose } = useModal();

  const { data: pools, isLoading: arePoolsLoading } = usePools(POOLS_ARRAY);

  const symbols = getAllSymbols(pools || []);

  const { data: pricesRecord, isLoading: arePricesLoading } =
    useGetMultipleTokenPriceBySymbol(symbols);

  const { control, setValue } = useFormContext<PoolForm>();
  const filterList = useWatch({ control, name: 'filterList' });
  const tokenList = useWatch({ control, name: 'tokenList' });
  const [listPools, setListPools] = useState<
    ReadonlyArray<PoolCardProps> | undefined
  >();

  const onClose = () => {
    setValue('isFindingPool', false);
    handleClose();
  };

  const sortedPoolList = (poolList?: ReadonlyArray<PoolCardProps>) =>
    poolList?.filter((pool) =>
      filterList?.length
        ? filterList.every(({ type, description }) => {
            if (
              type === 'algorithm' &&
              (description === 'stable') === pool.stable
            )
              return true;

            if (type === 'pool_type' && description === pool.poolType)
              return true;

            console.log({ type, description });

            return false;
          })
        : true
    );

  const isFindingPool = useWatch({ control, name: 'isFindingPool' });

  const { data: _pools } = useSWR(`${isFindingPool}`, async () => {
    if (!isFindingPool) return RECOMMENDED_POOLS[network];

    const filteredPools = RECOMMENDED_POOLS[network].filter(
      (pool) =>
        tokenList.length === pool.tokens.length &&
        tokenList.every(({ type }, index) => pool.tokens[index].type === type)
    );

    if (filteredPools.length) return filteredPools;

    poolPairLoadingModal();
    await new Promise((resolve) =>
      setTimeout(() => resolve([]), 2000 + Math.random() * 3000)
    ).finally(() => {
      toast.dismiss();
    });
    return [];
  });

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

  console.log({
    pools,
    arePoolsLoading,
    pricesRecord,
    arePricesLoading,
  });

  if (!pools || arePoolsLoading || !pricesRecord || arePricesLoading)
    return <div>loading</div>;

  return (
    <Box
      gap="xs"
      borderRadius="xs"
      p={['s', 's', 's', 'l']}
      display={listPools?.length ? 'grid' : 'flex'}
      gridTemplateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr']}
    >
      {listPools?.length ? (
        listPools.map((pool) => <PoolCard key={v4()} {...pool} />)
      ) : (
        <Box width="100%" color="white">
          <Typography size="small" variant="display">
            Nenhum pool encontrado
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PoolCardList;
