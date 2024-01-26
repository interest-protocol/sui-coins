import { Box, RadioButton, Typography } from '@interest-protocol/ui-kit';
import { toPairs } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { IAirdropForm } from '../airdrop.types';
import { METHODS_ICONS } from './airdrop-form.data';

const AirdropChooseMethod: FC = () => {
  const { control, setValue } = useFormContext<IAirdropForm>();
  const token = useWatch({ control, name: 'token' });
  const method = useWatch({ control, name: 'method' });

  if (!token) return null;

  return (
    <Box p="xl" borderRadius="xs" bg="lowestContainer">
      <Box display="flex" flexDirection="column" mb="m">
        <Typography variant="body" size="large">
          2. Choose Delivery Method
        </Typography>
      </Box>
      {toPairs(METHODS_ICONS).map(([key, { title, Icon }], index) => (
        <Box
          mb="2xs"
          padding="m"
          key={index}
          borderRadius="xs"
          nHover={{ bg: '#0053DB14', cursor: 'pointer' }}
          onClick={() => {
            setValue('method', key);
            setValue('asset', undefined);
            setValue('airdropList', null);
            setValue('commonAmount', '0');
          }}
        >
          <Box
            display="flex"
            borderRadius="xs"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" gap="m">
              <Box
                color="black"
                display="flex"
                width="2.5rem"
                height="2.5rem"
                bg="#0053DB14"
                minWidth="2.5rem"
                minHeight="2.5rem"
                alignItems="center"
                borderRadius="full"
                justifyContent="center"
              >
                <Icon width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
              </Box>
              <Box>
                <Typography fontWeight="700" variant="body" size="large">
                  {title}
                </Typography>
                <Typography variant="body" lineHeight="1.5rem" size="large">
                  copy what will happen if selected (1 line max)
                </Typography>
              </Box>
            </Box>
            <RadioButton defaultValue={method === key} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default AirdropChooseMethod;
