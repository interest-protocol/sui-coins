import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import Layout from '@/components/layout';
import { useNetwork } from '@/context/network';
import { CheckmarkSVG } from '@/svg';
import { showTXSuccessToast } from '@/utils';

import SendHistoryDetails from '../components/send-asset-details';
import { useClaimLink, useLinkWithUrl } from './send-claim.hooks';
import { SendClaimProps } from './send-claim.types';

const SendClaim: FC<SendClaimProps> = ({ id }) => {
  const claim = useClaimLink();
  const network = useNetwork();
  const [isClaiming, setClaiming] = useState(false);

  const { data, isLoading, error } = useLinkWithUrl(id, isClaiming);

  const onSuccess = (tx: SuiTransactionBlockResponse) => {
    showTXSuccessToast(tx, network);
  };

  const onClaim = async () => {
    if (
      isClaiming ||
      !data ||
      !data.link ||
      isLoading ||
      error ||
      data.link.claimed
    )
      return;

    const loadingId = toast.loading('Claiming...');
    setClaiming(true);
    try {
      await claim(data, id, onSuccess);
      toast.success('Assets claimed');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setClaiming(false);
      toast.dismiss(loadingId);
    }
  };

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
          {!isLoading && !data
            ? 'Nothing to claim'
            : data && !data.url
              ? 'Assets already claimed'
              : 'Funds ready to be claim'}
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
        {data?.link?.assets ? (
          <Box
            minWidth="25rem"
            borderRadius="s"
            border="1px solid"
            borderColor="outlineVariant"
          >
            <SendHistoryDetails
              index={0}
              network={network}
              assets={data.link.assets}
            />
          </Box>
        ) : (
          <Box color="success" my="xl">
            <CheckmarkSVG
              filled
              width="100%"
              maxWidth="6rem"
              maxHeight="6rem"
            />
          </Box>
        )}

        <Box display="flex" justifyContent="center">
          <Button
            variant="filled"
            onClick={onClaim}
            disabled={
              isClaiming ||
              !data ||
              !data.link ||
              isLoading ||
              error ||
              (data && !data.link)
            }
          >
            {data && !data.link ? 'Claimed' : 'Claim'}
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default SendClaim;
