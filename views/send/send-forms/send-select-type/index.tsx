import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { SendType } from '../../send.data';
import { SEND_SELECT_TYPE_CARDS } from './send-select-type.data';
import { SendSelectTypeProps } from './send-select-type.types';
import SendSelectTypeCard from './send-select-type-card';

const SendSelectType: FC<SendSelectTypeProps> = ({ onSelectType }) => (
  <Box mx="auto" gap="l" display="flex" maxWidth="39rem" flexDirection="column">
    <Box display="flex" flexDirection="column" gap="l">
      <Typography variant="display" size="small" textAlign="center">
        send
      </Typography>
      <Typography variant="body" size="large" textAlign="center">
        Effortlessly Send and/or Claim digital assets on Sui in stealth mode,
        all within seconds.
      </Typography>
    </Box>
    <Box
      my="2xl"
      gap="xs"
      mx="auto"
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
    >
      {SEND_SELECT_TYPE_CARDS.map(({ key, ...info }) => (
        <SendSelectTypeCard
          {...info}
          key={v4()}
          onSelect={() => onSelectType(key)}
        />
      ))}
    </Box>
    <Box display="flex" alignItems="center" gap="m" color="outline">
      <Box borderBottom="1px solid" flex="1" />
      <Typography variant="body" size="medium">
        or
      </Typography>
      <Box borderBottom="1px solid" flex="1" />
    </Box>
    <Button
      variant="tonal"
      justifyContent="center"
      onClick={() => onSelectType(SendType.Transfer)}
    >
      Simple transfer
    </Button>
  </Box>
);

export default SendSelectType;
