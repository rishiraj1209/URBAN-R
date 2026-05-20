import { Complaint } from '../models/complaintsModel.js';

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
