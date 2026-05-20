import { Training } from '../models/trainingModel.js';

export const getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find().populate('driver', 'name email');
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTraining = async (req, res) => {
  try {
    req.body.driver = req.user.id;
    const training = await Training.create(req.body);
    res.status(201).json(training);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyTrainings = async (req, res) => {
  try {
    const trainings = await Training.find({ driver: req.user.id }).populate('driver', 'name');
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

