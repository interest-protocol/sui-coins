import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';

const AirdropButton: FC = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Button variant="filled">Send</Button>
    </Box>
  );
};

export default AirdropButton;
