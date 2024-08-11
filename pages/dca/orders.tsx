import { NextPage } from 'next';

import { SEO } from '@/components';
import DCAOrders from '@/views/dca-orders';

const DCAOrdersPage: NextPage = () => (
  <>
    <SEO pageTitle="DCA Orders" />
    <DCAOrders />
  </>
);

export default DCAOrdersPage;
