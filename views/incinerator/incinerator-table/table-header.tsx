import { Box, Checkbox, Typography } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { ObjectData } from '@/context/all-objects/all-objects.types';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { FilterArrowDownSVG } from '@/svg';
import { ZERO_BIG_NUMBER } from '@/utils';

import { TableHeaderData } from '../incinerator.data';
import { FilterTableEnum, IncineratorForm } from '../incinerator.types';

const IncineratorTableHeader: FC = () => {
  const [checked, setChecked] = useState(false);
  const { control } = useFormContext<IncineratorForm>();
  const filterSelected = useWatch({ control: control, name: 'filter' });
  const {
    coinsObjects,
    ownedNfts,
    otherObjects,
    coinsMap,
    isFetchingCoinBalances,
  } = useWeb3();

  const { fields, replace } = useFieldArray({
    control,
    name: 'objects',
  });

  const updateAssets = (state: boolean) => {
    replace(
      [
        ...(filterSelected == FilterTableEnum.NFT ||
        filterSelected == FilterTableEnum.All
          ? ownedNfts
          : []),
        ...(filterSelected == FilterTableEnum.Coin ||
        filterSelected == FilterTableEnum.All
          ? coinsObjects
          : []),
        ...(filterSelected == FilterTableEnum.Other ||
        filterSelected == FilterTableEnum.All
          ? otherObjects
          : []),
      ].map((coin: ObjectData, index) => {
        const balance = coinsMap[(coin.display as CoinObject)?.type]?.balance;
        const editable = balance && !balance.isZero();
        return {
          index,
          ...coin,
          value: `${FixedPointMath.toNumber(
            balance ?? ZERO_BIG_NUMBER,
            (coin.display as CoinObject)?.decimals ?? 0
          )}`,
          editable,
          isEditing: false,
          state,
          typing: false,
        };
      })
    );
  };

  useEffect(() => {
    if (!isFetchingCoinBalances) {
      !fields.length && updateAssets(checked);
    }
  }, [isFetchingCoinBalances]);

  useEffect(() => {
    updateAssets(checked);
  }, [filterSelected]);

  return (
    <Box as="thead" overflowX="auto">
      <Box as="tr">
        <Typography as="th" key={v4()} size="small" variant="label">
          <Checkbox
            defaultValue={checked}
            onClick={() => {
              updateAssets(!checked);
              setChecked(!checked);
            }}
            label=""
          />
        </Typography>
        {TableHeaderData.map((item, index) => (
          <Typography
            as="th"
            key={v4()}
            size="small"
            color="outline"
            variant="headline"
            textAlign="left"
            pr="xl"
            width={index == 1 ? '10%' : '40%'}
            cursor="pointer"
            minWidth="11rem"
          >
            <Box display="flex" alignItems="center" gap="xs">
              <Typography variant="headline" size="small" fontSize="12px">
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
