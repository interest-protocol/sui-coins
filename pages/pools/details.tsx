import { NextPage } from 'next';

import { SEO } from '@/components';
import { withObjectIdGuard } from '@/components/hoc';
import { Routes, RoutesEnum } from '@/constants';
import { PoolPageProps } from '@/interface';
import PoolDetails from '@/views/pool-details';

const PoolDetailsPage: NextPage<PoolPageProps> = ({ objectId }) => (
  <>
    <SEO pageTitle="Pool Details" />
    <PoolDetails objectId={objectId} />
  </>
);

export default withObjectIdGuard(Routes[RoutesEnum.Pools])(PoolDetailsPage);
