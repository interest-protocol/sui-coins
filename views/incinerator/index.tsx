import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import IncineratorContent from './incinerator-content';
import IncineratorHeader from './incinerator-header';
import IncineratorFilterTabs from './incinerator-tabs';

const Incinerator: FC = () => (
  <Box
    mt="3xl"
    mx="auto"
    width="100%"
    display="flex"
    borderRadius="s"
    maxWidth="51rem"
    bg="lowestContainer"
    flexDirection="column"
  >
    <IncineratorHeader />
    <IncineratorFilterTabs />
    <IncineratorContent />
  </Box>
);

export default Incinerator;
