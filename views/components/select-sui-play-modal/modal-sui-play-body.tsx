import { FC } from 'react';
import { v4 } from 'uuid';

import { SUIPLAY_SOULBOUND } from '@/constants';

import { SelectSuiPlayModalBodyProps } from './select-sui-play-modal.types';
import SuiPlayModalItem from './sui-play-modal-item';

const ModalSuiPlayBody: FC<SelectSuiPlayModalBodyProps> = ({
  handleSelectTier,
}) => (
  <>
    {SUIPLAY_SOULBOUND?.map((info) => (
      <SuiPlayModalItem
        updatedAt={0}
        key={v4()}
        selected={false}
        onClick={() =>
          handleSelectTier(info.tier as 'The Exalted' | 'The Mythics' | 'All')
        }
        {...info}
        tier={info.tier as 'The Exalted' | 'The Mythics' | 'All'}
      />
    ))}
  </>
);

export default ModalSuiPlayBody;
