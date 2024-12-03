import { Box, RadioButton, Typography } from '@interest-protocol/ui-kit';
import { toPairs } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { IAirdropForm } from '../../airdrop.types';
import { METHODS_ICONS } from '../airdrop-form.data';

const AirdropChooseMethod: FC = () => {
  const { control, setValue, reset } = useFormContext<IAirdropForm>();
  const method = useWatch({ control, name: 'method' });

  const methods = toPairs(METHODS_ICONS).filter(
    ([key]) =>
      JSON.parse(process.env.NEXT_PUBLIC_SUI_PLAY ?? 'false') ||
      key !== 'suiPlay'
  );

  return (
    <Box p="xl" borderRadius="xs" bg="lowestContainer">
      <Box display="flex" flexDirection="column" mb="m">
        <Typography variant="body" size="large">
          1. Choose Delivery Method
        </Typography>
      </Box>
      {methods.map(([key, { title, description, Icon }], index) => (
        <Box
          mb="2xs"
          padding="m"
          key={index}
          borderRadius="xs"
          nHover={{ bg: '#0053DB14', cursor: 'pointer' }}
          onClick={() => {
            reset();
            setValue('step', 1);
            setValue('method', key);
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
                overflow="hidden"
                minHeight="2.5rem"
                alignItems="center"
                borderRadius="full"
                justifyContent="center"
              >
                {typeof Icon === 'string' ? (
                  <img src={Icon} alt="SuiPlay" />
                ) : (
                  <Icon width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
                )}
              </Box>
              <Box>
                <Typography fontWeight="700" variant="body" size="large">
                  {title}
                </Typography>
                <Typography variant="body" lineHeight="1.5rem" size="large">
                  {description}
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
