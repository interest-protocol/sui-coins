import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { SUIPLAY_SOULBOUND } from '@/constants';
import { SUIPLAY_LAST_UPDATE_AT } from '@/constants/nft';

import { SelectSuiPlayModalBodyProps } from './select-sui-play-modal.types';
import SuiPlayModalItem from './sui-play-modal-item';

const ModalSuiPlayBody: FC<SelectSuiPlayModalBodyProps> = ({
  handleSelectTier,
}) => (
  <Box
    m="s"
    gap="s"
    flex="1"
    display="flex"
    overflowY="auto"
    bg="lowContainer"
    flexDirection="column"
  >
    {SUIPLAY_SOULBOUND?.map((info) => (
      <SuiPlayModalItem
        key={v4()}
        selected={false}
        updatedAt={SUIPLAY_LAST_UPDATE_AT}
        onClick={() =>
          handleSelectTier(info.tier as 'The Exalted' | 'The Mythics' | 'All')
        }
        {...info}
        tier={info.tier as 'The Exalted' | 'The Mythics' | 'All'}
      />
    ))}
  </Box>
);

export default ModalSuiPlayBody;
