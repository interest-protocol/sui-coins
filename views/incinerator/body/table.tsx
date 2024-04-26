import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import IncineratorTableRow from '../incinerator-table-row';

const IncineratorBody: FC = () => {
  return (
    <Box>
      {[1, 2, 3, 4].map((index) => {
        return (
          <IncineratorTableRow
            key={index}
            index={0}
            coin="SUI"
            type="SUI"
            qtyAvailable={3.5}
            qtyToIncinerate={3.5}
            denyEdition={() => {}}
            approveEdition={() => {}}
          />
        );
      })}
    </Box>
  );
};

export default IncineratorBody;
