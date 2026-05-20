import mongoose, { Schema } from 'mongoose';

const complaintSchema = new Schema({
  passenger: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  rickshaw: {
    type: Schema.Types.ObjectId,
    ref: "Rickshaw"
  },

  type: {
    type: String,
    default: 'other'
  },

  description: String,
  location: String,
  photo: String,

  status: {
    type: String,
    enum: ["pending", "resolved"],
    default: "pending"
  }
}, { timestamps: true });

const Complaint = mongoose.model('Complaint',complaintSchema);
export {Complaint};