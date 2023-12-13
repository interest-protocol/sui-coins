import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';

const AirdropButton: FC<{ onSend: () => void }> = ({ onSend }) => {
  const handleSend = () => {
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
