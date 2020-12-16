import mongoose from 'mongoose';
import colors from 'colors';

const URL =
  'mongodb+srv://shop:shop123@cluster0.xgedc.mongodb.net/proshop?retryWrites=true&w=majority';
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
