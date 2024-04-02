import {
  Box,
  Button,
  Motion,
  TooltipWrapper,
  Typography,
} from '@interest-protocol/ui-kit';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { EXPLORER_URL, Network, Routes, RoutesEnum } from '@/constants';
import { useNetwork } from '@/context/network';
import { AssetSVG, InfoSVG, ReloadSVG, SendSVG } from '@/svg';
import { showTXSuccessToast } from '@/utils';
import { listCreatedLinks } from '@/utils/zksend';
import PoweredByZkSend from '@/views/components/powered-by-zksend';

import SendHistoryDetails from '../../components/send-asset-details';
import { useRegenerateLink } from './send-history.hooks';
import { ZkSendLinkItem } from './send-history.types';

const SendHistoryTable: FC = () => {
  const { push } = useRouter();
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const [currentCursor, setCursor] = useState<string>('');
  const [detailsIndex, setDetailsIndex] = useState<number | null>(null);
  const [linkList, setLinkList] = useState<ReadonlyArray<ZkSendLinkItem>>([]);

  const regenerateLink = useRegenerateLink();

  const { data, error, mutate } = useSWR(
    `${network}-${currentAccount?.address}-${suiClient}`,
    async () => {
      if (!currentAccount || !suiClient) return;

      const { links, hasNextPage, cursor } = await listCreatedLinks({
        client: suiClient,
        address: currentAccount.address,
        network: network === Network.MAINNET ? 'mainnet' : 'testnet',
        ...(currentCursor && { cursor: currentCursor }),
      });

      if (hasNextPage) setCursor(cursor ?? '');

      setLinkList([
        ...linkList,
        ...links.filter((item) =>
          linkList.every(({ digest }) => digest !== item.digest)
        ),
      ]);

      return hasNextPage;
    }
  );

  console.log({ error });

  const onSuccess = (tx: SuiTransactionBlockResponse, id: string) => {
    showTXSuccessToast(tx, network);

    push(`${Routes[RoutesEnum.SendLink]}/${id}`);
  };

  const gotoExplorer = (digest: string) =>
    window.open(`${EXPLORER_URL[network]}/tx/${digest}`);

  return (
    <Box my="l" display="grid" gap="l">
      <Motion as="table" rowGap="l" width="100%">
        <Box as="thead">
          <Box as="tr">
            {['Asset', 'Date', 'Status'].map((item, index) => (
              <Typography
                as="th"
                key={v4()}
                size="small"
                color="outline"
                variant="label"
                textAlign="left"
                {...(!index && { pl: 'xl' })}
                {...(index === 2 && { pr: 'xl' })}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
        <Motion as="tbody">
          {linkList.map(
            ({ link, assets, createdAt, claimed, digest }, index) => (
              <>
                <Box as="tr" key={v4()}>
                  <Typography
                    pl="xl"
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
                      <AssetSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
                    </Box>
                    <Typography as="span" size="medium" variant="body">
                      {assets.nfts.length + assets.balances.length} Asset
                      {assets.nfts.length + assets.balances.length !== 1 && 's'}
                    </Typography>
                  </Typography>
                  <Typography as="td" size="small" variant="body">
                    {new Date(createdAt!).toLocaleString(undefined, {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </Typography>
                  <Typography as="td" size="small" variant="label">
                    <Typography
                      p="xs"
                      as="span"
                      size="medium"
                      variant="label"
                      borderRadius="full"
                      bg={`${claimed ? 'warning' : 'success'}Container`}
                      color={`on${claimed ? 'Warning' : 'Success'}Container`}
                    >
                      {claimed ? 'Claimed' : 'Active'}
                    </Typography>
                  </Typography>

                  <Typography
                    as="td"
                    pr="xl"
                    gap="xs"
                    size="small"
                    display="flex"
                    variant="label"
                    justifyContent="flex-end"
                  >
                    <TooltipWrapper
                      bg="lowContainer"
                      tooltipPosition="top"
                      tooltipContent={
                        <Typography variant="label" size="small">
                          Details
                        </Typography>
                      }
                    >
                      <Button
                        isIcon
                        variant="tonal"
                        borderRadius="full"
                        disabled={
                          !(assets.nfts.length + assets.balances.length)
                        }
                        onClick={() =>
                          assets.nfts.length + assets.balances.length &&
                          setDetailsIndex((i) => (i === index ? null : index))
                        }
                      >
                        <InfoSVG
                          maxHeight="1rem"
                          maxWidth="1rem"
                          width="100%"
                        />
                      </Button>
                    </TooltipWrapper>
                    <TooltipWrapper
                      bg="lowContainer"
                      tooltipPosition="top"
                      tooltipContent={
                        <Typography
                          size="small"
                          variant="label"
                          textAlign="center"
                        >
                          Regenerate Link
                        </Typography>
                      }
                    >
                      <Button
                        isIcon
                        variant="tonal"
                        disabled={claimed}
                        borderRadius="full"
                        onClick={() =>
                          !claimed && regenerateLink(link, digest!, onSuccess)
                        }
                      >
                        <ReloadSVG
                          maxHeight="1rem"
                          maxWidth="1rem"
                          width="100%"
                        />
                      </Button>
                    </TooltipWrapper>
                    <TooltipWrapper
                      bg="lowContainer"
                      tooltipPosition="top"
                      tooltipContent={
                        <Typography variant="label" size="small">
                          Explorer
                        </Typography>
                      }
                    >
                      <Button
                        isIcon
                        variant="tonal"
                        borderRadius="full"
                        onClick={() => gotoExplorer(digest!)}
                      >
                        <SendSVG
                          maxHeight="1rem"
                          maxWidth="1rem"
                          width="100%"
                        />
                      </Button>
                    </TooltipWrapper>
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
                        <SendHistoryDetails
                          index={index}
                          assets={assets}
                          network={network}
                        />
                      </td>
                    </Motion>
                  )}
                </AnimatePresence>
              </>
            )
          )}
        </Motion>
      </Motion>
      <Button
        mx="auto"
        disabled={!data}
        variant="outline"
        onClick={() => mutate()}
      >
        View More
      </Button>
      <PoweredByZkSend />
    </Box>
  );
};

export default SendHistoryTable;
