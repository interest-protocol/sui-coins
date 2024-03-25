import { Box, Typography } from '@interest-protocol/ui-kit';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { RECOMMENDED_POOLS } from '@/constants/pools';
import { useNetwork } from '@/context/network';

import PoolCard from './pool-card';
import { DEX_MAP } from './pool-card/pool-card.data';
import { PoolForm } from './pools.types';

const PoolCardList = () => {
  const { network } = useNetwork();
  const { control } = useFormContext<PoolForm>();
  const fields = useWatch({ control, name: 'filterList' });
  const filteredPools = RECOMMENDED_POOLS[network].filter(
    (pool) =>
      fields?.some(
        (field) =>
          DEX_MAP[pool.dex].tags?.some((tag) => tag.name === field.description)
      ) ?? true
  );

  return (
    <Box
      gap="m"
      display="grid"
      borderRadius="xs"
      p={['s', 's', 's', 'l']}
      gridTemplateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr']}
    >
      {filteredPools.length ? (
        filteredPools.map((pool) => <PoolCard key={v4()} {...pool} />)
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
