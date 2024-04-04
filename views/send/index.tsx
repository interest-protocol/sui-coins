import { Box, Tabs, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import { ClockSVG, UploadSVG } from '@/svg';

import SendSelectType from './send-forms/send-select-type';
import SendFormSimple from './send-forms/send-simple-form';
import SendHistory from './send-history';

const Send: FC = () => {
  const { push, pathname } = useRouter();
  const [isBulk, setBulk] = useState(false);
  const [initial, setInitial] = useState(true);
  const onChangeTab = (index: number) => {
    push(
      index ? Routes[RoutesEnum.SendHistory] : Routes[RoutesEnum.Send],
      undefined,
      { shallow: true }
    );
  };

  return (
    <Layout>
      <Box my="3rem" display="flex" justifyContent="center">
        <Tabs
          type="circle"
          onChangeTab={onChangeTab}
          defaultTabIndex={Number(Routes[RoutesEnum.SendHistory] === pathname)}
          items={[
            <Box
              gap="xs"
              as="span"
              key={v4()}
              display="flex"
              alignItems="center"
            >
              <Typography variant="label" size="large" as="span">
                Send
              </Typography>
              <UploadSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
            </Box>,
            <Box
              gap="xs"
              as="span"
              key={v4()}
              display="flex"
              alignItems="center"
            >
              <Typography variant="label" size="large" as="span">
                History
              </Typography>
              <ClockSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
            </Box>,
          ]}
        />
      </Box>
      {Routes[RoutesEnum.SendHistory] === pathname ? (
        <SendHistory />
      ) : initial ? (
        <SendSelectType
          onSelectType={(index: number) => {
            setInitial(false);
            setBulk(Boolean(index));
          }}
        />
      ) : isBulk ? null : (
        <SendFormSimple />
      )}
    </Layout>
  );
};

export default Send;
