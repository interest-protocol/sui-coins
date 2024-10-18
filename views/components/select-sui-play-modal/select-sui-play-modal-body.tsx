import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import ModalSuiPlayBody from './modal-sui-play-body';
import { SelectSuiPlayModalBodyProps } from './select-sui-play-modal.types';

const SelectSuiPlayModalBody: FC<SelectSuiPlayModalBodyProps> = ({
  handleSelectTier,
}) => (
  <Box
    flex="1"
    display="flex"
    overflowY="auto"
    bg="lowContainer"
    flexDirection="column"
  >
    <ModalSuiPlayBody handleSelectTier={handleSelectTier} />
  </Box>
);

export default SelectSuiPlayModalBody;
