import { Tag, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import PoolTransactionCardWrapper from './components/card-wrapper';
import PoolTransactionLine from './components/line';
import { STATISTICS_DUMMY } from './pool-transaction.data';

const PoolTransactionStatistics: FC = () => {
  return (
    <PoolTransactionCardWrapper title="Statistics">
      {STATISTICS_DUMMY.map((item) => (
        <PoolTransactionLine
          key={v4()}
          description={item.description}
          value={item.value}
          Suffix={
            <Tag
              variant="filled"
              size="small"
              bg={item.state.isSuccess ? 'successContainer' : 'errorContainer'}
            >
              <Typography
                variant="label"
                size="medium"
                color={
                  item.state.isSuccess
                    ? 'onSuccessContainer'
                    : 'onErrorContainer'
                }
              >
                {item.state.value}
              </Typography>
            </Tag>
          }
        />
      ))}
    </PoolTransactionCardWrapper>
  );
};

export default PoolTransactionStatistics;
