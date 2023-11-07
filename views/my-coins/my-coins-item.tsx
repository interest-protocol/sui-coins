import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { not } from 'ramda';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import { EXPLORER_URL } from '@/constants';
import { FixedPointMath } from '@/lib';
import { ArrowTopRightSVG, CaretRightSVG, DefaultTokenSVG } from '@/svg';

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

  const goToExplorer = (objectId: string) =>
    window.open(`${EXPLORER_URL['sui:mainnet']}/object/${objectId}`);

  return (
    <Box
      py="m"
      px="l"
      display="grid"
      cursor="pointer"
      alignItems="center"
      rowGap={['xs', 'm']}
      borderTop="1px solid"
      fontSize={['xs', 's']}
      columnGap={['m', 'xl']}
      borderColor="outlineVariant"
      onClick={() => setIsOpen(not)}
      gridTemplateColumns={['1fr 1fr 1fr', '2rem 1fr 1fr 1fr']}
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
      <Box fontSize="s" display="flex" justifyContent={['center', 'unset']}>
        <Box
          px="s"
          gap="m"
          py="2xs"
          fontSize="xs"
          display="flex"
          fontFamily="Proto"
          borderRadius="full"
          onClick={() => owned && goToExplorer(owned)}
          bg={owned ? 'successContainer' : 'warningContainer'}
          color={owned ? 'onSuccessContainer' : 'onWarningContainer'}
        >
          {owned ? 'Owned' : 'Burned 🔥'}
          {owned && (
            <ArrowTopRightSVG
              width="100%"
              maxWidth="0.8rem"
              maxHeight="0.8rem"
            />
          )}
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
            gridColumn="span 3"
            fontSize={['xs', 's']}
            flexDirection="column"
          >
            {objects.map(({ coinObjectId, balance }) => (
              <Box
                key={v4()}
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Box
                  gap="xs"
                  display="flex"
                  alignItems="center"
                  onClick={() => goToExplorer(coinObjectId)}
                >
                  <Box>
                    {coinObjectId.slice(0, 6)}...{coinObjectId.slice(-4, -1)}
                  </Box>
                  <ArrowTopRightSVG
                    width="100%"
                    maxWidth="1rem"
                    maxHeight="1rem"
                  />
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
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default MyCoinsItem;
