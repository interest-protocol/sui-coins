import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

const MyCoinsHeader: FC = () => (
  <Box
    columnGap="xl"
    display="grid"
    py={['s', 'm']}
    px={['s', 'l']}
    fontSize={['xs', 's']}
    gridTemplateColumns={['1fr 1fr 1fr', '2rem 1fr 1fr 1fr']}
  >
    <Box display={['none', 'block']} />
    <Box fontFamily="Proto">Name</Box>
    <Box fontFamily="Proto">Balance</Box>
    <Box fontFamily="Proto">Treasury Cap</Box>
  </Box>
);

export default MyCoinsHeader;
