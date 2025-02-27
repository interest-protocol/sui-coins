import BigNumber from 'bignumber.js';

import { BigNumberish } from '@/interface';
import {
  isBigNumberish,
  parseToPositiveStringNumber,
  ZERO_BIG_NUMBER,
} from '@/utils';

import { Fraction } from './fraction';

const ONE_COIN = new BigNumber(1000000000);

const parse = (_value: BigNumberish) => {
  const value = isBigNumberish(_value) ? _value.toString() : 0;
  return new BigNumber(value);
};

export class FixedPointMath {
  private _value = ZERO_BIG_NUMBER;

  protected constructor(_value: BigNumberish) {
    this._value = parse(_value);
  }

  private parseValue(x: BigNumberish | FixedPointMath): BigNumber {
    if (x instanceof FixedPointMath) return x.value();

    return parse(x);
  }

  private isZero(value: BigNumberish | FixedPointMath): boolean {
    if (value instanceof BigNumber) return value.isZero();
    if (value === 0) return true;
    if (value instanceof FixedPointMath) return value.value().isZero();
    return value === '0';
  }

  public static from(value: BigNumberish): FixedPointMath {
    return new FixedPointMath(value);
  }

  public static toBigNumber(
    value: number | string,
    decimals = 9,
    significant = 6
  ): BigNumber {
    const safeValue =
      typeof value === 'number' && value > Number.MAX_SAFE_INTEGER
        ? Number.MAX_SAFE_INTEGER
        : value;

    if (safeValue == null || isNaN(+safeValue)) return ZERO_BIG_NUMBER;

    const factor = BigNumber(10).pow(significant);

    const bnValue = BigNumber(safeValue).times(factor);

    if (
      (typeof safeValue === 'number' && ZERO_BIG_NUMBER.gt(bnValue)) ||
      (typeof safeValue === 'string' &&
        ZERO_BIG_NUMBER.gt(
          BigNumber(parseToPositiveStringNumber(safeValue)).times(factor)
        ))
    )
      return ZERO_BIG_NUMBER;

    return bnValue.times(BigNumber(10).pow(decimals - significant));
  }

  public static toNumber(
    value: BigNumber,
    decimals = 9,
    significant = 18
  ): number {
    if (value?.isZero()) return 0;

    const result = +Fraction.from(
      value,
      new BigNumber(10).pow(decimals)
    ).toSignificant(significant, { groupSeparator: '' });

    return !decimals ? Math.floor(result) : result;
  }

  public toNumber(decimals = 9, significant = 6): number {
    return FixedPointMath.toNumber(this._value, decimals, significant);
  }

  public div(x: BigNumberish | FixedPointMath): FixedPointMath {
    if (this.isZero(x)) return FixedPointMath.from(0);
    return new FixedPointMath(
      this._value.multipliedBy(ONE_COIN).div(this.parseValue(x))
    );
  }

  public mul(x: BigNumberish | FixedPointMath): FixedPointMath {
    return new FixedPointMath(
      this._value
        .multipliedBy(this.parseValue(this.parseValue(x)))
        .div(ONE_COIN)
    );
  }

  public add(x: BigNumberish | FixedPointMath): FixedPointMath {
    return new FixedPointMath(this._value.plus(this.parseValue(x)));
  }

  public sub(x: BigNumberish | FixedPointMath): FixedPointMath {
    return new FixedPointMath(this._value.minus(this.parseValue(x)));
  }

  public pow(x: BigNumberish | FixedPointMath): FixedPointMath {
    return new FixedPointMath(this._value.pow(this.parseValue(x)));
  }

  public toPercentage(toSignificant = 2): string {
    const fraction = Fraction.from(this._value, ONE_COIN.multipliedBy(100));

    return `${fraction.toSignificant(toSignificant || 1)} %`;
  }

  public gt(x: BigNumberish | FixedPointMath): boolean {
    return this._value.gt(this.parseValue(x));
  }

  public gte(x: BigNumberish | FixedPointMath): boolean {
    return this._value.gte(this.parseValue(x));
  }
  public lt(x: BigNumberish | FixedPointMath): boolean {
    return this._value.lt(this.parseValue(x));
  }
  public lte(x: BigNumberish | FixedPointMath): boolean {
    return this._value.lte(this.parseValue(x));
  }

  public eq(x: BigNumberish | FixedPointMath): boolean {
    return this._value.eq(this.parseValue(x));
  }

  public value(): BigNumber {
    return this._value;
  }
}
