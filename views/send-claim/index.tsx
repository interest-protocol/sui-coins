import {
  Box,
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { ZkSendLink } from '@mysten/zksend';
import { not } from 'ramda';
import { FC, useState } from 'react';
import useSWR from 'swr';

import Layout from '@/components/layout';
import { useNetwork } from '@/context/network';
import { AssetSVG, ChevronDownSVG, ErrorSVG } from '@/svg';
import { showTXSuccessToast } from '@/utils';

import SendHistoryDetails from '../send/send-history/send-history-table/send-history-details';
import { useClaimLink } from './send-claim.hooks';

const SendClaim: FC<{ id: string }> = ({ id }) => {
  const network = useNetwork();
  const [isOpen, setOpen] = useState(false);

  const {
    data: link,
    isLoading,
    error,
  } = useSWR<ZkSendLink>(`${id}-${network}`, () =>
    fetch(`/api/v1/zksend?network=${network}&id=${id}`)
      .then((response) => response.json?.())
      .then((data) => ZkSendLink.fromUrl(data.link))
  );

  const claim = useClaimLink();

  const onSuccess = (tx: SuiTransactionBlockResponse) => {
    showTXSuccessToast(tx, network);
  };

  const items = [
    ...(link?.assets?.nfts ?? []),
    ...(link?.assets?.balances ?? []),
  ];

  return (
    <Layout title="Claim your assets" noSidebar>
      <Box
        p="2xl"
        gap="xl"
        mx="auto"
        width="100%"
        display="flex"
        borderRadius="s"
        alignItems="center"
        maxWidth="39.75rem"
        bg="lowestContainer"
        flexDirection="column"
        px={['2xs', 'xl', 'xl', '7xl']}
      >
        <Typography variant="title" size="large" textAlign="center">
          Assets ready to be claim
        </Typography>
        <Typography
          size="large"
          variant="body"
          color="outline"
          maxWidth="27rem"
          textAlign="center"
        >
          The person who shared this link with you is attempting to send you the
          following assets
        </Typography>
        <Box
          gap="m"
          width="12rem"
          height="12rem"
          display="flex"
          borderRadius="xs"
          overflow="hidden"
          border="1px solid"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          borderColor="outlineVariant"
        >
          {link ? (
            <>
              <Box
                bg="black"
                width="6rem"
                height="6rem"
                color="white"
                display="flex"
                borderRadius="m"
                alignItems="center"
                justifyContent="center"
              >
                <AssetSVG maxWidth="3rem" maxHeight="3rem" width="100%" />
              </Box>
              <Button
                variant="tonal"
                onClick={() => setOpen(not)}
                SuffixIcon={
                  <ChevronDownSVG
                    width="100%"
                    maxWidth="1rem"
                    maxHeight="1rem"
                  />
                }
              >
                {items.length} Asset{items.length === 1 ? '' : 's'}
              </Button>
            </>
          ) : isLoading ? (
            <ProgressIndicator variant="loading" size={32} />
          ) : (
            <ErrorSVG maxWidth="4rem" maxHeight="4rem" width="100%" />
          )}
        </Box>
        {link?.assets && isOpen && (
          <Box minWidth="25rem" bg="lowContainer" borderRadius="s">
            <SendHistoryDetails
              index={0}
              network={network}
              assets={link.assets}
            />
          </Box>
        )}
        <Box display="flex" justifyContent="center">
          <Button
            variant="filled"
            onClick={() => claim(link, onSuccess)}
            disabled={!link || isLoading || error || link.claimed}
          >
            {link?.claimed ? 'Claimed' : 'Claim'}
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default SendClaim;
