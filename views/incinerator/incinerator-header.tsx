import { Box, TextField, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { SearchSVG } from '@/svg';

import { IncineratorForm } from './incinerator.types';
import IncineratorBurnScams from './incinerator-burn-scams';
import IncineratorRefresh from './incinerator-refresh';

const IncineratorHeader: FC = () => {
  const { register } = useFormContext<IncineratorForm>();

  return (
    <Box
      p="xl"
      gap="l"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexDirection={['column', 'column', 'column', 'row']}
    >
      <Typography variant="title" size="large" fontSize="5xl" fontWeight="700">
        Incinerator
      </Typography>
      <Box
        gap="xs"
        display="flex"
        justifyContent="center"
        width={['100%', 'unset']}
        flexDirection={['column', 'row']}
        alignItems={['stretch', 'center']}
      >
        <Box
          gap="xs"
          display="flex"
          alignItems="center"
          justifyContent="center"
          width={['100%', 'unset']}
        >
          <TextField
            fontSize="medium"
            placeholder="Search"
            {...register('search')}
            nPlaceholder={{ opacity: 0.7 }}
            fieldProps={{
              width: '100%',
              height: '2.5rem',
              borderRadius: 'full',
            }}
            Prefix={<SearchSVG maxWidth="1rem" maxHeight="1rem" width="100%" />}
          />
          <IncineratorRefresh />
        </Box>
        <IncineratorBurnScams />
      </Box>
    </Box>
  );
};

export default IncineratorHeader;
