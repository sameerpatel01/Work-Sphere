import mongoose from "mongoose"; //just mongoose import!

//Database connection here!
const dbConnection = () => {
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

  mongoose
    .connect(uri, {
      dbName: process.env.DB_NAME || "Job_Portal",
    })
    .then(() => {
      console.log("MongoDB Connected Successfully !");
    })
    .catch((error) => {
      console.log(`Failed to connect ${error}`);
    });
};
export default dbConnection;
