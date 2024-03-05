import { Box } from '@interest-protocol/ui-kit';
import { v4 } from 'uuid';

import PoolDetailCollapse from '../pool-detail-collapse/pool-detail-collapse';
import { POOL_PARAMETERS_DATA } from '../pool-detail-collapse/pool-detail-collapse.data';
import PoolDetailsCollapseItemStandard from '../pool-detail-collapse/pool-detail-collapse-item-standard';

const PoolDetail = () => {
  return (
    <Box>
      <PoolDetailCollapse title={POOL_PARAMETERS_DATA.title}>
        {POOL_PARAMETERS_DATA.data.map(({ label, info, additionalInfo }) => (
          <PoolDetailsCollapseItemStandard
            key={v4()}
            label={label}
            content={info}
            hasAddtionalInfo={additionalInfo}
          />
        ))}
      </PoolDetailCollapse>
    </Box>
  );
};

export default PoolDetail;
