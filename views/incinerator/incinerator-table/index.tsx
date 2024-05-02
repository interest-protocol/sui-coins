import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { IncineratorNoAssetsSVG } from '@/svg';

import { IncineratorForm } from '../incinerator.types';
import IncineratorTableBody from './table-body';
import IncineratorTableHeader from './table-header';

const IncineratorTable: FC = () => {
  const { control } = useFormContext<IncineratorForm>();
  const fields = useWatch({ control, name: `objects` });
  return (
    <Box mb="l" display="grid" gap="l" width="100%">
      <Box>
        <Motion
          mt="l"
          rowGap="l"
          borderCollapse="separate"
          borderSpacing="0 0.5rem"
        >
          <IncineratorTableHeader />
          {fields?.length ? (
            <IncineratorTableBody />
          ) : (
            <Box
              gap="s"
              width={['20rem', '20rem', '20rem', '51.188rem']}
              display="flex"
              height="29.188rem"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box p="m">
                <IncineratorNoAssetsSVG
                  maxHeight="7.375rem"
                  maxWidth="6.625rem"
                  width="100%"
                />
              </Box>
              <Typography variant="label" size="medium">
                You don’t have any assets
              </Typography>
            </Box>
          )}
        </Motion>
      </Box>
    </Box>
  );
};
export default IncineratorTable;
