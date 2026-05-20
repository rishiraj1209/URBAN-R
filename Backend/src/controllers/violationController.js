import { Violation } from "../models/voilationModel.js";

export const getViolations = async (req, res) => {
  try {
    const data = await Violation.find({ driver: req.user.id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};