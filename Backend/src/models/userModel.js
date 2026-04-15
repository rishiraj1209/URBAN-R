import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["admin","driver","passenger"],
        default:"passenger",
        required:true,
    }
},{timestamps:true});

const User = mongoose.model('users',userSchema);
export {User};