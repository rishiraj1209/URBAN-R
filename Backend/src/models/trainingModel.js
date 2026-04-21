import mongoose, { Schema } from "mongoose";

const trainingSchema = new Schema({
  driver: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  score: Number,
  passed: Boolean
});

const Training = mongoose.model('trainings',trainingSchema);
export {Training}