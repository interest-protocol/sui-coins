import Mongoose from 'mongoose';

export default await Mongoose.connect(process.env.MONGODB_URL!);
