import { NextPage } from 'next';

import { SEO } from '@/components';
import Analytics from '@/views/analytics';

const AnalyticsPage: NextPage = () => (
  <>
    <SEO pageTitle="Analytics" />
    <Analytics />
  </>
);

export default AnalyticsPage;
