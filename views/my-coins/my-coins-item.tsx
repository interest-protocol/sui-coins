import { Box } from '@interest-protocol/ui-kit';
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
  owned,
  symbol,
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
      rowGap={['xs', 'm']}
      display="grid"
      cursor="pointer"
      alignItems="center"
      fontSize={['xs', 's']}
      columnGap={['m', 'xl']}
      onClick={() => setIsOpen(not)}
      gridTemplateColumns={['1fr 1fr 1fr 2rem', '2rem 1fr 1fr 1fr 2rem']}
    >
      <Box
        alignItems="center"
        justifyContent="center"
        display={['none', 'flex']}
        transform={isOpen ? 'rotate(90deg)' : 'rotate(0deg)'}
      >
        <CaretRightSVG maxHeight="1.3rem" maxWidth="1.3rem" width="100%" />
      </Box>
      <Box display="flex" alignItems="center" gap="s">
        {iconUrl ? (
          <Box width={['1.2rem', '2rem']} height={['1.2rem', '2rem']}>
            <img height="100%" width="100%" src={iconUrl} alt={name} />
          </Box>
        ) : (
          <Box width={['1.2rem', '2rem']} height={['1.2rem', '2rem']}>
            <DefaultTokenSVG maxHeight="100%" maxWidth="100%" width="100%" />
          </Box>
        )}
        <Box>{symbol}</Box>
      </Box>
      <Box fontSize="s" textAlign={['center', 'unset']}>
        {FixedPointMath.from(BigNumber(balance)).toNumber(decimals)}
      </Box>
      <Box
        fontSize="s"
        display="flex"
        gridColumn="span 2"
        justifyContent={['center', 'unset']}
      >
        <Box
          px="s"
          py="2xs"
          fontSize="xs"
          fontFamily="Proto"
          borderRadius="full"
          bg={owned ? 'successContainer' : 'warningContainer'}
          color={owned ? 'onSuccessContainer' : 'onWarningContainer'}
        >
          {owned ? 'Owned' : 'Not owned'}
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
            fontSize={['xs', 's']}
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
                  <Box>
                    {coinObjectId.slice(0, 6)}...{coinObjectId.slice(-4, -1)}
                  </Box>
                  <Box onClick={() => copyToClipboard(coinObjectId)}>
                    <ClipboardSVG
                      maxHeight="1rem"
                      maxWidth="1rem"
                      width="100%"
                    />
                  </Box>
                </Box>
                <Box textAlign={['center', 'unset']}>
                  {FixedPointMath.from(BigNumber(balance)).toNumber(decimals)}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent={['center', 'unset']}
                >
                  <Box
                    mx="2xl"
                    as="span"
                    display="block"
                    width="0.25rem"
                    height="0.25rem"
                    borderRadius="full"
                    bg={owned ? 'success' : 'warning'}
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
