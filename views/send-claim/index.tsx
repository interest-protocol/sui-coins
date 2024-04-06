import {
  Box,
  Button,
  ProgressIndicator,
  TextField,
  Typography,
} from '@interest-protocol/ui-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { isValidSuiAddress } from '@mysten/sui.js/utils';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Layout from '@/components/layout';
import { useNetwork } from '@/context/network';
import { CheckmarkSVG } from '@/svg';
import { showTXSuccessToast } from '@/utils';

import SendHistoryDetails from '../components/send-asset-details';
import { LOCAL_STORAGE_CLAIM_URL } from './send-claim.data';
import { useClaim } from './send-claim.hooks';
import { SendClaimProps } from './send-claim.types';

const SendClaim: FC<SendClaimProps> = ({
  id,
  data,
  error,
  isLoading,
  claimingState: [isClaiming, setClaiming],
}) => {
  const claim = useClaim();
  const network = useNetwork();
  const [url, setUrl] = useState('');
  const [address, setAddress] = useState('');
  const currentAccount = useCurrentAccount();

  const onSuccess = (tx: SuiTransactionBlockResponse) => {
    showTXSuccessToast(tx, network);
  };

  useEffect(() => {
    setUrl(
      localStorage.getItem(`${LOCAL_STORAGE_CLAIM_URL}-${id}`) ??
        sessionStorage.getItem(`${LOCAL_STORAGE_CLAIM_URL}-${id}`) ??
        ''
    );
  }, []);

  useEffect(() => {
    if (url || !data || !data.url) return;

    setUrl(data.url);
    localStorage.setItem(`${LOCAL_STORAGE_CLAIM_URL}-${id}`, data.url);
    sessionStorage.setItem(`${LOCAL_STORAGE_CLAIM_URL}-${id}`, data.url);
  }, [data]);

  const onClaim = async () => {
    if (
      isClaiming ||
      !data ||
      !data.link ||
      isLoading ||
      error ||
      data.link.claimed ||
      (!currentAccount && !isValidSuiAddress(address))
    )
      return;

    const loadingId = toast.loading('Claiming...');
    setClaiming(true);
    try {
      await claim(data, id, address, onSuccess);
      toast.success('Assets claimed');
    } catch (e) {
      console.log({ e });

      toast.error((e as any).message ?? 'Something went wrong');
    } finally {
      setClaiming(false);
      toast.dismiss(loadingId);
    }
  };

  return (
    <Layout title="Claim assets" noSidebar>
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
            : !isLoading && data && data.url !== url
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
          The person who shared this link with you is attempting to send you
          assets
        </Typography>
        {data?.link?.assets && !currentAccount && (
          <Box minWidth="25rem">
            <Typography variant="body" size="medium" mb="xs">
              1. Recipient Address
            </Typography>
            <TextField
              width="100"
              nPlaceholder={{ opacity: 0.7 }}
              placeholder="Type the recipient address"
              onChange={(e) => setAddress(e.target.value)}
              fieldProps={{ borderRadius: 'xs' }}
            />
          </Box>
        )}
        {data?.link?.assets ? (
          <Box
            minWidth="25rem"
            borderRadius="s"
            border="1px solid"
            borderColor="outlineVariant"
          >
            <SendHistoryDetails network={network} assets={data.link.assets} />
          </Box>
        ) : isLoading ? (
          <ProgressIndicator size={36} variant="loading" />
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
              data.url !== url ||
              (data && !data.link) ||
              (!currentAccount && !isValidSuiAddress(address))
            }
          >
            {data && data.url !== url ? 'Claimed' : 'Claim'}
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default SendClaim;
