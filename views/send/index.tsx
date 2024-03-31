import { Box, Tabs, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { ClockSVG, UploadSVG } from '@/svg';

import SendForm from './send-form';
import SendHistory from './send-history';

const Send: FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Layout>
      <Box my="3rem" display="flex" justifyContent="center">
        <Tabs
          type="circle"
          onChangeTab={setTabIndex}
          defaultTabIndex={tabIndex}
          items={[
            <Box key={v4()} display="flex" alignItems="center" gap="xs">
              <Typography variant="label" size="large">
                Send
              </Typography>
              <UploadSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
            </Box>,
            <Box key={v4()} display="flex" alignItems="center" gap="xs">
              <Typography variant="label" size="large">
                History
              </Typography>
              <ClockSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
            </Box>,
          ]}
        />
      </Box>
      {tabIndex ? <SendHistory /> : <SendForm />}
    </Layout>
  );
};

export default Send;
