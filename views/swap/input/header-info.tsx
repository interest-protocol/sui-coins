import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { HeaderInfoProps } from './input.types';

const HeaderInfo: FC<HeaderInfoProps> = ({ label, balance, setValue }) => (
  <Box px="l" display="flex" justifyContent="space-between">
    <Typography variant="label" size="small">
      {label}
    </Typography>
    {label === 'from' && (
      <Box display="flex" gap="xs">
        {Array.from({ length: 4 }, (_, index) => {
          const value = (index + 1) * 25;

          return (
            <Button
              px="xs"
              py="2xs"
              key={v4()}
              fontSize="xs"
              variant="outline"
              borderColor="outlineVariant"
              onClick={() =>
                setValue(
                  `${label}.value`,
                  String((value / 100) * Number(balance))
                )
              }
            >
              {value < 100 ? `${value}%` : 'max'}
            </Button>
          );
        })}
      </Box>
    )}
  </Box>
);

export default HeaderInfo;
