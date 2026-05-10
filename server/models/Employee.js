import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    role: { type: String, default: "employee" },
    salary: Number,
    department: String,
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);