import { NextPage } from 'next';

import { SEO } from '@/components';
import DCAOrders from '@/views/dca-orders';
import { DCAOrdersManager } from '@/views/dca-orders/dca-orders-manager';

const DCAOrdersPage: NextPage = () => (
  <>
    <SEO pageTitle="DCA Orders" />
    <DCAOrdersManager />
    <DCAOrders />
  </>
);

export default DCAOrdersPage;
