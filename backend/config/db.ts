import chalk from "chalk";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(chalk.green(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    if (error instanceof Error) {
      console.log(chalk.bold.red.underline(`Error: ${error.message}`));
      process.exit(1);
    }
  }
};

module.exports = connectDB;
