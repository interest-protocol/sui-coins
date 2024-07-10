import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import DCAFlipToken from './dca-flip-token';
import Input from './input';
import Slider from './input/slider';
import PreviewDCAButton from './preview-dca-button';

const DCA: FC = () => (
  <Layout>
    <Box
      mx="auto"
      mt="3.5rem"
      display="flex"
      borderRadius="l"
      flexDirection="column"
      px={['2xs', 'xl', 'xl', '7xl']}
      width={['100%', '100%', '100%', '39.75rem']}
    >
      <Box bg="lowestContainer" borderRadius="s" p="xl">
        <Typography
          size="large"
          fontWeight="700"
          variant="headline"
          fontFamily="Satoshi"
        >
          Trade DCA
        </Typography>
        <Box display="flex" flexDirection="column" gap="5xl">
          <Input
            label="from"
            slider={
              <Box px="s">
                <Slider />
              </Box>
            }
          />
        </Box>
        <Box
          display="flex"
          position="relative"
          alignContent="center"
          justifyContent="center"
        >
          <Box width="100%" height="0.313rem" bg="lowContainer" />
          <Box
            gap="s"
            my="-1.5rem"
            width="100%"
            display="flex"
            position="absolute"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              display="flex"
              width="3.25rem"
              height="3.25rem"
              borderRadius="full"
              border="5px solid"
              alignItems="center"
              borderColor="lowContainer"
              justifyContent="center"
            >
              <DCAFlipToken />
            </Box>
          </Box>
        </Box>
        <Box pt="xl" borderRadius="xs" bg="lowestContainer" mt="m">
          <Input label="to" />
        </Box>
        <PreviewDCAButton />
      </Box>
      <Box my="xs" bg="lowestContainer" borderRadius="xs"></Box>
    </Box>
  </Layout>
);

export default DCA;
