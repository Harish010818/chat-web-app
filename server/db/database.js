import mongoose from "mongoose";

const connectDB = async () => {
      try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connnect successfully");

      } catch(err) {
        console.log(err);
    }
}

export default connectDB;