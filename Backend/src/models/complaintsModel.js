import mongoose, { Schema } from 'mongoose';

const complaintSchema = new Schema({
  passenger: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  rickshaw: {
    type: Schema.Types.ObjectId,
    ref: "Rickshaw"
  },

  description: String,
  location: String,

  status: {
    type: String,
    enum: ["pending", "resolved"],
    default: "pending"
  }
}, { timestamps: true });

const Complaint = mongoose.model('complaints',complaintSchema);
export {Complaint};