import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { IAirdropForm } from './airdrop.types';

const AirdropButton: FC<{ onSend: () => void }> = ({ onSend }) => {
  const { getValues } = useFormContext<IAirdropForm>();

  const handleSend = async () => {
    const { airdropList } = getValues();

    console.log('>> airdropList :: ', airdropList);

    onSend();
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button variant="filled" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
};

export default AirdropButton;
