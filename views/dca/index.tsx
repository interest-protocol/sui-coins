import { Box, Button, TextField } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import Layout from '@/components/layout';
import { SwapSVG } from '@/svg';
import { updateURL } from '@/utils';

import { DCAForm } from './dca.types';
import Input from './dca-input';
import DCAManager from './dca-manager';
import DCAPeriodicityDropdown from './dca-periodicity-dropdown';
import DCAPreviewButton from './dca-preview-button';
import DCAPriceStrategy from './dca-price-strategy';
import DCASelectToken from './dca-select-token';

const DCA: FC = () => {
  const { pathname } = useRouter();
  const form = useFormContext<DCAForm>();

  const { getValues, setValue } = form;

  const flipToken = () => {
    const tmpTo = getValues('to');
    const tmpFrom = getValues('from');
    setValue('to', { ...tmpFrom, value: '' });
    setValue('from', { ...tmpTo, value: '' });

    updateURL(`${pathname}?from=${tmpTo.type}&to=${tmpFrom.type}`);
  };

  return (
    <Layout title="DCA">
      <Box
        mx="auto"
        display="flex"
        borderRadius="2xl"
        flexDirection="column"
        px={['2xs', 'xl', 'xl', '7xl']}
        width={['100%', '100%', '100%', '39.75rem']}
      >
        <Box
          py="xl"
          my="xs"
          px={['2xs', 'm']}
          borderRadius="xs"
          bg="lowestContainer"
        >
          <Input />
          <Box my="0.25rem" position="relative">
            <Box
              left="45%"
              borderRadius="s"
              border="7px solid"
              position="absolute"
              borderColor="surface"
            >
              <Button
                isIcon
                bg="onPrimary"
                color="primary"
                variant="tonal"
                onClick={flipToken}
              >
                <SwapSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          px="m"
          py="xl"
          gap="m"
          display="flex"
          borderRadius="xs"
          bg="lowestContainer"
          flexDirection="column"
        >
          <DCASelectToken />
          <Box px="l" display="flex" gap="l" alignItems="flex-end">
            <Box flex="1">
              <TextField
                label="Every"
                {...form.register('settings.intervals')}
                fieldProps={{
                  py: 'xl',
                  borderRadius: 'xs',
                  borderWidth: '1px',
                  nHover: {
                    borderWidth: '1px',
                  },
                  nFocus: {
                    borderWidth: '1px',
                  },
                }}
              />
            </Box>
            <DCAPeriodicityDropdown />
          </Box>
          <Box px="l">
            <Box>
              <TextField
                label="Over"
                Suffix="orders"
                color="onSurface"
                {...form.register('settings.iterations')}
                fieldProps={{
                  py: 'xl',
                  color: 'outline',
                  borderRadius: 'xs',
                  borderWidth: '1px',
                  nHover: {
                    borderWidth: '1px',
                  },
                  nFocus: {
                    borderWidth: '1px',
                  },
                }}
              />
            </Box>
          </Box>
          <DCAPriceStrategy />
          <DCAPreviewButton />
        </Box>
        <DCAManager />
      </Box>
    </Layout>
  );
};

export default DCA;
