import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import {
  ObjectOrigin,
  SelectObjectFilterProps,
} from './select-object-modal.types';

const filters: Record<string, ObjectOrigin> = {
  Coins: ObjectOrigin.Coins,
  NFT: ObjectOrigin.NFT,
  Others: ObjectOrigin.Objects,
};

const SelectObjectFilter: FC<SelectObjectFilterProps> = ({
  control,
  noCoins,
  setValue,
}) => {
  const filterSelected = useWatch({ control, name: 'filter' });

  return (
    <Box
      gap="s"
      display="grid"
      flexWrap="wrap"
      gridTemplateColumns="1fr 1fr 1fr"
    >
      {(noCoins ? ['NFT', 'Others'] : ['Coins', 'NFT', 'Others']).map(
        (item) => (
          <Box
            key={v4()}
            cursor="pointer"
            onClick={() => setValue('filter', filters[item])}
          >
            <Typography variant="body" size="medium" textAlign="center" py="m">
              {item}
            </Typography>
            {filterSelected === filters[item] && (
              <Motion layout borderBottom="2px solid" borderColor="primary" />
            )}
          </Box>
        )
      )}
    </Box>
  );
};

export default SelectObjectFilter;
