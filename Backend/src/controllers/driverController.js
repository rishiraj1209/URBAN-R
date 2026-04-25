import { Voilation } from "../models/voilationModel.js";
import { Training } from "../models/trainingModel.js";

export const getDriverStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const violations = await Voilation.find({ driver: userId });
    const training = await Training.findOne({ driver: userId });

    const score = 100 - violations.length * 5;

    res.json({
      safetyScore: score,
      totalViolations: violations.length,
      trainingScore: training?.score || 0,
      history: [
        { month: "Jan", score: 90 },
        { month: "Feb", score: 80 },
      ],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};