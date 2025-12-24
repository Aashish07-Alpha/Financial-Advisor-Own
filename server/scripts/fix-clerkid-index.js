const mongoose = require('mongoose');
require('dotenv').config();

async function fixClerkIdIndex() {
  try {
    console.log('🔍 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('users');

    // List all indexes to see what exists
    console.log('🔍 Checking existing indexes...');
    const indexes = await collection.indexes();
    console.log('Current indexes:', indexes);

    // Check if clerkId index exists
    const clerkIdIndex = indexes.find(index => 
      index.key && index.key.clerkId === 1
    );

    if (clerkIdIndex) {
      console.log('🔍 Found clerkId index, removing it...');
      await collection.dropIndex('clerkId_1');
      console.log('✅ Successfully removed clerkId index');
    } else {
      console.log('ℹ️ No clerkId index found');
    }

    // Also check for any documents with clerkId field and remove it
    console.log('🔍 Checking for documents with clerkId field...');
    const usersWithClerkId = await collection.find({ clerkId: { $exists: true } }).toArray();
    
    if (usersWithClerkId.length > 0) {
      console.log(`🔍 Found ${usersWithClerkId.length} users with clerkId field, removing it...`);
      await collection.updateMany(
        { clerkId: { $exists: true } },
        { $unset: { clerkId: "" } }
      );
      console.log('✅ Successfully removed clerkId field from all users');
    } else {
      console.log('ℹ️ No users with clerkId field found');
    }

    // List indexes again to confirm
    console.log('🔍 Final index list:');
    const finalIndexes = await collection.indexes();
    console.log(finalIndexes);

    console.log('✅ Database cleanup completed successfully!');
  } catch (error) {
    console.error('❌ Error during database cleanup:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the script
fixClerkIdIndex();
