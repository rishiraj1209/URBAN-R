import mongoose, { Schema } from "mongoose";

const trainingSchema = new Schema({
  driver: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  score: Number,
  passed: Boolean
}, { timestamps: true });

const Training = mongoose.model('trainings',trainingSchema);
export {Training}