import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ooktb57_db_user:90040331@cluster0.m23cvjk.mongodb.net",
    );
    console.log("DB is connected");
  } catch (err) {
    console.log(err);
  }
};

connectDB();
export default connectDB;
