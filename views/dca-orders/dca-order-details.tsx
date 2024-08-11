import { Box, Chart, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { formatDollars } from '@/utils';

const DCAOrderDetails: FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <Motion
    p="3xl"
    gap="3xl"
    mt="-1rem"
    key={v4()}
    display="grid"
    bg="highContainer"
    overflowY="hidden"
    style={{ originY: 0 }}
    gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 2fr 2fr']}
    initial={{
      scaleY: isOpen ? 0 : 1,
      height: isOpen ? 0 : 'auto',
    }}
    animate={{
      scaleY: isOpen ? 1 : 0,
      height: isOpen ? 'auto' : 0,
    }}
  >
    <Box
      p="l"
      gap="l"
      display="flex"
      borderRadius="s"
      bg="lowestContainer"
      flexDirection="column"
    >
      <Typography variant="label" size="large">
        Order details
      </Typography>
      <Box display="flex" flexDirection="column" gap="s">
        <Typography variant="body" size="medium">
          <b>Min Price:</b> {formatDollars(28)}
        </Typography>
        <Typography variant="body" size="medium">
          <b>Max Price:</b> {formatDollars(28)}
        </Typography>
        <Typography variant="body" size="medium">
          <b>Average Price:</b> {formatDollars(28)}
        </Typography>
        <Typography variant="body" size="medium">
          <b>Frequency:</b> 1 hour
        </Typography>
        <Typography variant="body" size="medium">
          <b>Number of orders:</b> 7
        </Typography>
      </Box>
    </Box>
    <Box
      p="l"
      gap="l"
      display="flex"
      borderRadius="s"
      bg="lowestContainer"
      flexDirection="column"
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="label" size="large">
          Execution history
        </Typography>
        <Typography variant="body" size="small">
          Next: 14:15
        </Typography>
      </Box>
      <Box display="grid" gridTemplateColumns="2fr 2fr 1fr">
        <Typography variant="label" size="medium">
          Date
        </Typography>
        <Typography variant="label" size="medium">
          Amount
        </Typography>
        <Typography variant="label" size="medium">
          Price
        </Typography>
      </Box>
      <Box
        gap="s"
        display="grid"
        overflowY="auto"
        gridTemplateColumns="2fr 2fr 1fr"
      >
        <Typography variant="body" size="medium">
          13:25
        </Typography>
        <Typography variant="body" size="medium">
          50 SOL
        </Typography>
        <Typography variant="body" size="medium">
          {formatDollars(30)}
        </Typography>
        <Typography variant="body" size="medium">
          13:25
        </Typography>
        <Typography variant="body" size="medium">
          50 SOL
        </Typography>
        <Typography variant="body" size="medium">
          {formatDollars(30)}
        </Typography>
        <Typography variant="body" size="medium">
          13:25
        </Typography>
        <Typography variant="body" size="medium">
          50 SOL
        </Typography>
        <Typography variant="body" size="medium">
          {formatDollars(30)}
        </Typography>
        <Typography variant="body" size="medium">
          13:25
        </Typography>
        <Typography variant="body" size="medium">
          50 SOL
        </Typography>
        <Typography variant="body" size="medium">
          {formatDollars(30)}
        </Typography>
        <Typography variant="body" size="medium">
          13:25
        </Typography>
        <Typography variant="body" size="medium">
          50 SOL
        </Typography>
        <Typography variant="body" size="medium">
          {formatDollars(30)}
        </Typography>
      </Box>
    </Box>
    <Box
      p="l"
      gap="l"
      display="flex"
      borderRadius="s"
      bg="lowestContainer"
      flexDirection="column"
    >
      <Box>
        <Typography variant="label" size="large">
          PERFORMANCE OVERVIEW
        </Typography>
        <Typography variant="body" size="small" color="outline">
          Click on the graph to see orders details
        </Typography>
      </Box>

      <Chart
        variant="area"
        data={[
          {
            amount: 30,
            day: '13:25',
            description: 'Date/Time: 13:25',
          },
          {
            amount: 32,
            day: '13:35',
            description: 'Date/Time: 13:35',
          },
          {
            amount: 31,
            day: '13:45',
            description: 'Date/Time: 13:45',
          },
          {
            amount: 31,
            day: '13:55',
            description: 'Date/Time: 13:55',
          },
          {
            amount: 50,
            day: '14:05',
            description: 'Date/Time: 14:05',
          },
        ]}
      />
      <Typography variant="body" size="small">
        Number of orders: 7
      </Typography>
    </Box>
  </Motion>
);

export default DCAOrderDetails;
