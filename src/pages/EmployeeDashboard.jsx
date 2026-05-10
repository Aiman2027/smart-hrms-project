import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../utils/API";

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [leaveCount, setLeaveCount] = useState(0);

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  
  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProfile(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  
  const fetchAttendance = async () => {
    try {
      const res = await API.get("/attendance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const today = res.data.data?.slice(-1)[0];
      setTodayAttendance(today);
    } catch (err) {
      console.log(err);
    }
  };

  
  const fetchLeaves = async () => {
    try {
      const res = await API.get("/leaves", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setLeaveCount(res.data.data?.length || 0);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchAttendance();
    fetchLeaves();
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-10">

      
      <div className="flex items-center justify-between mb-8">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-cyan-400">
            Welcome, {profile?.name || "Employee"}
          </h1>
          <p className="text-gray-400 mt-1">
            Manage your work efficiently 
          </p>
        </motion.div>

    
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-400 px-5 py-2 rounded-xl font-bold"
        >
          Logout
        </button>

      </div>

      
      <div className="grid md:grid-cols-3 gap-5 mb-8">

        <div className="p-5 rounded-2xl bg-white/5 border border-cyan-500/20">
          <h2 className="text-cyan-300 font-bold">Today Attendance</h2>
          <p className="mt-2 text-lg">
            {todayAttendance?.status || "Not Marked"}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-blue-500/20">
          <h2 className="text-blue-300 font-bold">Total Leaves</h2>
          <p className="mt-2 text-lg">{leaveCount}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-green-500/20">
          <h2 className="text-green-300 font-bold">Your Email</h2>
          <p className="mt-2 text-sm">{profile?.email}</p>
        </div>

      </div>

      
      <div className="grid md:grid-cols-3 gap-6">

        <Link to="/attendance">
          <div className="p-6 rounded-2xl bg-white/5 border border-cyan-500/30 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-cyan-300">
              Mark Attendance
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Check-in / Check-out daily
            </p>
          </div>
        </Link>

        <Link to="/leaves">
          <div className="p-6 rounded-2xl bg-white/5 border border-blue-500/30 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-blue-300">
              Apply Leave
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Send leave request for approval
            </p>
          </div>
        </Link>

        <Link to="/profile">
          <div className="p-6 rounded-2xl bg-white/5 border border-green-500/30 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-green-300">
              Edit Profile
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Update your details & password
            </p>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default EmployeeDashboard;