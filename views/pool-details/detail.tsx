import { Box } from '@interest-protocol/ui-kit';
import { v4 } from 'uuid';

import Accordion from './accordion';
import ItemStandard from './accordion/item-standard';
import {
  POOL_INFORMATION_DATA,
  POOL_STATISTICS_DATA,
} from './pool-detail.data';

const Detail = () => (
  <Box>
    <Accordion title={POOL_INFORMATION_DATA.title}>
      {POOL_INFORMATION_DATA.data.map(
        ({ label, info, additionalInfo, clipBoard }) => (
          <ItemStandard
            key={v4()}
            label={label}
            content={info}
            isCopyClipBoard={clipBoard}
            hasAddtionalInfo={additionalInfo}
          />
        )
      )}
    </Accordion>
    <Accordion title={POOL_STATISTICS_DATA.title}>
      {POOL_STATISTICS_DATA.data.map(
        ({ label, info, additionalInfo, clipBoard }) => (
          <ItemStandard
            key={v4()}
            label={label}
            content={info}
            isCopyClipBoard={clipBoard}
            hasAddtionalInfo={additionalInfo}
          />
        )
      )}
    </Accordion>
  </Box>
);

export default Detail;
