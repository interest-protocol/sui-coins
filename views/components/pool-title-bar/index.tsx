import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/context/network';
import { ArrowLeftSVG } from '@/svg';
import { PoolForm as PoolFormType } from '@/views/pools/pools.types';

import { PoolTitleBarProps } from './pool-title-bar.types';

const PoolTitleBar: FC<PoolTitleBarProps> = ({ onBack, centerTile }) => {
  const network = useNetwork();
  const { control } = useFormContext<PoolFormType>();

  const tokens = useWatch({
    control: control,
    name: 'tokenList',
  });

  const name = tokens.reduce(
    (acc, token) => `${acc ? `${acc}•` : ''}${token?.symbol ?? ''}`,
    ''
  );

  return (
    <Box
      py="m"
      px="xl"
      mb="xs"
      gap="m"
      mx="auto"
      display="flex"
      flexWrap="wrap"
      maxWidth="65rem"
      borderRadius="xs"
      alignItems="center"
      bg="lowestContainer"
      mt={['5xl', '5xl', '5xl', 'xl']}
    >
      <Button
        isIcon
        mr="xs"
        variant="text"
        onClick={onBack}
        color="onSurface"
        nHover={{
          bg: 'surface',
        }}
      >
        <ArrowLeftSVG width="1.5rem" maxWidth="1.5rem" maxHeight="1.5rem" />
      </Button>
      <Typography
        size="large"
        color="onSurface"
        variant="headline"
        textAlign="center"
        ml={centerTile ? 'auto' : ''}
        fontSize={['xl', 'xl', '3xl', '5xl']}
      >
        {name}
      </Typography>
      {tokens && (
        <Box
          gap="s"
          ml="auto"
          alignItems="center"
          display={['none', 'none', 'flex', 'flex']}
        >
          {tokens.map(({ type, symbol }) => (
            <TokenIcon
              withBg
              key={v4()}
              type={type}
              symbol={symbol}
              network={network}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PoolTitleBar;
