import { Training } from '../models/trainingModel.js';
import { protect } from '../middlewares/protect.js';

export const getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find().populate('driver', 'name email');
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTraining = [
  protect,
  async (req, res) => {
    try {
      req.body.driver = req.user.id;
      const training = await Training.create(req.body);
      res.status(201).json(training);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

export const getMyTrainings = [
  protect,
  async (req, res) => {
    try {
      const trainings = await Training.find({ driver: req.user.id }).populate('driver', 'name');
      res.json(trainings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

