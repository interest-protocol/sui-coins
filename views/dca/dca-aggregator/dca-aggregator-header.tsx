import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import { ChevronDownSVG, ChevronUpSVG } from '@/svg';

import { Aggregator, DCAAggregatorHeaderProps, DCAForm } from '../dca.types';
import { AGGREGATORS_LIST } from './dca-aggregator.data';

const Header: FC<DCAAggregatorHeaderProps> = ({ isOpen, handleManageView }) => {
  const Chevron = isOpen ? ChevronUpSVG : ChevronDownSVG;

  const { control } = useFormContext<DCAForm>();

  const formAggregator = useWatch({ control, name: 'aggregator' });

  const localStorageAggregator = useReadLocalStorage<Aggregator>(
    `${LOCAL_STORAGE_VERSION}-suicoins-dca-aggregator`
  );

  const selectedAggregator =
    formAggregator ?? localStorageAggregator ?? Aggregator.Hop;

  const { name, Icon } = AGGREGATORS_LIST[selectedAggregator];

  return (
    <Box
      py="l"
      px="2xl"
      display="flex"
      bg="onPrimary"
      borderRadius="s"
      alignItems="center"
      justifyContent="space-between"
      {...(isOpen && {
        borderBottomRightRadius: 'unset',
        borderBottomLeftRadius: 'unset',
      })}
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
        <Chevron maxWidth="1.25rem" maxHeight="1.25rem" width="100%" />
      </Button>
    </Box>
  );
};

export default Header;
