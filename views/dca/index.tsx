import { Box, Tabs, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';

import DCAAggregator from './dca-aggregator';
import DCAFields from './dca-fields';
import DCAFlipToken from './dca-flip-token';
import DCAPoweredBy from './dca-powered-by';
import DCAQuoteManager from './dca-quote-manager';
import DCARecentOrders from './dca-recent-orders';
import Input from './input';
import HeaderInfo from './input/header-info';
import SelectToken from './input/select-token';
import PreviewDCAButton from './preview-dca-button';

const DCA: FC = () => {
  const { push, pathname } = useRouter();

  const onChangeTab = (index: number) =>
    push(
      index ? Routes[RoutesEnum.DCAOrders] : Routes[RoutesEnum.DCA],
      undefined,
      { shallow: true }
    );

  return (
    <Layout>
      <Box my="3rem" display="flex" justifyContent="center">
        <Tabs
          type="square"
          onChangeTab={onChangeTab}
          defaultTabIndex={Number(Routes[RoutesEnum.DCAOrders] === pathname)}
          items={[
            <Typography variant="label" size="large" as="span" key={v4()}>
              Trade
            </Typography>,
            <Typography variant="label" size="large" as="span" key={v4()}>
              Orders
            </Typography>,
          ]}
        />
      </Box>
      <Box
        gap="l"
        mx="auto"
        mt="3.5rem"
        display="flex"
        borderRadius="l"
        flexDirection="column"
        px={['2xs', 'xl', 'xl', '7xl']}
        width={['100%', '100%', '100%', '39.75rem']}
      >
        <Box bg="lowestContainer" borderRadius="s" p="xl">
          <Typography textAlign="left" size="small" variant="display">
            Trade DCA
          </Typography>
          <Input />
          <Box
            display="flex"
            position="relative"
            alignContent="center"
            justifyContent="center"
          >
            <Box width="100%" height="0.313rem" bg="lowContainer" />
            <Box
              gap="s"
              my="-1.5rem"
              width="100%"
              display="flex"
              position="absolute"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                display="flex"
                width="3.25rem"
                height="3.25rem"
                borderRadius="full"
                border="5px solid"
                alignItems="center"
                borderColor="lowContainer"
                justifyContent="center"
              >
                <DCAFlipToken />
              </Box>
            </Box>
          </Box>
          <Box
            my="m"
            pt="xl"
            gap="xs"
            display="flex"
            borderRadius="xs"
            bg="lowestContainer"
            flexDirection="column"
          >
            <HeaderInfo label="to" />
            <SelectToken label="to" />
          </Box>
          <DCAFields />
          <PreviewDCAButton />
        </Box>
        <DCAPoweredBy />
        <DCAAggregator />
        <DCARecentOrders />
      </Box>
      <DCAQuoteManager />
    </Layout>
  );
};

export default DCA;
