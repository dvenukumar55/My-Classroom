const jwt=require("jsonwebtoken");
const User = require("../models/user");
// REGISTER
const register = async(req,res)=>{
    try{
        const {
            name,
            rollNo,
            email,
            password,
            role
        } = req.body;
     const user =
        await User.create({
            name,
            rollNo,
            email,
            password,
            role
        });
        res.status(201)
        .json(user);
    }
    catch(err){
        res.status(500)
        .json({
            msg:err.message
        });
    }
};
// LOGIN
const login = async(req,res)=>{
    try{
        const {
            rollNo,
            email,
            password
        } = req.body;
        let user;
        // STUDENT
        if(rollNo){
            user =
            await User.findOne({
                rollNo
            });
        }
        // FACULTY
        else{
            user =
            await User.findOne({
                email,
                password
            })
        }
        if(!user){
            return res
            .status(404)
            .json({
                msg:"User not found"
            });
        }
        const token = jwt.sign(
                           {
                           id:user._id,
                           role:user.role
                           },
                       process.env.JWT_SECRET
                        );
res.json({msg:"Login success",token,role:user.role});
        // res.json({
        //     msg:"Login success",
        //     user
        // });
    }
    catch(err){

      res.status(500)
        .json({
            msg:err.message
        });
    }
};
module.exports = {
    register,
    login
};