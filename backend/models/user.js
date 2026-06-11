const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    rollNo:{
        type:String
    },

    email:{
        type:String
    },

    password:{
        type:String
    },

    role:{
        type:String,
        enum:["student","faculty"],
        required:true
    }

});

module.exports = mongoose.model("User", userSchema);
