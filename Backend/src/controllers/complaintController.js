import { Complaint } from '../models/complaintsModel.js';
import { Rickshaw } from '../models/rickshawModel.js';

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('passenger', 'name email')
      .populate('rickshaw', 'vehicleNumber zone status');
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ passenger: req.user.id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createComplaint = async (req, res) => {
  try {
    req.body.passenger = req.user.id;
    // If frontend provided a vehicleNumber string, try to resolve it
    // to a Rickshaw document and attach its id to the complaint.
    if (req.body.vehicleNumber) {
      const r = await Rickshaw.findOne({ vehicleNumber: req.body.vehicleNumber });
      if (r) {
        req.body.rickshaw = r._id;
      }
      // remove vehicleNumber from body so mongoose doesn't store unknown field
      delete req.body.vehicleNumber;
    }
    const complaint = await Complaint.create(req.body);
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true }
    ).populate('passenger rickshaw');
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
