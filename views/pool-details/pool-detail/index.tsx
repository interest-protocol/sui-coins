import { Box } from '@interest-protocol/ui-kit';
import { v4 } from 'uuid';

import PoolDetailCollapse from '../pool-detail-collapse';
import PoolDetailsCollapseItemStandard from '../pool-detail-collapse/item-standard';
import { POOL_INFORMATION_DATA } from './pool-detail.data';

const PoolDetail = () => {
  return (
    <Box>
      <PoolDetailCollapse title={POOL_INFORMATION_DATA.title}>
        {POOL_INFORMATION_DATA.data.map(
          ({ label, info, additionalInfo, clipBoard }) => (
            <PoolDetailsCollapseItemStandard
              key={v4()}
              label={label}
              content={info}
              isCopyClipBoard={clipBoard}
              hasAddtionalInfo={additionalInfo}
            />
          )
        )}
      </PoolDetailCollapse>
    </Box>
  );
};

export default PoolDetail;
