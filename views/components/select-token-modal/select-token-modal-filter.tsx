import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Network } from '@/constants';
import { FavoriteSVG } from '@/svg';

import {
  SelectTokenFilterProps,
  TokenOrigin,
} from './select-token-modal.types';

const SelectTokenFilter: FC<SelectTokenFilterProps> = ({
  control,
  setValue,
}) => {
  const { network } = useSuiClientContext();
  const filterSelected = useWatch({ control, name: 'filter' });

  return (
    <Box
      mt="s"
      gap="s"
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
    >
      <Box
        key={v4()}
        cursor="pointer"
        onClick={() => setValue('filter', TokenOrigin.Fav)}
      >
        <Typography variant="body" size="medium" textAlign="center" py="m">
          <FavoriteSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        </Typography>
        {filterSelected === TokenOrigin.Fav && (
          <Motion layout borderBottom="2px solid" borderColor="primary" />
        )}
      </Box>
      {(network === Network.MAINNET
        ? ['Strict', 'Wallet', 'Wormhole', 'Sui Bridge']
        : ['Strict', 'Wallet']
      ).map((item, index) => (
        <Box
          key={v4()}
          cursor="pointer"
          onClick={() => setValue('filter', index)}
        >
          <Typography variant="body" size="medium" textAlign="center" py="m">
            {item}
          </Typography>
          {filterSelected === index && (
            <Motion layout borderBottom="2px solid" borderColor="primary" />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default SelectTokenFilter;
