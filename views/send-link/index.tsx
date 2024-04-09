import {
  Box,
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import Layout from '@/components/layout';
import { useNetwork } from '@/context/network';
import { CheckmarkSVG, ErrorSVG } from '@/svg';
import { showTXSuccessToast } from '@/utils';

import { useReclaimLink } from './send-link.hooks';
import { SendLinkProps } from './send-link.types';

const SendLink: FC<SendLinkProps> = ({ data, error, isLoading }) => {
  const network = useNetwork();
  const reclaim = useReclaimLink();
  const [isReclaiming, setReclaiming] = useState(false);

  const url = location.href;

  const handleCopyLink = () => {
    if (isReclaiming || isLoading || error || !data) return;

    window.navigator.clipboard.writeText(location.href);
    toast('Copied to clipboard');
  };

  const onSuccess = (tx: SuiTransactionBlockResponse) => {
    showTXSuccessToast(tx, network);
  };

  const onReclaim = async () => {
    if (!data) return;

    const toasterId = toast.loading('Reclaiming...');
    setReclaiming(true);
    try {
      await reclaim(data, onSuccess);
      toast.success('Link reclaimed successfully');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setReclaiming(false);
      toast.dismiss(toasterId);
    }
  };

  const isClaimed = !!data?.claimed;

  if (isClaimed)
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
            Assets already claimed
          </Typography>
          <Typography
            size="large"
            variant="body"
            color="outline"
            maxWidth="27rem"
            textAlign="center"
          >
            The person who shared this link with you is attempting to send you
            assets
          </Typography>
          <Box color="success" my="xl">
            <CheckmarkSVG
              filled
              width="100%"
              maxWidth="6rem"
              maxHeight="6rem"
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Button variant="filled" disabled={true}>
              Claimed
            </Button>
          </Box>
        </Box>
      </Layout>
    );

  const isDisabled = isReclaiming || isLoading || error || !data;

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
              width="150"
              alt="QR Code"
              src={`https://api.qrserver.com/v1/create-qr-code?data=${url}&size=150x150`}
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
            disabled={isDisabled}
            onClick={handleCopyLink}
          >
            Copy Link
          </Button>
          <Button variant="outline" onClick={onReclaim} disabled={isDisabled}>
            Reclaim
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default SendLink;
