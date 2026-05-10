import Attendance from "../models/Attendance.js";

export const markAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);

    res.status(201).json({
      success: true,
      message: "Attendance marked",
      data: attendance,   
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const data = await Attendance.find()
      .populate("employeeId", "name email"); 

    res.status(200).json({
      success: true,
      message: "Attendance fetched",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};