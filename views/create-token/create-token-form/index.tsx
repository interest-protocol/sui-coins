import { Box } from '@interest-protocol/ui-kit';
import { TextField } from 'elements';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ICreateTokenForm } from '../create-token.types';
import FixedSupplyToggle from './fixed-supply-toggle';

const CreateTokenForm: FC = () => {
  const { register, control, getValues } = useForm<ICreateTokenForm>({
    defaultValues: {
      fixedSupply: true,
    },
  });

  const onSubmit = () => {
    const data = getValues();
    console.log('>> values :: ', data);
  };

  return (
    <Box borderRadius="m" overflow="hidden" bg="lowestContainer" width="26rem">
      <Box
        p="xl"
        fontSize="l"
        borderBottom="1px solid"
        borderColor="outlineVariant"
      >
        Coin Generator
      </Box>
      <Box p="xl" display="flex" flexDirection="column" gap="m">
        <Box>1. Coin Details</Box>
        <TextField
          label="Name"
          {...register('name')}
          placeholder="Eg. Leo's Coin"
        />
        <TextField
          label="Coin Symbol"
          placeholder="Eg. LC"
          {...register('symbol')}
        />
        <TextField
          label="Coin Image URL"
          {...register('imageUrl')}
          placeholder="Eg. https://lc.com/images/logo.png"
        />
      </Box>
      <Box p="xl" display="flex" flexDirection="column" gap="m">
        <Box>2. Coin Features</Box>
        <TextField
          status="success"
          defaultValue="9"
          label="Coin Decimals"
          {...register('decimals')}
          supportingText="Insert the decimal precision of your token. If you don't know what to insert, use 9"
        />
        <TextField
          label="Total Supply"
          placeholder="Your total coin supply"
          supportingText="Insert the maximum number of tokens available"
        />
        <Box
          p="m"
          my="xl"
          gap="m"
          bg="surface"
          display="flex"
          borderRadius="xs"
          flexDirection="column"
        >
          <Box display="flex" justifyContent="space-between" color="onSurface">
            <Box>Fixed Supply</Box>
            <FixedSupplyToggle control={control} />
          </Box>
          <Box color="#0000007A" fontSize="xs">
            The Treasury Cap will be sent to the @0x0 address
          </Box>
        </Box>
        <Box display="flex" justifyContent="center">
          <Box
            py="s"
            px="xl"
            fontSize="s"
            bg="primary"
            color="onPrimary"
            fontFamily="Proto"
            borderRadius="full"
            onClick={onSubmit}
          >
            Create coin
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default CreateTokenForm;
