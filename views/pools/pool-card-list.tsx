import {
  Box,
  Motion,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';
import { RECOMMENDED_POOLS } from '@/constants/pools';
import { useNetwork } from '@/context/network';
import { useModal } from '@/hooks/use-modal';
import { PlusSVG } from '@/svg';

import FindPoolDialog from './find-pool-modal/find-pool-dialog';
import PoolCard from './pool-card';
import { PoolCardProps } from './pool-card/pool-card.types';
import { PoolForm } from './pools.types';

const PoolCardList: FC = () => {
  const { push } = useRouter();
  const { network } = useNetwork();
  const { setModal, handleClose } = useModal();
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

  const handleCreatePool = () => {
    push(Routes[RoutesEnum.PoolCreate]);
    onClose();
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

  const { data: pools } = useSWR(`${isFindingPool}`, async () => {
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
      poolPairFailedModal();
    });
    return [];
  });

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
            title="Pool doesn't exist"
            description="If you like, you can create this pool"
            Icon={<PlusSVG maxWidth="1rem" maxHeight="1rem" width="100%" />}
            onClose={onClose}
            onCreatePool={handleCreatePool}
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
    setListPools(sortedPoolList(pools));
  }, [filterList, pools]);

  return (
    <Box
      gap="m"
      display={listPools?.length ? 'grid' : 'flex'}
      borderRadius="xs"
      p={['s', 's', 's', 'l']}
      gridTemplateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr']}
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
