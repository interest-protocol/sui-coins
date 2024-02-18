import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import useCheckpoint from './checkpoint.hook';
import { CheckpointProps } from './checkpoint.types';

const Checkpoint: FC<CheckpointProps> = ({ withoutInfo }) => {
  const { content, ok, loading } = useCheckpoint();

  return (
    <Typography
      mt="s"
      gap="s"
      size="medium"
      display="flex"
      variant="label"
      color="onSurface"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        as="span"
        width="0.8rem"
        height="0.8rem"
        borderRadius="full"
        display="inline-block"
        bg={loading ? 'warning' : ok ? '#65A30D' : '#B91C1C'}
      />
      {!withoutInfo && content}
    </Typography>
  );
};

export default Checkpoint;
