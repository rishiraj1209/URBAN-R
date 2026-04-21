import mongoose, { Schema } from "mongoose";

const rickshawSchema = new Schema({
    driver:{type:Schema.Types.ObjectId, ref:"users",required:true},
    vehicleNumber:String,
    city:String,
    zone:String,
})

const Rickshaw = mongoose.model('rickshaws',rickshawSchema);
export {Rickshaw};