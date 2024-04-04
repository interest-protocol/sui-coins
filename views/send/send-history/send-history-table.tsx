import {
  Box,
  Button,
  Motion,
  TooltipWrapper,
  Typography,
} from '@interest-protocol/ui-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import { EXPLORER_URL, Routes, RoutesEnum } from '@/constants';
import { useNetwork } from '@/context/network';
import { DefaultAssetSVG, InfoSVG, ReloadSVG, SendSVG } from '@/svg';
import { showTXSuccessToast } from '@/utils';
import PoweredByZkSend from '@/views/components/powered-by-zksend';

import SendHistoryDetails from '../../components/send-asset-details';
import { useLinkList, useRegenerateLink } from './send-history.hooks';
import { ZkSendLinkItem } from './send-history.types';

const SendHistoryTable: FC = () => {
  const { push } = useRouter();
  const network = useNetwork();
  const [currentCursor, setCursor] = useState<string>('');
  const [detailsIndex, setDetailsIndex] = useState<number | null>(null);
  const [linkList, setLinkList] = useState<ReadonlyArray<ZkSendLinkItem>>([]);

  const regenerateLink = useRegenerateLink();

  const updateLinkInfo = (
    links: ReadonlyArray<ZkSendLinkItem>,
    hasNextPage: boolean,
    cursor: string | null
  ) => {
    if (hasNextPage) setCursor(cursor ?? '');

    setLinkList([
      ...linkList,
      ...links.filter((item) =>
        linkList.every(({ digest }) => digest !== item.digest)
      ),
    ]);
  };

  const { data, mutate } = useLinkList(currentCursor, updateLinkInfo);

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
                      <DefaultAssetSVG
                        width="100%"
                        maxWidth="1rem"
                        maxHeight="1rem"
                      />
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
              </>
            )
          )}
        </Motion>
      </Motion>
      {data && (
        <Button
          mx="auto"
          disabled={!data}
          variant="outline"
          onClick={() => mutate()}
        >
          View More
        </Button>
      )}
      <PoweredByZkSend />
    </Box>
  );
};

export default SendHistoryTable;
