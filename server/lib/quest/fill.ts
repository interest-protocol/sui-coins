import { Network } from '@/constants';
import dbConnect from '@/server';
import quest from '@/server/model/quest';
import { getExactDayTimestamp, getFirstWeekDayTimestamp } from '@/utils';

import { findMetrics, findQuestProfile } from '.';

export const fillQuestProfile = async (address: string) => {
  await dbConnect();

  const todayTimestamp = getExactDayTimestamp();
  const questProfile = await findQuestProfile(address);

  questProfile.lastSwapAt = todayTimestamp;
  questProfile.lastFaucetAt = todayTimestamp;
  questProfile.lastAirdropAt = todayTimestamp;
  questProfile.lastCreatePoolAt = todayTimestamp;
  questProfile.lastCreateTokenAt = todayTimestamp;
  questProfile.lastAddLiquidityAt = todayTimestamp;

  await questProfile.save();
};

export const fillMetrics = async (network: Network) => {
  await dbConnect();

  const metric = await findMetrics(network);
  if (!metric.weeklyTXs) metric.weeklyTXs = {};
  if (!metric.weeklyUsers) metric.weeklyUsers = {};

  const max = Math.floor((await quest.countDocuments()) / 1000);

  for (let i = 0; i < max; i++) {
    const quests = await quest
      .find()
      .limit(1000)
      .skip(i * 1000)
      .lean();

    quests.forEach(({ timestamp, address }) => {
      const firstWeekDay = getFirstWeekDayTimestamp(timestamp);

      metric.weeklyTXs[firstWeekDay] =
        (metric.weeklyTXs[firstWeekDay] ?? 0) + 1;

      if (!metric.weeklyUsers[firstWeekDay]?.includes(address))
        metric.weeklyUsers[firstWeekDay] = [
          ...(metric.weeklyUsers[firstWeekDay] ?? []),
          address,
        ];
    });
  }

  await metric.save();
};
