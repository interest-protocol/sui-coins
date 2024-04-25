import {
  Box,
  Checkbox,
  TextField,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TokenIcon } from '@/components';
import CheckRounded from '@/components/svg/check-rounded';
import { useNetwork } from '@/context/network';
import { PenSVG, XRounded } from '@/svg';

import { IncineratorTableRowProps } from './incinerator-table-row.types';

const IncineratorTableRow: FC<IncineratorTableRowProps> = ({
  index,
  coin,
  isChecked,
  qtyAvailable,
  qtyToIncinerate,
  approveEdition,
  denyEdition,
}) => {
  const network = useNetwork();
  const [isEditing, setIsEditing] = useState(false);

  const { control } = useFormContext();

  const currentToken = useWatch({
    control,
    name: 'incinerator',
  });

  const handleEditQtyToIncinerate = (index: number) => {
    setIsEditing(true);
    return index;
  };

  const handleCancelEdition = (index: number) => {
    setIsEditing(false);
    denyEdition(index);
  };

  const { symbol: currentSymbol, type: currentType } = currentToken ?? {
    symbol: undefined,
    type: undefined,
  };
  return (
    <Box
      p="xs"
      px="m"
      gap="s"
      display="flex"
      width="100%"
      minWidth="51.188rem"
      bg="lowestContainer"
      alignItems="center"
      justifyContent="center"
      flexDirection={['column', 'column', 'column', 'row']}
      nHover={{
        bg: 'lowContainer',
      }}
    >
      <Checkbox onClick={() => {}} defaultValue={isChecked} label="" />
      <Box>
        <TokenIcon
          withBg
          network={network}
          type={currentType}
          symbol={currentSymbol}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        width="12.625rem"
      >
        <Typography variant="body" size="medium">
          {coin}
        </Typography>
        <Typography variant="body" size="small" color="outline">
          Type: {currentType}
        </Typography>
      </Box>
      <Typography p="s" variant="body" width="16.188rem" size="medium">
        {qtyAvailable}B
      </Typography>
      {isEditing ? (
        <Box maxWidth="16.188rem" mx="xs" ml="-2rem">
          <TextField
            px="xs"
            fontSize="medium"
            placeholder="3.5B"
            fieldProps={{
              width: '100%',
              borderRadius: 'xs',
              borderColor: 'transparent',
            }}
          />
        </Box>
      ) : (
        <Typography p="s" width="16.188rem" variant="body" size="medium">
          {qtyToIncinerate}B
        </Typography>
      )}
      <Box
        display="flex"
        width="3.5rem"
        height="3.5rem"
        cursor="pointer"
        alignItems="center"
        justifyContent="center"
      >
        {isEditing ? (
          <Box
            gap="m"
            mr="s"
            display="flex"
            minWidth="100%"
            alignItems="center"
            justifyContent="center"
            flexDirection={['column', 'column', 'column', 'row']}
          >
            <CheckRounded
              width="100%"
              maxWidth="1rem"
              maxHeight="1rem"
              cursor="pointer"
              onClick={() => approveEdition(index)}
            />
            <XRounded
              width="100%"
              maxWidth="1rem"
              cursor="pointer"
              maxHeight="1rem"
              onClick={() => handleCancelEdition(index)}
            />
          </Box>
        ) : (
          <PenSVG
            width="100%"
            maxHeight="1rem"
            maxWidth="1rem"
            onClick={() => handleEditQtyToIncinerate(index)}
          />
        )}
      </Box>
    </Box>
  );
};

export default IncineratorTableRow;
