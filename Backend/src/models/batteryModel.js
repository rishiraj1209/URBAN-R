import mongoose, { Schema } from "mongoose";

const batterySchema = new Schema({
  rickshaw: {
    type: Schema.Types.ObjectId,
    ref: "Rickshaw"
  },
  brand: String,
  certified: Boolean,
  health: Number
});

const Battery = mongoose.model('batteries',batterySchema);
export {Battery};