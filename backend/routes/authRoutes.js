
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();
const {register,login} = require("../controllers/authController");
const authMiddleware =require("../middleware/authMiddleware");

// REGISTER
router.post("/register",register);
// LOGIN
router.post("/login",login);

router.get("/profile",authMiddleware,(req,res)=>{
res.json({msg:"Protected route",user:req.user});
});



module.exports = router;





























































































































// // REGISTER
// router.post("/register", async (req, res) => {
//   try {

//     const data = req.body;

//     // BULK REGISTER
//     if (Array.isArray(data)) {

//       const users = [];

//       for (let user of data) {

//         // STUDENTS → no password
//         if (user.role === "student") {

//           users.push({
//             name: user.name,
//             rollNo: user.rollNo,
//             role: "student"
//           });

//         }

//         // FACULTY → password required
//         if (user.role === "faculty") {

//           const hashed = await bcrypt.hash(user.password, 10);

//           users.push({
//             name: user.name,
//             email: user.email,
//             password: hashed,
//             role: "faculty"
//           });

//         }

//       }

//       const created = await User.insertMany(users);

//       return res.json({
//         message: "Users created",
//         count: created.length
//       });

//     }


//     // SINGLE REGISTER
//     const { name, rollNo, email, password, role } = data;

//     // STUDENT REGISTER
//     if (role === "student") {

//       const user = await User.create({
//         name,
//         rollNo,
//         role: "student"
//       });

//       return res.json(user);

//     }

//     // FACULTY REGISTER
//     if (role === "faculty") {

//       if (!password) {
//         return res.status(400).json({ msg: "Password required for faculty" });
//       }

//       const hashed = await bcrypt.hash(password, 10);

//       const user = await User.create({
//         name,
//         email,
//         password: hashed,
//         role: "faculty"
//       });

//       return res.json(user);

//     }

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Registration error" });
//   }
// });


// // LOGIN
// router.post("/login", async (req, res) => {
//     console.log("Login request:", req.body);
//   const { rollNo, email, password } = req.body;

//   let user;

//   // STUDENT LOGIN
// if (rollNo) {

//   const user = await User.findOne({
//     rollNo: rollNo,
//     role: "student"
//   });

//   if (!user) {
//     return res.status(400).json({ msg: "Student not found" });
//   }

//   const token = jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET
//   );

//   return res.json({
//     token: token,
//     role: user.role
//   });
// }
//   // FACULTY LOGIN
//   if (email) {

//     user = await User.findOne({ email, role: "faculty" });

//     if (!user) {
//       return res.status(400).json({ msg: "Faculty not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ msg: "Wrong password" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET
//     );

//     return res.json({
//       token,
//       role: user.role
//     });

//   }

// });

// module.exports = router;