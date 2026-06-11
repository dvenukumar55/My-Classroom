const mongoose = require("mongoose");
const User = require("./models/user");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

async function createStudents() {

  const students = [];

  for (let i = 1; i <= 60; i++) {

    const roll = `23Q61A05${String(i).padStart(2,"0")}`;

    const password = await bcrypt.hash("123456",10);

    students.push({
      name: "Student " + i,
      rollNo: roll,
      role: "student"
    });

  }

  await User.insertMany(students);

  console.log("60 Students Created");
  process.exit();
}

createStudents();