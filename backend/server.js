const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use((req,res,next)=>{
   console.log(req.method, req.url);
   next();
});
app.get("/", (req, res) => {
  res.send("MyClass Backend is Running 🚀");
});

app.use("/api/auth",require("./routes/authRoutes"));

app.use("/api/announcements",require("./routes/announcementRoutes"));

app.use("/api/files",require("./routes/fileRoutes"));

app.use("/uploads",express.static("uploads"));

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
   console.log(`Server running on port ${PORT}`);
});