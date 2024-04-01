import {
  Box,
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { FC, useMemo } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import Layout from '@/components/layout';
import { useNetwork } from '@/context/network';
import { ZkSendLinkData } from '@/interface';
import { ErrorSVG } from '@/svg';
import { showTXSuccessToast } from '@/utils';

import { useReclaimLink } from './send-link.hooks';

const SendLink: FC<{ id: string }> = ({ id }) => {
  const network = useNetwork();

  const { data, isLoading, error } = useSWR<ZkSendLinkData>(
    `${id}-${network}`,
    () =>
      fetch(`/api/v1/zksend?network=${network}&id=${id}`).then((response) =>
        response.json?.()
      )
  );

  const url = useMemo(() => `${location.origin}/send/claim/${id}`, []);

  const reclaim = useReclaimLink();

  const handleCopyLink = () => {
    window.navigator.clipboard.writeText(url);
    toast('Copied to clipboard');
  };

  const onSuccess = (tx: SuiTransactionBlockResponse) => {
    showTXSuccessToast(tx, network);
  };

  return (
    <Layout title="Claim link">
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
          Share your Claim Link
        </Typography>
        <Typography
          size="large"
          variant="body"
          color="outline"
          textAlign="center"
        >
          The claim is ready to be shared.
        </Typography>
        <Box
          p="2xl"
          width="12rem"
          height="12rem"
          display="flex"
          borderRadius="xs"
          overflow="hidden"
          border="1px solid"
          alignItems="center"
          justifyContent="center"
          borderColor="outlineVariant"
        >
          {data ? (
            <img
              alt="QR Code"
              src={`https://api.qrserver.com/v1/create-qr-code?data=${url}&size=120x120`}
            />
          ) : isLoading ? (
            <ProgressIndicator variant="loading" size={32} />
          ) : (
            <ErrorSVG maxWidth="4rem" maxHeight="4rem" width="100%" />
          )}
        </Box>
        <Box
          p="l"
          gap="l"
          width="100%"
          display="flex"
          borderRadius="s"
          border="1px solid"
          borderColor="error"
        >
          <ErrorSVG width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
          <Box display="flex" flexDirection="column" gap="xs">
            <Typography variant="title" size="medium" color="error">
              Save your link before leaving this page
            </Typography>
            <Typography variant="body" size="small" color="outline">
              Be sure to share or save your link before leaving this page,
              otherwise, the funds will be lost
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" gap="m">
          <Button
            variant="filled"
            onClick={handleCopyLink}
            disabled={!data || isLoading || error}
          >
            Copy Link
          </Button>
          <Button
            variant="outline"
            disabled={!data || isLoading || error}
            onClick={() => reclaim(data?.link, onSuccess)}
          >
            Reclaim
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default SendLink;
