import { NextPage } from 'next';

import { SEO } from '@/components';
import ErrorPage from '@/views/error';

const NotFoundPage: NextPage = () => (
  <>
    <SEO pageTitle="Not Found" />
    <ErrorPage />
  </>
);

export default NotFoundPage;
