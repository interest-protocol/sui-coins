import { FAUCET_COINS } from '@/constants';
import dbConnect from '@/server';
import { getExactDayTimestamp } from '@/utils';

import { findQuestProfile } from '.';

export const fillQuestProfile = async (address: string) => {
  await dbConnect();

  const todayTimestamp = getExactDayTimestamp();
  const questProfile = await findQuestProfile(address);

  questProfile.lastSwapAt = todayTimestamp;
  questProfile.lastAirdropAt = todayTimestamp;
  questProfile.lastCreatePoolAt = todayTimestamp;
  questProfile.lastCreateTokenAt = todayTimestamp;
  questProfile.lastAddLiquidityAt = todayTimestamp;
  questProfile.lastFaucetAt = FAUCET_COINS.reduce(
    (acc, { type }) => ({
      ...acc,
      [type]: todayTimestamp,
    }),
    {}
  );

  await questProfile.save();
};
