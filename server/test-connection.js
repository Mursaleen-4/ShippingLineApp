require('dotenv').config();
const mongoose = require('mongoose');

console.log('DEBUG MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Mongoose connected!');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Mongoose connection failed:', err);
  });
