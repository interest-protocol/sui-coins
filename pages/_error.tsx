import { NextPage } from 'next';

import { SEO, ThemeManager } from '@/components';
import Error from '@/views/error';

interface Props {
  statusCode: number | undefined;
}

const ErrorPage: NextPage<Props> = ({ statusCode }) => (
  <ThemeManager>
    <SEO pageTitle="Error" />
    <Error message={`Occurred an error (${statusCode})`} />
  </ThemeManager>
);

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
