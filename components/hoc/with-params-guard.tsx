import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';

import Error from '@/views/error';
import Loading from '@/views/loading';

type TWithParamsGuard = (
  paramsKeys: ReadonlyArray<string>,
  errorRedirectLink: string,
  Component: NextPage<any>
) => FC;

const withParamsGuard: TWithParamsGuard =
  // eslint-disable-next-line react/display-name
  (paramsKeys, errorRedirectLink, Component) => () => {
    const { query, asPath, isReady } = useRouter();

    const queryParams = new URLSearchParams(asPath);

    const params = useMemo(
      () =>
        paramsKeys.map(
          (paramKey) => query[paramKey] || queryParams.get(paramKey) || ''
        ),
      [isReady]
    );

    if (!isReady) return <Loading />;

    if (!params.every((param) => !!param))
      return <Error message="Wrong params" linkGoTo={errorRedirectLink} />;

    return (
      <Component
        {...paramsKeys.reduce(
          (acc, key, index) => ({ ...acc, [key]: params[index] }),
          {}
        )}
      />
    );
  };

export default withParamsGuard;
