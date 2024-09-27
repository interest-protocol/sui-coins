import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Network } from '@/constants';

import { SelectTokenFilterProps } from './select-token-modal.types';

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
      display="grid"
      flexWrap="wrap"
      gridTemplateColumns={
        network === Network.MAINNET ? '1fr 1fr 1fr 1fr' : '1fr 1fr'
      }
    >
      {(network === Network.MAINNET
        ? ['Strict', 'Wallet', 'Wormhole', 'Celer']
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
