import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { SEND_SELECT_TYPE_CARDS } from './send-select-type.data';
import { SendSelectTypeProps } from './send-select-type.types';
import SendSelectTypeCard from './send-select-type-card';

const SendSelectType: FC<SendSelectTypeProps> = ({ onSelectType }) => (
  <Box
    mx="auto"
    gap="4xl"
    display="flex"
    maxWidth="39rem"
    flexDirection="column"
  >
    <Box display="flex" flexDirection="column" gap="l">
      <Typography variant="display" size="small" textAlign="center">
        Create a link to send
      </Typography>
      <Typography variant="body" size="large" textAlign="center">
        It simple Create a link and send coins, NFTs and more. Shares the link
        with the recipient via email, direct message, or any other channel.
      </Typography>
    </Box>
    <Box
      gap="xs"
      mx="auto"
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
    >
      {SEND_SELECT_TYPE_CARDS.map((info, index) => (
        <SendSelectTypeCard
          {...info}
          key={v4()}
          onSelect={() => onSelectType(index)}
        />
      ))}
    </Box>
  </Box>
);

export default SendSelectType;
