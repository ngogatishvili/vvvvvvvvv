import bcrypt from "bcryptjs";
import jwt   from "jsonwebtoken"
import User from "../models/user.js"


export const signin=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const existingUser=await User.findOne({email});
        if(!existingUser) return res.status(404).json({msg:"user does not exist"})

        const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({msg:"invalid credentials"})

        const token=jwt.sign({email:existingUser.email,id:existingUser._id},"test",{expiresIn:"1h"})

        res.status(200).json({result:existingUser,token})
        
    }catch(err) {
        res.status(500).json({msg:"something went wrong"})
    }
}

export const signup=async(req,res)=>{
        const {email,password,firstName,lastName,repeatPassword}=req.body;

        try {
            const existingUser=await User.findOne({email})
            if(existingUser) return res.status(400).json({msg:"user with this email already exists"})
            if(password!==repeatPassword) return res.status(400).json({msg:"Passwords do not match"})
            const hashedPassword=await  bcrypt.hash(password,12)
            const result=await User.create({email,password:hashedPassword,name:`${firstName}  ${lastName}`});
            const token=jwt.sign({email:result.email,id:result._id},"test",{expiresIn:"1h"})
            res.status(201).json({result,token})
            console.log(result,token);
        }catch(err) {
            console.log(err);
            res.status(500).json({msg:"something went wrong"})
        }
}

