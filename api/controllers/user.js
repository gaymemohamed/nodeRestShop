const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
exports.user_signUp =  async (req, res, next) => {
    try {
            let checkMail = await User.findOne({email:req.body.email});
            if(checkMail){
                return res.status(409).json({
                    message:"mail Exist"
                })
            }
            bcrypt.hash(req.body.password, 10, async (err, hash) => {   
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    let addUser = await User.create(user);
                    console.log(addUser)
                    return res.status(201).json({
                        message: "user created"
                    });
                }
            })
        
        
    } catch (err) {
        next(err)
    }

};

exports.User_Login =  async (req, res , next)=>{
    try{
    let user = await User.findOne({email : req.body.email});
    if (!user) 
        return res.status(401).json({
            "message" : "email or password is worng"
        })
    bcrypt.compare(req.body.password , user.password , (err , result)=>{
        if(err){
            return res.status(401).json({
                message : "Auth failed"
            })
        } 
        if(result){
            const token = jwt.sign({
                email: user.email,
                userId :user._id
            }
            , "secret"
            ,{
                expiresIn : "1h"                    
            }
        );
        return res.status(200).json({
            message: "Auth Success",
            token : token
        })
        }else{
            return res.status(401).json({
                message:"Auth Failed"
            })
        }
    })
    
}
catch(err){
    next(err);
}  
};

exports.User_delete =  async(req, res , next)=>{
    let removeUser = await User.remove({_id : req.params.userId});
    return res.status(200).json({
        message:"User Deleted"
    })
};