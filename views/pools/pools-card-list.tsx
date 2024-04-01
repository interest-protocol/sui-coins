import { Box, Typography } from '@interest-protocol/ui-kit';
import { v4 } from 'uuid';

import { RECOMMENDED_POOLS } from '@/constants/pools';
import { useNetwork } from '@/context/network';

import PoolCard from './pool-card';

const PoolCardList = () => {
  const { network } = useNetwork();
  // TODO: Need a logic to improve the filter
  //const { control } = useFormContext<PoolForm>();
  //const filterList = useWatch({ control, name: 'filterList' });
  const filteredPools = RECOMMENDED_POOLS[network];

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
