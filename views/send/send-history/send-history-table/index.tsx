import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { AnimatePresence } from 'framer-motion';
import { FC, useState } from 'react';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { Network } from '@/constants';
import { useNetwork } from '@/context/network';
import { DefaultSVG, WarningSVG } from '@/svg';
import { listCreatedLinks } from '@/utils/zksend';

import SendHistoryDetails from './send-history-details';

const SendHistoryTable: FC = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const [detailsIndex, setDetailsIndex] = useState<number | null>(null);

  const { data } = useSWR(
    `${network}-${currentAccount?.address}-${suiClient}`,
    async () => {
      if (!currentAccount || !suiClient) return;

      const list = await listCreatedLinks({
        client: suiClient,
        address: currentAccount.address,
        network: network === Network.MAINNET ? 'mainnet' : 'testnet',
      });

      return list;
    }
  );

  return (
    <Motion rowGap="l" as="table">
      <Box as="thead">
        <Box as="tr">
          {['Asset', 'Status', 'Date'].map((item) => (
            <Typography
              as="th"
              px="xl"
              key={v4()}
              size="small"
              color="outline"
              variant="label"
              textAlign="left"
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Box>
      <Motion as="tbody">
        {data?.links.map(({ assets, createdAt, claimed }, index) => (
          <>
            <Box as="tr" key={v4()}>
              <Typography
                px="xl"
                my="xs"
                as="td"
                gap="s"
                size="small"
                display="flex"
                variant="label"
                alignItems="center"
              >
                <Box
                  bg="black"
                  width="2rem"
                  color="white"
                  height="2rem"
                  display="flex"
                  borderRadius="xs"
                  alignItems="center"
                  justifyContent="center"
                >
                  <DefaultSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
                </Box>
                <Typography as="span" size="small" variant="label">
                  {assets.nfts.length + assets.balances.length} Asset
                  {assets.nfts.length + assets.balances.length !== 1 && 's'}
                </Typography>
              </Typography>
              <Typography as="td" size="small" variant="label" px="xl">
                <Typography
                  p="xs"
                  as="span"
                  size="medium"
                  variant="label"
                  borderRadius="full"
                  bg={claimed ? 'warningContainer' : 'successContainer'}
                  color={claimed ? 'onWarningContainer' : 'onSuccessContainer'}
                >
                  {claimed ? 'Claimed' : 'Active'}
                </Typography>
              </Typography>
              <Typography as="td" size="small" variant="label" px="xl">
                {new Date(createdAt!).toLocaleString(undefined, {
                  minute: 'numeric',
                  hour: 'numeric',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </Typography>
              <Typography as="td" size="small" variant="label" px="xl">
                <Button
                  variant="outline"
                  isIcon
                  borderRadius="full"
                  onClick={() =>
                    setDetailsIndex((i) => (i === index ? null : index))
                  }
                >
                  <WarningSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
                </Button>
              </Typography>
            </Box>
            <AnimatePresence>
              {index === detailsIndex && (
                <Motion
                  as="tr"
                  key={v4()}
                  bg="container"
                  exit={{ scaleY: 0 }}
                  style={{ originY: 0 }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    duration: 0.1,
                    ease: 'easeInOut',
                  }}
                >
                  <td colSpan={5}>
                    <SendHistoryDetails assets={assets} network={network} />
                  </td>
                </Motion>
              )}
            </AnimatePresence>
          </>
        ))}
      </Motion>
    </Motion>
  );
};

export default SendHistoryTable;
