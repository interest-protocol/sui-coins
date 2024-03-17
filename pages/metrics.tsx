import { NextPage } from 'next';

import { SEO } from '@/components';
import Metrics from '@/views/metrics';

const MetricsPage: NextPage = () => (
  <>
    <SEO pageTitle="Metrics" />
    <Metrics />
  </>
);

export default MetricsPage;
