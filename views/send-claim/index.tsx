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
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDebounce } from 'use-debounce';

import Layout from '@/components/layout';
import { useNetwork } from '@/context/network';
import { CheckmarkSVG } from '@/svg';
import { showTXSuccessToast } from '@/utils';

import SendHistoryDetails from '../components/send-asset-details';
import { LOCAL_STORAGE_CLAIM_URL } from './send-claim.data';
import { useClaim } from './send-claim.hooks';
import { IClaimForm, SendClaimProps } from './send-claim.types';

const SendClaim: FC<SendClaimProps> = ({
  id,
  data,
  error,
  mutate,
  isLoading,
}) => {
  const claim = useClaim();
  const network = useNetwork();
  const [url, setUrl] = useState('');
  const currentAccount = useCurrentAccount();
  const [isClaiming, setClaiming] = useState(false);
  const { control, register } = useFormContext<IClaimForm>();
  const [address] = useDebounce(useWatch({ control, name: 'address' }), 800);

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

  const onSuccess = (tx: SuiTransactionBlockResponse) => {
    showTXSuccessToast(tx, network);
  };

  const isClaimed = data?.link?.claimed || (data && !data.link);

  const isDisabled =
    isClaiming ||
    !data ||
    !data.link ||
    isLoading ||
    error ||
    isClaimed ||
    (!currentAccount && !isValidSuiAddress(address));

  const onClaim = async () => {
    if (isDisabled) return;

    const loadingId = toast.loading('Claiming...');
    setClaiming(true);
    try {
      await claim(data, id, address, onSuccess);
      toast.success('Assets claimed');
    } catch (e) {
      toast.error((e as any).message ?? 'Something went wrong');
    } finally {
      mutate();
      toast.dismiss(loadingId);
    }
  };

  if (isClaimed)
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
          {!data && !isLoading ? 'Nothing to claim' : 'Funds ready to be claim'}
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
              {...register('address')}
              fieldProps={{ borderRadius: 'xs' }}
            />
          </Box>
        )}
        {!data && isLoading ? (
          <ProgressIndicator size={36} variant="loading" />
        ) : (
          data?.link?.assets && (
            <Box>
              {data?.link?.assets && !currentAccount && (
                <Typography variant="body" size="medium" mb="xs">
                  2. Assets to claim
                </Typography>
              )}
              <Box
                minWidth="25rem"
                borderRadius="s"
                border="1px solid"
                borderColor="outlineVariant"
              >
                <SendHistoryDetails
                  network={network}
                  assets={data.link.assets}
                />
              </Box>
            </Box>
          )
        )}
        <Box display="flex" justifyContent="center">
          <Button variant="filled" onClick={onClaim} disabled={isDisabled}>
            Claim
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default SendClaim;
