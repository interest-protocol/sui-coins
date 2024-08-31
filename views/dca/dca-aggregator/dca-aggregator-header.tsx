import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import { CogsSVG, MinusSVG } from '@/svg';

import { Aggregator, DCAAggregatorHeaderProps } from '../dca.types';
import { AGGREGATORS_LIST } from './dca-aggregator.data';

const Header: FC<DCAAggregatorHeaderProps> = ({ isOpen, handleManageView }) => {
  const ManageIcon = isOpen ? MinusSVG : CogsSVG;
  const aggergator = useReadLocalStorage<Aggregator>(
    `${LOCAL_STORAGE_VERSION}-suicoins-dca-aggregator`
  );

  const { name, Icon } = AGGREGATORS_LIST[aggergator ?? Aggregator.Aftermath];

  return (
    <Box
      py="l"
      px="2xl"
      display="flex"
      bg="onPrimary"
      borderRadius="s"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography
        gap="xs"
        size="large"
        display="flex"
        variant="label"
        alignItems="center"
        fontSize="0.875rem"
      >
        Aggregator: <Icon maxWidth="1.25rem" maxHeight="1.25rem" width="100%" />
        <Typography as="b" variant="label" size="large" color="primary">
          {name}
        </Typography>
      </Typography>
      <Button isIcon variant="text" onClick={handleManageView}>
        <ManageIcon maxWidth="1.25rem" maxHeight="1.25rem" width="100%" />
      </Button>
    </Box>
  );
};

export default Header;
