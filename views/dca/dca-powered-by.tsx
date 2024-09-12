import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION } from '@/constants';

import { Aggregator } from './dca.types';
import { AGGREGATORS_LIST } from './dca-aggregator/dca-aggregator.data';

const DCAPoweredBy: FC = () => {
  const aggregator =
    useReadLocalStorage<Aggregator>(
      `${LOCAL_STORAGE_VERSION}-suicoins-dca-aggregator`
    ) ?? Aggregator.Hop;

  const { url, name, Icon } = AGGREGATORS_LIST[aggregator];

  return (
    <Box
      gap="m"
      mt="4xl"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <a target="_blank" rel="noopener, noreferrer" href={url}>
        <Box
          gap="s"
          display="flex"
          borderRadius="xs"
          alignItems="center"
          bg="lowestContainer"
          justifyContent="center"
        >
          <Typography variant="label" size="small" fontSize="s">
            Powered By:
          </Typography>
          <Box display="flex" alignItems="center" gap="xs">
            <Icon maxWidth="1.5rem" maxHeight="1.5rem" width="100%"></Icon>
            <Typography
              fontSize="s"
              size="medium"
              variant="body"
              fontWeight="500"
              textTransform="capitalize"
            >
              {name}
            </Typography>
          </Box>
        </Box>
      </a>
    </Box>
  );
};

export default DCAPoweredBy;
