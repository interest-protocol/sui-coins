import { NextPage } from 'next';

import { SEO } from '@/components';
import { withObjectIdGuard } from '@/components/hoc';
import { Routes, RoutesEnum } from '@/constants';
import PoolDetails from '@/views/pool-details';

interface Props {
  objectId: string;
}

const PoolDetailsPage: NextPage<Props> = ({ objectId }) => (
  <>
    <SEO pageTitle="Pool Details" />
    <PoolDetails objectId={objectId} />
  </>
);

export default withObjectIdGuard(Routes[RoutesEnum.Pools])(PoolDetailsPage);
