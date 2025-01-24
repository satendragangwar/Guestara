const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connected to DB successfully!");
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    process.exit(1); 
  }
};

module.exports = connect;
