import _Decimal from 'decimal.js-light';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import toFormat from 'toformat';

const Decimal = toFormat(_Decimal);

Decimal.format = {
  decimalSeparator: '.',
  groupSeparator: '',
};

export const numberToString = (x: number): string => new Decimal(x).toFormat();
