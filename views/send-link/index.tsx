import {
  Box,
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { SUI_TYPE_ARG } from '@mysten/sui/utils';
import Image from 'next/image';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useWeb3 } from '@/hooks/use-web3';
import { TimedSuiTransactionBlockResponse } from '@/interface';
import { CheckmarkSVG, ErrorSVG } from '@/svg';
import { getCoins, showTXSuccessToast } from '@/utils';

import { useReclaimLink } from './send-link.hooks';
import { SendLinkProps } from './send-link.types';

const SendLink: FC<SendLinkProps> = ({ data, error, isLoading, mutate }) => {
  const { coinsMap } = useWeb3();
  const suiClient = useSuiClient();
  const reclaim = useReclaimLink();
  const getExplorerUrl = useGetExplorerUrl();
  const currentAccount = useCurrentAccount();
  const [isReclaiming, setReclaiming] = useState(false);

  const url = location.href;

  const handleCopyLink = () => {
    if (isReclaiming || isLoading || error || !data) return;

    window.navigator.clipboard.writeText(location.href);
    toast('Copied to clipboard');
  };

  const onSuccess = (tx: TimedSuiTransactionBlockResponse) =>
    showTXSuccessToast(tx, getExplorerUrl, 'Link reclaimed successfully');
  mutate();

  const onReclaim = async () => {
    const gasCoin = coinsMap[SUI_TYPE_ARG];

    if (!data || !gasCoin || !currentAccount)
      return toast.error('Something went wrong');

    const gasCoinObjects = await getCoins({
      coinType: SUI_TYPE_ARG,
      suiClient,
      account: currentAccount.address,
    });

    const gasObjects = gasCoinObjects.map(
      ({ digest, version, coinObjectId }) => ({
        digest: digest!,
        version: version!,
        objectId: coinObjectId,
      })
    );

    const toasterId = toast.loading('Reclaiming...');
    setReclaiming(true);
    try {
      await reclaim(data, gasObjects, onSuccess);
    } catch (e) {
      toast.error((e as Error).message ?? 'Something went wrong');
    } finally {
      setReclaiming(false);
      toast.dismiss(toasterId);
    }
  };

  const isClaimed = !!data?.claimed;

  if (isClaimed)
    return (
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
          <CheckmarkSVG filled width="100%" maxWidth="6rem" maxHeight="6rem" />
        </Box>
        <Box display="flex" justifyContent="center">
          <Button variant="filled" disabled={true}>
            Claimed
          </Button>
        </Box>
      </Box>
    );

  const isDisabled = isReclaiming || isLoading || error || !data;

  return (
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
          <Image
            style={{ width: '150' }}
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
        <Button variant="filled" disabled={isDisabled} onClick={handleCopyLink}>
          Copy Link
        </Button>
        <Button variant="outline" onClick={onReclaim} disabled={isDisabled}>
          Reclaim
        </Button>
      </Box>
    </Box>
  );
};

export default SendLink;
