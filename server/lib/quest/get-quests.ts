import dbConnect from '@/server';
import QuestModel, { Quest } from '@/server/model/quest';

export const getQuests = async (address: string, kind: Quest['kind']) => {
  await dbConnect();

  const logs = await QuestModel.find(
    {
      address,
      kind,
    },
    { limit: 100 }
  ).sort({ timestamp: 'desc' });

  return logs;
};
