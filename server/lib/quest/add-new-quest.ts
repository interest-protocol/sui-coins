import dbConnect from '@/server';
import QuestModel, { Quest } from '@/server/model/quest';
import { getExactDayTimestamp } from '@/utils';

export const addNewQuest = async (quest: Omit<Quest, 'timestamp'>) => {
  await dbConnect();

  const todayTimestamp = getExactDayTimestamp();

  const finalQuest = { ...quest, timestamp: todayTimestamp };

  const doc = await QuestModel.create(finalQuest);
  await doc.save();

  return finalQuest;
};
