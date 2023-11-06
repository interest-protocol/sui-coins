import { Box } from '@interest-protocol/ui-kit';
import { formatAddress } from '@mysten/sui.js';
import BigNumber from 'bignumber.js';
import { not } from 'ramda';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';

import { FixedPointMath } from '@/lib';
import {
  ArrowTopRightSVG,
  CaretRightSVG,
  ClipboardSVG,
  DefaultTokenSVG,
} from '@/svg';

import { TCoinWithMetadata } from './my-coins.types';

const MyCoinsItem: FC<TCoinWithMetadata> = ({
  name,
  iconUrl,
  balance,
  objects,
  decimals,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const copyToClipboard = (coinObjectId: string) => {
    window.navigator.clipboard.writeText(coinObjectId);
    toast.success('Copied to clipboard');
  };

  return (
    <Box
      py="m"
      px="l"
      rowGap="m"
      columnGap="xl"
      display="grid"
      cursor="pointer"
      alignItems="center"
      onClick={() => setIsOpen(not)}
      gridTemplateColumns="2rem 1fr 1fr 1fr 2rem"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        transform={isOpen ? 'rotate(90deg)' : 'rotate(0deg)'}
      >
        <CaretRightSVG maxHeight="1.3rem" maxWidth="1.3rem" width="100%" />
      </Box>
      <Box display="flex" alignItems="center" gap="s">
        {iconUrl ? (
          <Box width="2rem" height="2rem">
            <img height="100%" width="100%" src={iconUrl} alt={name} />
          </Box>
        ) : (
          <DefaultTokenSVG maxHeight="2rem" maxWidth="2rem" width="100%" />
        )}
        <Box>{name}</Box>
      </Box>
      <Box fontSize="s">
        {FixedPointMath.from(BigNumber(balance)).toNumber(decimals)}
      </Box>
      <Box fontSize="s" display="flex" gridColumn="span 2">
        <Box
          px="s"
          py="2xs"
          fontSize="xs"
          fontFamily="Proto"
          borderRadius="full"
          bg="successContainer"
          color="onSuccessContainer"
        >
          Owned
        </Box>
      </Box>
      {isOpen && (
        <>
          <Box />
          <Box
            px="l"
            py="s"
            gap="m"
            bg="surface"
            display="flex"
            borderRadius="xs"
            gridColumn="span 4"
            flexDirection="column"
          >
            {objects.map(({ coinObjectId, balance }) => (
              <Box
                key={v4()}
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr 2rem"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Box display="flex" gap="xs" alignItems="center">
                  <Box>{formatAddress(coinObjectId)}</Box>
                  <Box onClick={() => copyToClipboard(coinObjectId)}>
                    <ClipboardSVG
                      maxHeight="1rem"
                      maxWidth="1rem"
                      width="100%"
                    />
                  </Box>
                </Box>
                <Box>
                  {FixedPointMath.from(BigNumber(balance)).toNumber(decimals)}
                </Box>
                <Box display="flex" alignItems="center">
                  <Box
                    mx="2xl"
                    as="span"
                    bg="success"
                    display="block"
                    width="0.25rem"
                    height="0.25rem"
                    borderRadius="full"
                  />
                </Box>
                <Box>
                  <ArrowTopRightSVG
                    maxWidth="1rem"
                    maxHeight="1rem"
                    width="100%"
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default MyCoinsItem;
