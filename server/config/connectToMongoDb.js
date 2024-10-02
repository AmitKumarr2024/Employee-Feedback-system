import mongoose from "mongoose";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("MongoDb connected successfully");
  } catch (error) {
    console.log("Error Coneecting to Mongodb:",error);
    
  }
};
export default connectToMongoDb;
