const mongoose = require("mongoose");
const announcementSchema =new mongoose.Schema({
subject:{
type:String,
required:true
},
description:{
type:String,
required:true
},
createdAt:{
type:Date,
default:Date.now
}
});
module.exports = mongoose.model("Announcement", announcementSchema);
