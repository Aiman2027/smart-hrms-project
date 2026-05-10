import Leave from "../models/Leave.js";


export const applyLeave = async (req, res) => {
  try {
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: "Reason is required",
      });
    }

    const leave = await Leave.create({
      employeeId: req.user.id, 
      reason,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Leave applied successfully",
      data: leave,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};



 
 
export const getLeaves = async (req, res) => {
  try {
    const query = {};

    
    if (req.user.role === "employee") {
      query.employeeId = req.user.id;
    }

    const leaves = await Leave.find(query)
      .populate("employeeId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Leaves fetched",
      data: leaves,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};

export const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Leave status updated",
      data: leave,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};