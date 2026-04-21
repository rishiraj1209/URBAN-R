import mongoose from "mongoose";

const violationSchema = new Schema({
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