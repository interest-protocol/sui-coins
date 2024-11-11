import { Box, Button } from '@interest-protocol/ui-kit';
import { prop } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useOnBurn } from './incinerator.hooks';
import { IncineratorForm } from './incinerator.types';

const IncineratorButton: FC = () => {
  const onBurn = useOnBurn();
  const { control } = useFormContext<IncineratorForm>();
  const allObjects = useWatch({ control, name: 'objects' });

  const objects = allObjects.filter(prop('active'));

  const disabled = !objects || !objects.length;

  const handleBurn = () => onBurn({ objects });

  return (
    <Box
      py="l"
      mt="3xl"
      bottom="0"
      display="flex"
      position="sticky"
      bg="lowestContainer"
      flexDirection="column"
      justifyContent="center"
    >
      <Button
        mx="auto"
        variant="filled"
        onClick={handleBurn}
        disabled={disabled}
      >
        Burn {objects.length} Asset{objects.length === 1 ? '' : 's'}
      </Button>
    </Box>
  );
};

export default IncineratorButton;
