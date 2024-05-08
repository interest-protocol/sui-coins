import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { CheckRoundedSVG, TimesRoundedSVG } from '@/svg';

import { IncineratorTableActionsProps } from '../../../incinerator.types';

const IncineratorTableActions: FC<IncineratorTableActionsProps> = ({
  handleCancel,
  handleApprove,
}) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="flex-end"
    gap={['2xs', '2xs', '2xs', 'xl']}
  >
    <Box onClick={handleApprove}>
      <CheckRoundedSVG maxHeight="1.75rem" maxWidth="1.75rem" width="100%" />
    </Box>
    <Box onClick={handleCancel}>
      <TimesRoundedSVG maxHeight="1.75rem" maxWidth="1.75rem" width="100%" />
    </Box>
  </Box>
);

export default IncineratorTableActions;
