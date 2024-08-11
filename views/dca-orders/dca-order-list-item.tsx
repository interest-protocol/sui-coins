import {
  Box,
  Button,
  Motion,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import { CaretRightSVG, ChevronDownSVG, SOLSVG, TrashSVG } from '@/svg';

import DCAOrderDetails from './dca-order-details';

const DCAOrderListItem: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box
        overflow="hidden"
        display={['none', 'none', 'none', 'block']}
        mt="-1rem"
      >
        <Box
          p="m"
          gap="2rem"
          zIndex="1"
          key={v4()}
          display="grid"
          borderRadius="xs"
          alignItems="center"
          position="relative"
          bg="lowestContainer"
          justifyItems="center"
          onClick={() => setIsOpen(not)}
          gridTemplateColumns="1.25rem 1fr 1fr 1fr 1fr 1fr 1fr"
        >
          <Motion
            style={{ originX: 0.5, originY: 0.5 }}
            initial={{ rotate: isOpen ? '0deg' : '90deg' }}
            animate={{ rotate: isOpen ? '90deg' : '0deg' }}
          >
            <CaretRightSVG
              maxWidth="1.25rem"
              maxHeight="1.25rem"
              width="100%"
            />
          </Motion>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            gap="xs"
          >
            <SOLSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
            <Typography variant="body" size="medium">
              SOL
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            gap="xs"
          >
            <SOLSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
            <Typography variant="body" size="medium">
              SOL
            </Typography>
          </Box>
          <Typography variant="body" size="large">
            3
          </Typography>
          <Typography variant="body" size="large">
            500 SOL
          </Typography>
          <Box
            px="l"
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Typography variant="body" size="medium">
              65%
            </Typography>
            <ProgressIndicator variant="bar" value={65} />
            <Box
              mt="s"
              px="l"
              border="1px solid"
              borderRadius="full"
              bg="primaryContainer"
              borderColor="primary"
            >
              Active
            </Box>
          </Box>
          <Box>
            <TrashSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
          </Box>
        </Box>
        <DCAOrderDetails isOpen={isOpen} />
      </Box>
      <Box
        mt="-1rem"
        overflow="hidden"
        display={['block', 'block', 'block', 'none']}
      >
        <Box
          py="xl"
          px="xs"
          gap="s"
          zIndex="1"
          key={v4()}
          display="flex"
          borderRadius="xs"
          position="relative"
          alignItems="stretch"
          bg="lowestContainer"
          flexDirection="column"
          onClick={() => setIsOpen(not)}
        >
          <Box
            p="m"
            display="grid"
            borderRadius="s"
            border="1px solid"
            alignItems="stretch"
            justifyItems="center"
            borderColor="outlineVariant"
            gridTemplateColumns="1fr 1fr 1fr"
          >
            <Box
              gap="m"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="label" size="large">
                Pay with
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                gap="xs"
              >
                <SOLSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
                <Typography variant="body" size="medium">
                  SOL
                </Typography>
              </Box>
            </Box>
            <Box
              gap="m"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="label" size="large">
                Get
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                gap="xs"
              >
                <SOLSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
                <Typography variant="body" size="medium">
                  SOL
                </Typography>
              </Box>
            </Box>
            <Box
              gap="m"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="label" size="large">
                Orders
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                gap="xs"
              >
                <Typography variant="body" size="medium">
                  3
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            p="m"
            display="grid"
            borderRadius="s"
            border="1px solid"
            alignItems="stretch"
            justifyItems="center"
            borderColor="outlineVariant"
            gridTemplateColumns="1fr 1fr 1fr"
          >
            <Box
              gap="m"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="label" size="large">
                Amount
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                gap="xs"
              >
                <Typography variant="body" size="medium">
                  50 SOL
                </Typography>
              </Box>
            </Box>
            <Box
              gap="m"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="label" size="large">
                Status
              </Typography>
              <Box
                px="l"
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <Typography variant="body" size="medium">
                  65%
                </Typography>
                <ProgressIndicator variant="bar" value={65} />
                <Box
                  mt="s"
                  px="l"
                  border="1px solid"
                  borderRadius="full"
                  bg="primaryContainer"
                  borderColor="primary"
                >
                  Active
                </Box>
              </Box>
            </Box>
            <Box
              gap="m"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="label" size="large">
                Actions
              </Typography>
              <Box>
                <TrashSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
              </Box>
            </Box>
          </Box>
          <Button
            gap="xl"
            variant="filled"
            justifyContent="center"
            SuffixIcon={
              <Motion
                width="1.25rem"
                height="1.25rem"
                style={{ originX: 0.5, originY: 0.5 }}
                initial={{ rotate: isOpen ? '0deg' : '180deg' }}
                animate={{ rotate: isOpen ? '180deg' : '0deg' }}
              >
                <ChevronDownSVG
                  width="100%"
                  maxWidth="1.25rem"
                  maxHeight="1.25rem"
                />
              </Motion>
            }
          >
            Expand
          </Button>
        </Box>
        <DCAOrderDetails isOpen={isOpen} />
      </Box>
    </>
  );
};

export default DCAOrderListItem;
