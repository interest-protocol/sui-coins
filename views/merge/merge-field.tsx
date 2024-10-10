import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { TokenIcon } from '@/components';
import { CoinObject } from '@/components/web3-manager/coins-manager/coins-manager.types';
import { useModal } from '@/hooks/use-modal';
import { useNetwork } from '@/hooks/use-network';
import { FixedPointMath } from '@/lib';
import { ChevronDownSVG, MinusSVG, SubtractBoxSVG } from '@/svg';

import SelectTokenModal from '../components/select-token-modal';
import { IMergeForm, MergeFieldProps } from './merge.types';

const MergeField: FC<MergeFieldProps> = ({
  type,
  symbol,
  remove,
  balance,
  decimals,
  objectsCount,
}) => {
  const network = useNetwork();
  const { handleClose, setModal } = useModal();
  const { setValue, getValues } = useFormContext<IMergeForm>();

  const onSelect = (coin: CoinObject) => {
    if (!(coin.objectsCount > 1))
      return toast.error('This coin do not have objects to merge');

    const ignored = new Set(getValues('ignored'));

    ignored.delete(type);
    ignored.add(coin.type);

    setValue('ignored', Array.from(ignored));
  };

  const openModal = () =>
    setModal(
      <SelectTokenModal simple onSelect={onSelect} closeModal={handleClose} />
    );

  return (
    <Box display="flex" flexDirection="column" gap="2xs">
      <Box display="flex" gap="s" alignItems="center">
        <Button
          p="2xs"
          width="100%"
          variant="outline"
          borderRadius="xs"
          onClick={openModal}
          nHover={{ color: 'unset' }}
          borderColor="outlineVariant"
          PrefixIcon={
            <TokenIcon withBg type={type} symbol={symbol} network={network} />
          }
          SuffixIcon={
            <ChevronDownSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
          }
        >
          <Typography
            size="large"
            width="100%"
            variant="body"
            color="onSurface"
          >
            {symbol}
          </Typography>
        </Button>
        <Button
          isIcon
          variant="tonal"
          bg="lowContainer"
          borderRadius="50%"
          onClick={() => remove(type)}
        >
          <MinusSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-between" px="2xs">
        <Box display="flex" color="outline" gap="0.5rem" alignItems="center">
          <Box width="1rem" height="1rem">
            <SubtractBoxSVG width="100%" maxWidth="100%" maxHeight="100%" />
          </Box>
          <Typography size="small" variant="body" fontSize="s">
            {FixedPointMath.toNumber(balance, decimals)} {symbol}
          </Typography>
        </Box>
        <Typography variant="body" size="small" color="outline">
          {objectsCount} objects to merge
        </Typography>
      </Box>
    </Box>
  );
};

export default MergeField;
