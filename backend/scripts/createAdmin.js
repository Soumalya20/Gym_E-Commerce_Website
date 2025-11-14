const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const email = process.argv[2] || 'admin@koushikssupplements.com';
    const password = process.argv[3] || 'Admin@123';

    let admin = await User.findOne({ email });

    if (admin) {
      admin.role = 'admin';
      await admin.save();
      console.log(`✅ Updated existing user to admin: ${email}`);
    } else {
      admin = await User.create({
        name: 'Admin User',
        email,
        password,
        role: 'admin',
      });
      console.log(`✅ Created new admin user: ${email}`);
    }

    console.log(`Admin ID: ${admin._id}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();

