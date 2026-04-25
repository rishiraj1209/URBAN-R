import { Rickshaw } from "../models/rickshawModel.js";

export const createRickshaw = async (req, res) => {
  try {
    const existing = await Rickshaw.findOne({ driver: req.user.id });

    if (existing) {
      return res.status(400).json({ message: "Already exists" });
    }

    const r = await Rickshaw.create({
      driver: req.user.id,
      vehicleNumber: req.body.vehicleNumber,
      status: "pending",
    });

    res.json(r);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyRickshaw = async (req, res) => {
  try {
    const r = await Rickshaw.findOne({ driver: req.user.id });
    res.json(r);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};