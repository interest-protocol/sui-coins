import dbConnect from '@/server';
import QuestModel, { Quest } from '@/server/model/quest';
import { getExactDayTimestamp } from '@/utils';

export const addNewQuest = async (quest: Omit<Quest, 'timestamp'>) => {
  await dbConnect();

  const timestampNow = Date.now();
  const todayTimestamp = getExactDayTimestamp();

  const count = await QuestModel.countDocuments({
    $and: [
      {
        kind: quest.kind,
      },
      {
        address: quest.address,
      },
      {
        timestamp: { $gte: todayTimestamp },
      },
    ],
  });

  if (count >= 5) throw new Error(`You reached the limit today!`);

  const finalQuest = { ...quest, timestamp: timestampNow };

  const doc = await QuestModel.create(finalQuest);
  await doc.save();

  return finalQuest;
};
