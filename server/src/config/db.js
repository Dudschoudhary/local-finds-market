const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/local-finds-db';
  try {
    await mongoose.connect(uri, {
      // useNewUrlParser and useUnifiedTopology are defaults in mongoose 7+
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
