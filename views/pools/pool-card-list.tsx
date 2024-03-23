import { Box, Motion } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';
import { RECOMMENDED_POOLS } from '@/constants/pools';
import { useNetwork } from '@/context/network';
import { useModal } from '@/hooks/use-modal';

import FindPoolDialog from './find-pool-modal/find-pool-dialog';
import PoolCard from './pool-card';
import { PoolForm } from './pools.types';

const PoolCardList: FC = () => {
  const { push } = useRouter();
  const { network } = useNetwork();
  const { setModal, handleClose } = useModal();
  const { control, getValues } = useFormContext<PoolForm>();

  const handleCreatePool = () => {
    push(Routes[RoutesEnum.PoolCreate]);
    handleClose();
  };

  const isFindingPool = useWatch({ control, name: 'isFindingPool' });

  const { data: pools } = useSWR(`${isFindingPool}`, async () => {
    const tokenList = getValues('tokenList');

    if (!tokenList.length || !isFindingPool) return RECOMMENDED_POOLS[network];

    const filteredPools = RECOMMENDED_POOLS[network].filter((pool) =>
      tokenList.every(({ type }, index) => pool.tokens[index].type === type)
    );

    if (filteredPools.length) return filteredPools;

    toast.loading('Finding Pool..');

    // TODO: fetch pools from blockchain
    await new Promise((resolve) =>
      setTimeout(() => resolve([]), 2000 + Math.random() * 3000)
    ).finally(() => {
      toast.dismiss();
      openModal();
    });
    return [];
  });

  const openModal = () => {
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
            onClose={handleClose}
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

  return (
    <Box
      gap="m"
      display="grid"
      borderRadius="xs"
      p={['s', 's', 's', 'l']}
      gridTemplateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr']}
    >
      {pools?.map((pool) => <PoolCard key={v4()} {...pool} />)}
    </Box>
  );
};

export default PoolCardList;
