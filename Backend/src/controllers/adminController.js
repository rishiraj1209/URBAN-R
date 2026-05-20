import { User } from "../models/userModel.js";
import { Rickshaw } from "../models/rickshawModel.js";
import { Training } from "../models/trainingModel.js";
import { Violation } from "../models/voilationModel.js";

const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

export const getAdminDashboard = async (req, res) => {
  try {
    const { start, end } = getTodayRange();

    const registeredRickshaws = await Rickshaw.countDocuments();
    const activeToday = await Rickshaw.countDocuments({ status: "active" });
    const suspended = await Rickshaw.countDocuments({ status: "suspended" });
    const violationsToday = await Violation.countDocuments({ createdAt: { $gte: start, $lte: end } });

    const highRiskDriversData = await Violation.aggregate([
      { $group: { _id: "$driver", count: { $sum: 1 } } },
      { $match: { count: { $gte: 3 } } },
      { $count: "total" },
    ]);

    const zoneStats = await Rickshaw.aggregate([
      {
        $group: {
          _id: "$zone",
          total: { $sum: 1 },
          active: {
            $sum: {
              $cond: [{ $eq: ["$status", "active"] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          zone: "$_id",
          total: 1,
          active: 1,
        },
      },
    ]);

    res.json({
      registeredRickshaws,
      activeToday,
      suspended,
      violationsToday,
      highRiskDrivers: highRiskDriversData[0]?.total || 0,
      zoneStats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" }).select("name email createdAt");

    const driverData = await Promise.all(
      drivers.map(async (driver) => {
        const rickshaw = await Rickshaw.findOne({ driver: driver._id });
        const violationCount = await Violation.countDocuments({ driver: driver._id });
        const training = await Training.findOne({ driver: driver._id });

        return {
          id: driver._id,
          name: driver.name,
          email: driver.email,
          vehicleNumber: rickshaw?.vehicleNumber || null,
          zone: rickshaw?.zone || null,
          status: rickshaw?.status || "pending",
          safetyScore: training?.score || 0,
          totalViolations: violationCount,
        };
      })
    );

    res.json(driverData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminViolations = async (req, res) => {
  try {
    const violations = await Violation.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("driver", "name email")
      .populate("rickshaw", "vehicleNumber zone status");

    res.json(violations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminZones = async (req, res) => {
  try {
    const zones = await Rickshaw.aggregate([
      {
        $group: {
          _id: "$zone",
          totalRickshaws: { $sum: 1 },
          activeRickshaws: {
            $sum: {
              $cond: [{ $eq: ["$status", "active"] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          zone: "$_id",
          totalRickshaws: 1,
          activeRickshaws: 1,
        },
      },
    ]);

    const zoneViolations = await Violation.aggregate([
      {
        $group: {
          _id: "$zone",
          totalViolations: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          zone: "$_id",
          totalViolations: 1,
        },
      },
    ]);

    const mergedZones = zones.map((item) => {
      const violationItem = zoneViolations.find((zone) => zone.zone === item.zone);
      return {
        ...item,
        totalViolations: violationItem?.totalViolations || 0,
      };
    });

    res.json(mergedZones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
