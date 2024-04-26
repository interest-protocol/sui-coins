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
  type,
  qtyAvailable,
  qtyToIncinerate,
  approveEdition,
  denyEdition,
}) => {
  const network = useNetwork();
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { control } = useFormContext();

  const currentToken = useWatch({
    control,
    name: 'incinerator',
  });

  const handleEditQtyToIncinerate = (index: number) => {
    setIsEditing(true);
    setIsChecked(false);
    return index;
  };

  const handleSelectCoinToIncinerate = (index: number) => {
    setIsChecked(!isChecked);
    return index;
  };

  const handleCancelEdition = (index: number) => {
    setIsEditing(false);
    setIsChecked(false);
    denyEdition(index);
  };

  const { symbol: currentSymbol, type: currentType } = currentToken ?? {
    symbol: undefined,
    type: undefined,
  };
  return (
    <Box
      my="xs"
      px="m"
      gap="s"
      display="flex"
      overflowX="auto"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      width={['auto', 'auto', '100%']}
      bg={isChecked ? 'lowContainer' : 'lowestContainer'}
      maxWidth={['calc(100vw - 3rem)', 'calc(100vw - 3rem)', '51rem']}
      nHover={{
        bg: 'lowContainer',
      }}
    >
      <Checkbox
        onClick={() => handleSelectCoinToIncinerate(index)}
        defaultValue={isChecked}
        label=""
      />
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
        width="12.625rem"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Typography variant="body" size="medium">
          {coin}
        </Typography>
        <Typography variant="body" size="small" color="outline">
          Type: {type}
        </Typography>
      </Box>
      <Typography p="s" variant="body" width="16.188rem" size="medium">
        {qtyAvailable}B
      </Typography>
      <Box width="12.688rem" mx="xs">
        {isEditing ? (
          <TextField
            fontSize="0.875rem"
            placeholder="3.5B"
            fieldProps={{
              width: '100%',
              borderRadius: 'xs',
              marginRight: '2rem',
              borderColor: 'primary',
              border: '2px solid',
              nHover: { border: 'none' },
              nFocus: { border: 'none' },
              nActive: { border: 'none' },
            }}
          />
        ) : (
          <Typography p="s" width="16.188rem" variant="body" size="medium">
            {qtyToIncinerate}B
          </Typography>
        )}
      </Box>
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
            display="flex"
            overflowX="auto"
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
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            nHover={{
              padding: 'xs',
              borderRadius: 'full',
              background: 'outlineVariant',
            }}
          >
            <PenSVG
              width="100%"
              maxHeight="1rem"
              maxWidth="1rem"
              onClick={() => handleEditQtyToIncinerate(index)}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default IncineratorTableRow;
