import mongoose from "mongoose";

const dbUri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

if (!dbUri || !dbName) {
  throw new Error(
    "DB_URI or DB_NAME is not defined in the environment variables"
  );
}

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri, {});
    console.log("Connected to the database");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
