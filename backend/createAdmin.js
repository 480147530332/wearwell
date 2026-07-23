const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Delete old admin if exists
    await Admin.deleteMany({ email: "admin@wearwell.com" });

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new Admin({
      name: "Sumit Admin",
      email: "admin@wearwell.com",
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();

    console.log("🎉 ADMIN CREATED SUCCESSFULLY!");
    console.log("================================");
    console.log("Email    : admin@wearwell.com");
    console.log("Password : admin123");
    console.log("================================");
    console.log("Now go to: http://localhost:5173/admin/login");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();