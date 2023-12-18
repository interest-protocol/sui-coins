import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import PoolCard from './components/pools-card';
import { PoolListData } from './pool-list.data';

const PoolList: FC = () => {
  return (
    <>
      <Box
        p="xs"
        my="1.5rem"
        gap="0.5rem"
        display="grid"
        gridAutoFlow="dense"
        gridTemplateColumns={[
          'repeat(auto-fill, minmax(100%, 1fr))',
          'repeat(auto-fill, minmax(18rem, 1fr))',
        ]}
      >
        {PoolListData.map((pool) => (
          <PoolCard key={v4()} {...pool} />
        ))}
      </Box>
      <Button variant="filled" mx="auto">
        Show more
      </Button>
    </>
  );
};

export default PoolList;
