import {
  Box,
  Button,
  TooltipWrapper,
  Typography,
} from '@interest-protocol/ui-kit';
import { useCurrentWallet } from '@mysten/dapp-kit';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { INCINERATOR_EXTERNAL_LINK } from '@/constants';
import { useBlocklist } from '@/hooks/use-blocklist';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useVerifiedDeFiNfts } from '@/hooks/use-verified-defi-nfts';
import { useWeb3 } from '@/hooks/use-web3';
import { TimedSuiTransactionBlockResponse } from '@/interface';
import { BurnSVG, MergeSVG } from '@/svg';
import { showTXSuccessToast } from '@/utils';
import { useBurn } from '@/views/incinerator/incinerator.hooks';
import { ObjectField } from '@/views/incinerator/incinerator.types';
import { objectDataToObjectField } from '@/views/incinerator/incinerator.utils';
import { useMergeCoins } from '@/views/merge/merge.hooks';

const FloatingButtons: FC = () => {
  const burn = useBurn();
  const mergeCoins = useMergeCoins();
  const getExplorerUrl = useGetExplorerUrl();
  const { currentWallet } = useCurrentWallet();
  const [loading, setLoading] = useState(false);
  const { data, isLoading, error } = useBlocklist();
  const { data: verifiedDeFiNfts } = useVerifiedDeFiNfts();
  const { coins, coinsMap, mutate, objects: allObjects } = useWeb3();

  const coinsToMerge = coins.filter(({ objectsCount }) => objectsCount > 1);

  const handleMergeCoins = async () => {
    if (loading) return;

    setLoading(true);
    const toastId = toast.loading('Merging coins...');
    try {
      await mergeCoins(coinsToMerge);
    } catch (e) {
      toast.error((e as Error).message ?? 'Failed to merge coins.');
    } finally {
      toast.dismiss(toastId);
      mutate();
      setLoading(false);
    }
  };

  const scamObjects = objectDataToObjectField(allObjects, coinsMap).reduce(
    (acc, curr) => {
      if (
        verifiedDeFiNfts?.includes(
          curr.kind === 'Coin' ? curr.display!.type : curr.type
        ) ||
        !data?.includes(curr.kind === 'Coin' ? curr.display!.type : curr.type)
      )
        return acc;

      return [...acc, curr];
    },
    [] as ReadonlyArray<ObjectField>
  );

  const disabled =
    isLoading ||
    !!error ||
    !scamObjects.length ||
    !scamObjects.some(({ type }) => data?.includes(type));

  const onSuccess = (tx: TimedSuiTransactionBlockResponse) =>
    showTXSuccessToast(tx, getExplorerUrl, 'Scams burned successfully!');

  const onSelectScams = async () => {
    if (disabled) return;

    const isSuiWallet = currentWallet?.name === 'Sui Wallet';

    if (isSuiWallet)
      return window.open(INCINERATOR_EXTERNAL_LINK, '_blank', 'noreferrer');

    setLoading(true);
    const toastId = toast.loading('Burning Scams...');

    try {
      await burn(scamObjects, onSuccess);
    } catch (e) {
      toast.error((e as Error).message ?? 'Failed to Burn.');
    } finally {
      toast.dismiss(toastId);
      mutate();
      setLoading(false);
    }
  };

  return (
    <Box
      right="2rem"
      bottom="2rem"
      position="fixed"
      zIndex="2"
      display="flex"
      flexDirection="column"
      gap="m"
    >
      <TooltipWrapper
        px="s"
        whiteSpace="nowrap"
        bg="lowestContainer"
        tooltipPosition="left"
        boxShadow="0 0 1rem #0003"
        tooltipContent={
          coinsToMerge.length
            ? `Merge all ${coinsToMerge.length} coins`
            : 'Nothing to merge'
        }
      >
        {!!coinsToMerge.length && (
          <Typography
            zIndex="1"
            bg="error"
            size="medium"
            display="flex"
            width="1.5rem"
            height="1.5rem"
            variant="label"
            color="onError"
            right="-0.5rem"
            alignItems="center"
            position="absolute"
            borderRadius="full"
            justifyContent="center"
          >
            {coinsToMerge.length}
          </Typography>
        )}
        <Button
          isIcon
          width="3rem"
          height="3rem"
          variant="filled"
          borderRadius="full"
          onClick={handleMergeCoins}
          disabled={loading || !coinsToMerge.length}
        >
          <MergeSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Button>
      </TooltipWrapper>
      <TooltipWrapper
        px="s"
        whiteSpace="nowrap"
        bg="lowestContainer"
        tooltipPosition="left"
        boxShadow="0 0 1rem #0003"
        tooltipContent={
          scamObjects.length
            ? `Burn ${scamObjects.length} scams`
            : 'You are safe!'
        }
      >
        {!!scamObjects.length && (
          <Typography
            zIndex="1"
            bg="error"
            size="medium"
            display="flex"
            width="1.5rem"
            height="1.5rem"
            variant="label"
            color="onError"
            right="-0.5rem"
            alignItems="center"
            position="absolute"
            borderRadius="full"
            justifyContent="center"
          >
            {scamObjects.length}
          </Typography>
        )}
        <Button
          isIcon
          width="3rem"
          height="3rem"
          variant="tonal"
          bg="errorContainer"
          borderRadius="full"
          alignItems="center"
          position="relative"
          whiteSpace="nowrap"
          disabled={disabled}
          onClick={onSelectScams}
          color="onErrorContainer"
          borderColor="outlineVariant"
          nHover={!disabled && { bg: 'error', color: 'surface' }}
          nActive={!disabled && { bg: 'error', color: 'surface' }}
        >
          <BurnSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Button>
      </TooltipWrapper>
    </Box>
  );
};

export default FloatingButtons;
