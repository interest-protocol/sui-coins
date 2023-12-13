import {
  Box,
  Button,
  Tabs,
  TextField,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { PlusSVG, SearchSVG } from '@/svg';

import { PoolTabEnum } from './pools.types';
import PoolCard from './pools-card';

const Pools: FC = () => {
  const [tab, setTab] = useState<PoolTabEnum>(PoolTabEnum.Pools);

  return (
    <Layout>
      <Typography my="2xl" size="large" variant="display" textAlign="center">
        Pools
      </Typography>
      <Box
        p="3xl"
        borderRadius="l"
        bg="lowestContainer"
        mx={['m', 'm', 'm', 'm', '9xl']}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Tabs
            type="circle"
            onChangeTab={setTab}
            defaultTabIndex={tab}
            items={['Pools', 'My Position']}
          />
          <Box display="flex" gap="m" alignItems="center">
            <TextField
              placeholder="Search"
              Prefix={
                <SearchSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
              }
            />
            <Button
              bg="#00000014"
              variant="filled"
              color="onSurface"
              nHover={{ color: 'onPrimary' }}
              SuffixIcon={
                <Box as="span" display={['none', 'none', 'none', 'inline']}>
                  <PlusSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
                </Box>
              }
            >
              <Box as="span" display={['inline', 'inline', 'inline', 'none']}>
                <PlusSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
              </Box>
              <Box
                as="span"
                font="inherit"
                display={['none', 'none', 'none', 'inline']}
              >
                Create Pool
              </Box>
            </Button>
          </Box>
        </Box>
        <Box
          gap="m"
          mt="8xl"
          display="grid"
          gridTemplateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr']}
        >
          {Array.from({ length: 9 }, () => (
            <PoolCard key={v4()} />
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default Pools;
