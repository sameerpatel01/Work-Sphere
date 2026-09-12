import mongoose from "mongoose"; //just mongoose import!

//Database connection here!
// Cache connection promise across serverless function invocations
let cachedPromise = null;

const dbConnection = async () => {
  // If already connected (readyState 1 = connected)
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If connection is in progress, return the existing promise so requests wait together
  if (cachedPromise) {
    return cachedPromise;
  }

  const uri = process.env.DB_URL || process.env.MONGO_URI;

  if (!uri || uri.includes("<your_mongo_uri>")) {
    const errorMsg =
      "MongoDB URI is missing or undefined! Please set DB_URL in your Vercel Environment Variables.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  cachedPromise = mongoose
    .connect(uri, {
      dbName: process.env.DB_NAME || "Job_Portal",
      serverSelectionTimeoutMS: 8000,
    })
    .then((mongooseInstance) => {
      console.log("MongoDB Connected Successfully !");
      return mongooseInstance;
    })
    .catch((error) => {
      cachedPromise = null;
      console.error(
        `MongoDB Connection Error: ${error.message}. (If on Vercel, ensure 0.0.0.0/0 is added in MongoDB Atlas -> Network Access)`
      );
      throw error;
    });

  return cachedPromise;
};
export default dbConnection;
