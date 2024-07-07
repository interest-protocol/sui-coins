import { DAY_IN_MS } from '@/constants';
import dbConnect from '@/server';
import QuestModel, { Quest } from '@/server/model/quest';
import { getExactDayTimestamp } from '@/utils';

export const getQuestsFromLast20Days = async (
  address: string,
  kind: Quest['kind']
) => {
  await dbConnect();

  const todayInMS = getExactDayTimestamp();

  return Promise.all(
    Array.from({ length: 20 }, (_, index) =>
      QuestModel.find({
        kind,
        address,
        timestamp: todayInMS - DAY_IN_MS * index,
      }).lean()
    )
  );
};
