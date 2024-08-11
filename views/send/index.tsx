import { Box, Tabs, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import { ClockSVG, UploadSVG } from '@/svg';

import { SendType } from './send.data';
import SendBulk from './send-forms/send-bulk';
import SendSelectType from './send-forms/send-select-type';
import SendSimple from './send-forms/send-simple';
import SendTransfer from './send-forms/send-transfer';
import SendHistory from './send-history';

const Send: FC = () => {
  const { push, pathname } = useRouter();
  const [initial, setInitial] = useState(true);
  const [sendType, setSendType] = useState<SendType | null>(null);

  const onChangeTab = (index: number) => {
    push(
      index ? Routes[RoutesEnum.SendHistory] : Routes[RoutesEnum.Send],
      undefined,
      { shallow: true }
    );
  };

  return (
    <Layout features={['coins', 'objects']}>
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
            ...(!(sendType === SendType.Transfer)
              ? [
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
                ]
              : []),
          ]}
        />
      </Box>
      {Routes[RoutesEnum.SendHistory] === pathname ? (
        <SendHistory />
      ) : initial ? (
        <SendSelectType
          onSelectType={(type: SendType) => {
            setInitial(false);
            setSendType(type);
          }}
        />
      ) : sendType === SendType.Bulk ? (
        <SendBulk
          goBack={() => {
            setInitial(true);
            setSendType(null);
          }}
        />
      ) : sendType === SendType.Link ? (
        <SendSimple
          goBack={() => {
            setInitial(true);
            setSendType(null);
          }}
        />
      ) : sendType === SendType.Transfer ? (
        <SendTransfer
          goBack={() => {
            setInitial(true);
            setSendType(null);
          }}
        />
      ) : null}
    </Layout>
  );
};

export default Send;
