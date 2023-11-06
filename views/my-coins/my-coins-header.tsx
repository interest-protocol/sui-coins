import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

const MyCoinsHeader: FC = () => (
  <Box
    py="m"
    px="l"
    columnGap="xl"
    display="grid"
    borderBottom="1px solid"
    borderColor="outlineVariant"
    gridTemplateColumns="2rem 1fr 1fr 1fr 2rem"
  >
    <Box />
    <Box fontFamily="Proto" fontSize="s">
      Name
    </Box>
    <Box fontFamily="Proto" fontSize="s">
      Balance
    </Box>
    <Box fontFamily="Proto" fontSize="s" gridColumn="span 2">
      Treasury Cap
    </Box>
  </Box>
);

export default MyCoinsHeader;
