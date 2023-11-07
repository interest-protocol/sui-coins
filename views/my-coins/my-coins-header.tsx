import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

const MyCoinsHeader: FC = () => (
  <Box
    columnGap="xl"
    display="grid"
    py={['s', 'm']}
    px={['s', 'l']}
    fontSize={['xs', 's']}
    borderBottom="1px solid"
    borderColor="outlineVariant"
    gridTemplateColumns={['1fr 1fr 1fr 2rem', '2rem 1fr 1fr 1fr 2rem']}
  >
    <Box display={['none', 'block']} />
    <Box fontFamily="Proto">Name</Box>
    <Box fontFamily="Proto">Balance</Box>
    <Box fontFamily="Proto" gridColumn="span 2">
      Treasury Cap
    </Box>
  </Box>
);

export default MyCoinsHeader;
