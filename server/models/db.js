const mongoose = require('mongoose');

// Use the MONGO_URL from environment variables
const mongoUrl = process.env.MONGO_URL;
console.log('🔍 Connecting to MongoDB:', mongoUrl ? 'URL SET' : 'URL NOT SET');

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    console.log('🔍 Database name:', mongoose.connection.db.databaseName);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    console.error('❌ Error details:', err.message);
  });

// Add connection event listeners
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error event:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});