import dbConnect from '@/server';
import QuestProfileModel from '@/server/model/quest-profile';

export const wipeQuestProfile = async () => {
  await dbConnect();

  return QuestProfileModel.deleteMany();
};
