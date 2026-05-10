import React, { useState } from "react";
import { motion } from "framer-motion";
import API from "../utils/API";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/employees", formData);
      alert("Employee Added Successfully");

      setFormData({
        name: "",
        email: "",
        role: "",
        department: "",
      });
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to add employee");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050816] px-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 shadow-2xl"
      >

        
        <h1 className="text-3xl font-bold text-center text-cyan-400 mb-2">
          Add New Employee
        </h1>

        <p className="text-center text-gray-400 mb-6 text-sm">
          Fill details to create employee account
        </p>

        
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/30 border border-cyan-500/30 text-white outline-none focus:border-cyan-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/30 border border-cyan-500/30 text-white outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            name="role"
            placeholder="Role (e.g. Developer)"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/30 border border-cyan-500/30 text-white outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            name="department"
            placeholder="Department (e.g. IT)"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/30 border border-cyan-500/30 text-white outline-none focus:border-cyan-400"
          />

          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-3 rounded-xl"
          >
            Add Employee
          </motion.button>

        </form>

      </motion.div>
    </div>
  );
};

export default AddEmployee;