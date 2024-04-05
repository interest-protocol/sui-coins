import {
  Box,
  Button,
  Dialog,
  Motion,
  ProgressIndicator,
  TooltipWrapper,
  Typography,
} from '@interest-protocol/ui-kit';
import type { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import type { ZkSendLink } from '@mysten/zksend';
import type { LinkAssets } from '@mysten/zksend/dist/cjs/links/utils';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';

import { EXPLORER_URL, Routes, RoutesEnum } from '@/constants';
import { useNetwork } from '@/context/network';
import { useModal } from '@/hooks/use-modal';
import {
  DefaultAssetSVG,
  EmptyBoxSVG,
  InfoSVG,
  ReloadSVG,
  SendSVG,
} from '@/svg';
import { showTXSuccessToast } from '@/utils';
import PoweredByZkSend from '@/views/components/powered-by-zksend';

import { useLinkList, useRegenerateLink } from './send-history.hooks';
import { ZkSendLinkItem } from './send-history.types';
import SendHistoryDetailsModal from './send-history-details';

const SendHistoryTable: FC = () => {
  const { push } = useRouter();
  const network = useNetwork();
  const { setModal, handleClose } = useModal();
  const [currentCursor, setCursor] = useState<string>('');
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

  const { data, mutate, isLoading } = useLinkList(
    currentCursor,
    updateLinkInfo
  );

  const onSuccess = (tx: SuiTransactionBlockResponse, id: string) => {
    showTXSuccessToast(tx, network);

    push(`${Routes[RoutesEnum.SendLink]}/${id}`);
  };

  const openDetails = (assets: LinkAssets) =>
    setModal(
      <SendHistoryDetailsModal closeModal={handleClose} assets={assets} />
    );

  const gotoExplorer = (digest: string) =>
    window.open(`${EXPLORER_URL[network]}/tx/${digest}`);

  const handleRegenerateLink = async (link: ZkSendLink, digest: string) => {
    const toastId = toast.loading('Regenerating...');
    try {
      await regenerateLink(link, digest!, onSuccess);
      toast.success('Link regenerated successfully!');
    } catch (e) {
      toast.error((e as any).message ?? 'Link regenerating failed!');
    } finally {
      toast.dismiss(toastId);
    }
  };

  const onRegenerateLink = (
    claimed: boolean,
    link: ZkSendLink,
    digest: string
  ) => {
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
            handleRegenerateLink(link, digest);
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
    <Box my="l" display="grid" gap="l">
      <Motion as="table" rowGap="l" width="100%">
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
                      <Typography size="medium" variant="body">
                        ID {index + 1}
                      </Typography>
                      <Typography
                        as="span"
                        size="small"
                        variant="body"
                        color="outline"
                      >
                        Assets: {assets.nfts.length + assets.balances.length}
                      </Typography>
                    </Box>
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
                      bg={`${claimed ? 'primary' : 'success'}Container`}
                      color={`on${claimed ? 'Primary' : 'Success'}Container`}
                    >
                      {claimed ? 'Claimed' : 'Unclaimed'}
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
                          Regenerate Link
                        </Typography>
                      }
                    >
                      <Button
                        isIcon
                        bg="container"
                        variant="tonal"
                        disabled={claimed}
                        borderRadius="full"
                        onClick={() => onRegenerateLink(claimed, link, digest!)}
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
      {isLoading ? (
        <Box mx="auto">
          <ProgressIndicator size={40} variant="loading" />
        </Box>
      ) : linkList.length ? null : (
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
