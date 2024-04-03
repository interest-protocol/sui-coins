import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { SEND_SELECT_TYPE_CARDS } from './send-select-type.data';
import SendSelectTypeCard from './send-select-type-card';

const SendSelectType: FC<{ onSelectType: (index: number) => void }> = ({
  onSelectType,
}) => (
  <Box
    mx="auto"
    gap="2rem"
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
);

export default SendSelectType;
