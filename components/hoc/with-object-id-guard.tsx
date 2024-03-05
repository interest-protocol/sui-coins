import { curryN } from 'ramda';

import withParamsGuard from './with-params-guard';

const withObjectIdGuard = curryN(3, withParamsGuard)(['objectId']);

export default withObjectIdGuard;
