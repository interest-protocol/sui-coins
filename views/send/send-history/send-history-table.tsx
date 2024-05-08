import {
  Box,
  Button,
  Dialog,
  Motion,
  ProgressIndicator,
  TooltipWrapper,
  Typography,
} from '@interest-protocol/ui-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import type {
  SuiObjectRef,
  SuiTransactionBlockResponse,
} from '@mysten/sui.js/client';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import type { ZkSendLink } from '@mysten/zksend';
import type { LinkAssets } from '@mysten/zksend/dist/cjs/links/utils';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';

import { EXPLORER_URL, Routes, RoutesEnum } from '@/constants';
import { useNetwork } from '@/context/network';
import { useModal } from '@/hooks/use-modal';
import { useWeb3 } from '@/hooks/use-web3';
import {
  ChevronLeftSVG,
  ChevronRightSVG,
  DefaultAssetSVG,
  DownloadSVG,
  EmptyBoxSVG,
  InfoSVG,
  ReloadSVG,
  SendSVG,
} from '@/svg';
import { showTXSuccessToast } from '@/utils';
import PoweredByZkSend from '@/views/components/powered-by-zksend';
import { useReclaimLink } from '@/views/send-link/send-link.hooks';

import { useLinkList, useRegenerateLink } from './send-history.hooks';
import { findNextGasCoin } from './send-history.utils';
import SendHistoryDetailsModal from './send-history-details';

const SendHistoryTable: FC = () => {
  const { push } = useRouter();
  const network = useNetwork();
  const { coinsMap } = useWeb3();
  const reclaimLink = useReclaimLink();
  const regenerateLink = useRegenerateLink();
  const { setModal, handleClose } = useModal();
  const [currentCursor, setCursor] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [gasObjects, setGasObjects] = useState<Array<SuiObjectRef>>([]);
  const [previousCursors, setPreviousCursors] = useState<
    ReadonlyArray<string | null>
  >([]);
  const currentAccount = useCurrentAccount();

  const { data, isLoading, mutate } = useLinkList(currentCursor);

  useEffect(() => {
    if (data && data.cursor && data.cursor !== nextCursor) {
      setNextCursor(data.cursor);
    }
  }, [data]);

  const next = () => {
    if (data && data.hasNextPage && currentCursor !== nextCursor) {
      setPreviousCursors([currentCursor, ...(previousCursors ?? [])]);
      setCursor(nextCursor);
    }
  };

  const previous = () => {
    if (
      data &&
      previousCursors.length &&
      previousCursors[0] !== currentCursor
    ) {
      setCursor(previousCursors[0]);
      setPreviousCursors(([, ...tail]) => tail);
    }
  };

  const onSuccessReclaim = (tx: SuiTransactionBlockResponse) => {
    if (!currentAccount) return;
    showTXSuccessToast(tx, network);

    setGasObjects(findNextGasCoin(tx, currentAccount.address));

    mutate();
  };

  const onSuccessRegenerate = (
    tx: SuiTransactionBlockResponse,
    url: string
  ) => {
    showTXSuccessToast(tx, network);

    push(`${Routes[RoutesEnum.SendLink]}#${url.split('#')[1]}`);
  };

  const openDetails = (assets: LinkAssets) =>
    setModal(
      <SendHistoryDetailsModal closeModal={handleClose} assets={assets} />
    );

  const gotoExplorer = (digest: string) =>
    window.open(`${EXPLORER_URL[network]}/tx/${digest}`);

  const handleReclaimLink = async (link: ZkSendLink) => {
    const gasCoins = gasObjects.length
      ? gasObjects
      : coinsMap[SUI_TYPE_ARG].objects.map(
          ({ coinObjectId, digest, version }) => ({
            objectId: coinObjectId,
            digest,
            version,
          })
        );

    const toastId = toast.loading('Reclaiming...');
    try {
      await reclaimLink(link, gasCoins, onSuccessReclaim);
      toast.success('Link reclaimed successfully!');
    } catch (e) {
      toast.error((e as any).message ?? 'Link reclaiming failed!');
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleRegenerateLink = async (link: ZkSendLink) => {
    const toastId = toast.loading('Regenerating...');
    try {
      await regenerateLink(link, onSuccessRegenerate);
      toast.success('Link regenerated successfully!');
    } catch (e) {
      toast.error((e as any).message ?? 'Link regenerating failed!');
    } finally {
      toast.dismiss(toastId);
    }
  };

  const onRegenerateLink = (claimed: boolean, link: ZkSendLink) => {
    if (claimed) return;

    setModal(
      <Dialog
        title="Caution"
        status="warning"
        message="Regenerated links cannot be listed on the history page. Once you lose the link again, you cannot regenerate again."
        primaryButton={{
          label: 'Continue anyway',
          onClick: () => {
            handleClose();
            handleRegenerateLink(link);
          },
        }}
        secondaryButton={{
          label: 'Cancel',
          onClick: handleClose,
        }}
      />
    );
  };

  return (
    <Box mb="l" display="grid" gap="l">
      <Box overflowX="auto">
        {!!data?.links.length && (
          <Motion as="table" rowGap="l" width="100%" mt="l">
            <Box as="thead">
              <Box as="tr">
                {['ID', 'Date', 'Status'].map((item, index) => (
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
              {data?.links.map(
                ({ link, assets, createdAt, claimed, digest }, index) => (
                  <>
                    <Box as="tr" key={v4()}>
                      <Typography
                        pl="xl"
                        pr="m"
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
                          color="white"
                          display="flex"
                          width="2.2rem"
                          height="2.2rem"
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
                        <Box>
                          <Typography
                            size="medium"
                            variant="body"
                            whiteSpace="nowrap"
                          >
                            ID {index + 1 + 10 * previousCursors.length}
                          </Typography>
                          <Typography
                            as="span"
                            size="small"
                            variant="body"
                            color="outline"
                            whiteSpace="nowrap"
                          >
                            Assets:{' '}
                            {assets.nfts.length + assets.balances.length}
                          </Typography>
                        </Box>
                      </Typography>
                      <Typography
                        pr="m"
                        as="td"
                        size="small"
                        variant="body"
                        whiteSpace="nowrap"
                      >
                        {new Date(createdAt!).toLocaleString(undefined, {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                        })}
                      </Typography>
                      <Typography pr="m" as="td" size="small" variant="label">
                        <Typography
                          p="xs"
                          as="span"
                          size="medium"
                          variant="label"
                          borderRadius="full"
                          bg={`${
                            !(assets.nfts.length + assets.balances.length)
                              ? 'warning'
                              : claimed
                                ? 'primary'
                                : 'success'
                          }Container`}
                          color={`on${
                            !(assets.nfts.length + assets.balances.length)
                              ? 'Warning'
                              : claimed
                                ? 'Primary'
                                : 'Success'
                          }Container`}
                        >
                          {!(assets.nfts.length + assets.balances.length)
                            ? 'Reclaimed'
                            : claimed
                              ? 'Claimed'
                              : 'Unclaimed'}
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
                            <Typography
                              size="small"
                              variant="label"
                              textAlign="center"
                            >
                              Regenerate
                            </Typography>
                          }
                        >
                          <Button
                            isIcon
                            bg="container"
                            variant="tonal"
                            disabled={claimed}
                            borderRadius="full"
                            onClick={() => onRegenerateLink(claimed, link)}
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
                            <Typography
                              size="small"
                              variant="label"
                              textAlign="center"
                            >
                              Reclaim
                            </Typography>
                          }
                        >
                          <Button
                            isIcon
                            bg="container"
                            variant="tonal"
                            disabled={claimed}
                            borderRadius="full"
                            onClick={() => handleReclaimLink(link)}
                          >
                            <DownloadSVG
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
                            bg="container"
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
                            bg="container"
                            variant="tonal"
                            borderRadius="full"
                            disabled={
                              !(assets.nfts.length + assets.balances.length)
                            }
                            onClick={() =>
                              assets.nfts.length + assets.balances.length &&
                              openDetails(assets)
                            }
                          >
                            <InfoSVG
                              width="100%"
                              maxWidth="1rem"
                              maxHeight="1rem"
                            />
                          </Button>
                        </TooltipWrapper>
                      </Typography>
                    </Box>
                  </>
                )
              )}
            </Motion>
          </Motion>
        )}
        {isLoading ? (
          <Box
            mx="auto"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <ProgressIndicator size={40} variant="loading" />
          </Box>
        ) : data?.links.length ? null : (
          <Box
            py="xl"
            mx="auto"
            display="flex"
            color="disable"
            alignItems="center"
            flexDirection="column"
          >
            <EmptyBoxSVG maxWidth="8rem" maxHeight="8rem" width="100%" />
            <Typography variant="title" size="medium">
              Nothing found!
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        px="l"
        gap="s"
        display="grid"
        alignItems="center"
        gridTemplateColumns="1fr 1fr 1fr"
      >
        <Box>
          {!!previousCursors.length && (
            <Button mr="auto" variant="outline" onClick={previous}>
              <ChevronLeftSVG
                width="100%"
                maxWidth="0.8rem"
                maxHeight="0.8rem"
              />
              Previous
            </Button>
          )}
        </Box>
        {isLoading || !data?.links.length ? null : (
          <Typography variant="body" size="medium" mx="auto">
            Page: {previousCursors.length + 1}
          </Typography>
        )}
        <Box>
          {data?.hasNextPage && (
            <Button ml="auto" onClick={next} disabled={!data} variant="outline">
              Next
              <ChevronRightSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
            </Button>
          )}
        </Box>
      </Box>
      <PoweredByZkSend />
    </Box>
  );
};

export default SendHistoryTable;
