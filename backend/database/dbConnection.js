import mongoose from "mongoose"; //just mongoose import!

//Database connection here!
const dbConnection = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const uri = process.env.DB_URL || process.env.MONGO_URI;

  if (!uri || uri.includes("<your_mongo_uri>")) {
    console.log(
      "Failed to connect: MongoDB URI is missing or using placeholder! Please set DB_URL (or MONGO_URI) in your backend/.env file."
    );
    return;
  }

  try {
    await mongoose.connect(uri, {
      dbName: process.env.DB_NAME || "Job_Portal",
      serverSelectionTimeoutMS: 8000,
    });
    console.log("MongoDB Connected Successfully !");
  } catch (error) {
    console.log(`Failed to connect ${error}`);
    throw error;
  }
};
export default dbConnection;
