import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaClipboardList,
} from "react-icons/fa";

import API from "../utils/API";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [data, setData] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    pendingLeaves: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await API.get("/dashboard");
      const d = res?.data?.data || {};

      setData({
        totalEmployees: Number(d.totalEmployees || 0),
        presentToday: Number(d.presentToday || 0),
        absentToday: Number(d.absentToday || 0),
        pendingLeaves: Number(d.pendingLeaves || 0),
      });

    } catch (error) {
      console.log("Dashboard error:", error);

      setData({
        totalEmployees: 0,
        presentToday: 0,
        absentToday: 0,
        pendingLeaves: 0,
      });

    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Employees",
      value: data.totalEmployees,
      icon: <FaUsers size={26} />,
      hint: "Active workforce",
    },
    {
      title: "Present Today",
      value: data.presentToday,
      icon: <FaUserCheck size={26} />,
      hint: "On duty today",
    },
    {
      title: "Absent Today",
      value: data.absentToday,
      icon: <FaUserTimes size={26} />,
      hint: "Not marked attendance",
    },
    {
      title: "Pending Leaves",
      value: data.pendingLeaves,
      icon: <FaClipboardList size={26} />,
      hint: "Waiting approval",
    },
  ];

  return (
    <div className="flex bg-[#050816] min-h-screen text-white">

      <Sidebar />

      <div className="flex-1 ml-[260px] p-8">

        <Navbar />

        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-5xl font-bold text-cyan-400">
            Dashboard Overview
          </h1>
          <p className="text-gray-400 mt-2">
            Real-time HRMS analytics & workforce insights
          </p>
        </motion.div>

        
        {loading ? (
          <div className="text-gray-400 animate-pulse">
            Loading analytics...
          </div>
        ) : data.totalEmployees === 0 ? (
          <div className="text-red-400">
            No data found or backend not connected
          </div>
        ) : (
          <>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-6 rounded-3xl bg-white/5 border border-cyan-500/20 shadow-xl overflow-hidden"
                >

                
                  <div className="absolute top-4 right-4">
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                  </div>

                  <div className="flex justify-between items-start">

                    <div>
                      <p className="text-gray-400 text-sm">
                        {card.title}
                      </p>

                      <h2 className="text-4xl font-bold mt-2 text-cyan-300">
                        {card.value}
                      </h2>

                      <p className="text-xs text-gray-500 mt-1">
                        {card.hint}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300">
                      {card.icon}
                    </div>

                  </div>
                </motion.div>
              ))}

            </div>

            
            <div className="mt-10 grid md:grid-cols-3 gap-6">

            
              <div className="p-6 rounded-3xl bg-white/5 border border-cyan-500/20">
                <h2 className="text-cyan-400 font-bold mb-4">
                  Performance Index
                </h2>

                <div className="text-4xl font-bold text-white mb-2">
                  92%
                </div>

                <div className="w-full h-2 bg-gray-800 rounded-full">
                  <div className="w-[92%] h-2 bg-cyan-400 rounded-full"></div>
                </div>

                <p className="text-sm text-gray-400 mt-2">
                  +4% improvement this week
                </p>
              </div>

            
              <div className="p-6 rounded-3xl bg-white/5 border border-purple-500/20">
                <h2 className="text-purple-400 font-bold mb-4">
                  HR Load
                </h2>

                <div className="text-3xl font-bold text-white mb-2">
                  Stable
                </div>

                <p className="text-gray-400 text-sm">
                  Leave approvals & attendance under control
                </p>
              </div>

          
              <div className="p-6 rounded-3xl bg-white/5 border border-green-500/20">
                <h2 className="text-green-400 font-bold mb-4">
                  Live Activity
                </h2>

                <div className="space-y-2 text-sm text-gray-300">
                  <p>✔ Employees active now</p>
                  <p>✔ Leaves processing</p>
                  <p>✔ Attendance synced</p>
                </div>
              </div>

            </div>

          </>
        )}

      </div>
    </div>
  );
};

export default Dashboard;