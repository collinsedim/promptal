import mongoose from "mongoose";

let isConnected = false;

export const connectTODB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Connection to MongoDB Succeeded!");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ppal_db",
      useNewUrlParser: true,
      useUnifiedTOpology: true,
    });
    isConnected = true;

    console.log("MongoDB now active");
  } catch (error) {
    console.log(error);
  }
};
