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
            coin="SUI"
            qtyAvailable={3.2}
            qtyToIncinerate={3.2}
            isChecked={false}
            denyEdition={() => {}}
            approveEdition={() => {}}
            index={index}
          />
        );
      })}
    </Box>
  );
};

export default IncineratorBody;
