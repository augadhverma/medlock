const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Replace the URI with your MongoDB Atlas connection string
    MONGO = process.env.MONGO_URI || "";
    const conn = await mongoose.connect(MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
