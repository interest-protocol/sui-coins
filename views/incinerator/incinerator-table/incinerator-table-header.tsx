import { Box, Checkbox, Typography } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import {
  CoinObjectData,
  ObjectData,
} from '@/context/all-objects/all-objects.types';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { FilterArrowDownSVG } from '@/svg';

import { TableHeaderData } from '../incinerator.data';
import {
  IncineratorForm,
  IncineratorTabEnum,
  ObjectField,
} from '../incinerator.types';

const IncineratorTableHeader: FC = () => {
  const [checked, setChecked] = useState(false);
  const { control, setValue } = useFormContext<IncineratorForm>();
  const tab = useWatch({ control: control, name: 'tab' });
  const {
    objects,
    coinsMap,
    ownedNfts,
    otherObjects,
    coinsObjects,
    isFetchingCoinBalances,
  } = useWeb3();

  const formObjects = useWatch({
    control,
    name: 'objects',
  });

  const displayObjects = {
    [IncineratorTabEnum.All]: objects,
    [IncineratorTabEnum.Coin]: coinsObjects,
    [IncineratorTabEnum.NFT]: ownedNfts,
    [IncineratorTabEnum.Other]: otherObjects,
  };

  const updateAssets = (active: boolean) => {
    setValue(
      'objects',
      displayObjects[tab].map((object: ObjectData, index) => {
        const coin = coinsMap[(object.display as CoinObject)?.type];
        const editable = coin && coin.balance && !coin.balance.isZero();

        return {
          index,
          ...object,
          value: coin
            ? `${FixedPointMath.toNumber(coin.balance, coin.decimals)}`
            : '1',
          editable,
          isEditing: false,
          active,
        };
      })
    );
  };

  const updateBalances = () => {
    setValue(
      'objects',
      formObjects.map((object: ObjectField): ObjectField => {
        if (!object.display) return object;

        if (!object.display.balance) return object;

        const coin = coinsMap[(object.display as CoinObject).type];

        return {
          ...object,
          display: {
            ...object.display,
            balance: coin.balance,
          } as CoinObjectData['display'],
          ...(!object.isEditing && {
            value: coin.balance.lt(
              FixedPointMath.toBigNumber(object.value, coin.decimals)
            )
              ? String(FixedPointMath.toNumber(coin.balance, coin.decimals))
              : object.value,
          }),
        };
      })
    );
  };

  useEffect(() => {
    if (!isFetchingCoinBalances && !formObjects.length) updateAssets(checked);
  }, [isFetchingCoinBalances]);

  useEffect(() => {
    if (!formObjects.length) {
      updateAssets(checked);
      return;
    }

    updateBalances();
  }, [coinsMap]);

  useEffect(() => {
    updateAssets(checked);
  }, [tab]);

  return (
    <Box as="thead">
      <Box as="tr">
        <Typography as="th" size="small" variant="label">
          <Checkbox
            label=""
            defaultValue={checked}
            onClick={() => {
              updateAssets(!checked);
              setChecked(!checked);
            }}
          />
        </Typography>
        {TableHeaderData.map((item) => (
          <Typography
            as="th"
            pr="xl"
            key={v4()}
            size="small"
            color="outline"
            cursor="pointer"
            textAlign="left"
            variant="headline"
          >
            <Box display="flex" alignItems="center" gap="xs">
              <Typography
                variant="headline"
                size="small"
                fontSize="xs"
                width="max-content"
              >
                {item}
              </Typography>
              <Box width="0.5rem" height="0.5rem" display="flex" color="black">
                <FilterArrowDownSVG
                  maxHeight="100%"
                  maxWidth="100%"
                  width="100%"
                />
              </Box>
            </Box>
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default IncineratorTableHeader;
