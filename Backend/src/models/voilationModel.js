import mongoose from "mongoose";
const { Schema } = mongoose;

const violationSchema = new Schema({
  driver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rickshaw: {
    type: Schema.Types.ObjectId,
    ref: "Rickshaw"
  },
  type: String,
  severity: String,
  zone: String
}, { timestamps: true });

const Voilation = mongoose.model('voilations',violationSchema);
export {Voilation}