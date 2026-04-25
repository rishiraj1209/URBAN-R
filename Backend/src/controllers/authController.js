import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"please enter all the fields"});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"user not found"});
        }

        const matchedPassword = await bcrypt.compare(password, user.password);
        if(!matchedPassword){
            return res.status(400).json({message:"invalid credendials"});
        }

        const token = jwt.sign({ id: user._id, role: user.role },process.env.JWT_SECRET,{ expiresIn: "7d" });

        res.json({token,role: user.role,userId: user._id,});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

export const signup = async (req,res)=>{
    try {
        const {name, email, password, role} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"please enter all the fields"});
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"user already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name:name,
            email:email,
            password:hashedPassword,
            role: role,
        })

        const token = jwt.sign(
            {id:user._id, role:user.role}, process.env.JWT_SECRET, {expiresIn:"7d"}
        );

        res.status(201).json({
            message: "User created successfully",
            token,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

