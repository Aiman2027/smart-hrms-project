import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";
import Leave from "../models/Leave.js";

export const getDashboardData = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalEmployees = await Employee.countDocuments();

    const presentToday = await Attendance.countDocuments({
      status: "Present",
      createdAt: { $gte: today },
    });

    const absentToday = await Attendance.countDocuments({
      status: "Absent",
      createdAt: { $gte: today },
    });

    const pendingLeaves = await Leave.countDocuments({
      status: "Pending",
    });

    res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        presentToday,
        absentToday,
        pendingLeaves,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};