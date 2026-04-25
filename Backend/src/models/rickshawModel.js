import mongoose, { Schema } from "mongoose";

const rickshawSchema = new Schema({
    driver:{type:Schema.Types.ObjectId, ref:"User",required:true},
    vehicleNumber:String,
    city:String,
    zone:String,
    status: { type: String, default: "pending" }
}, { timestamps: true })

const Rickshaw = mongoose.model('rickshaws',rickshawSchema);
export {Rickshaw};