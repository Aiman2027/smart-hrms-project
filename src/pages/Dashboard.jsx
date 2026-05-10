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
      setData({ totalEmployees: 0, presentToday: 0, absentToday: 0, pendingLeaves: 0 });
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { title: "Total Employees", value: data.totalEmployees, icon: <FaUsers size={22} />, hint: "Active workforce" },
    { title: "Present Today", value: data.presentToday, icon: <FaUserCheck size={22} />, hint: "On duty today" },
    { title: "Absent Today", value: data.absentToday, icon: <FaUserTimes size={22} />, hint: "Not marked" },
    { title: "Pending Leaves", value: data.pendingLeaves, icon: <FaClipboardList size={22} />, hint: "Awaiting approval" },
  ];

  return (
    <div className="flex bg-[#050816] min-h-screen text-white">
      <Sidebar />
      <div className="flex-1 md:ml-[260px] ml-0 px-4 pt-16 pb-8 md:px-8 md:pt-8">
        <Navbar />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 mt-2 md:mt-0"
        >
          <h1 className="text-2xl md:text-5xl font-bold text-cyan-400">
            Dashboard Overview
          </h1>
          <p className="text-gray-400 mt-1 text-sm md:text-base">
            Real-time HRMS analytics & workforce insights
          </p>
        </motion.div>

        {loading ? (
          <div className="text-gray-400 animate-pulse">Loading analytics...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-4 md:p-6 rounded-2xl md:rounded-3xl bg-white/5 border border-cyan-500/20 shadow-xl overflow-hidden"
                >
                  <div className="absolute top-3 right-3">
                    <span className="flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <p className="text-gray-400 text-xs">{card.title}</p>
                      <h2 className="text-3xl md:text-4xl font-bold mt-1 text-cyan-300">
                        {card.value}
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">{card.hint}</p>
                    </div>
                    <div className="p-2 md:p-3 rounded-xl bg-cyan-500/20 text-cyan-300 w-fit">
                      {card.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="p-5 rounded-2xl bg-white/5 border border-cyan-500/20">
                <h2 className="text-cyan-400 font-bold mb-3">Performance Index</h2>
                <div className="text-4xl font-bold text-white mb-2">92%</div>
                <div className="w-full h-2 bg-gray-800 rounded-full">
                  <div className="w-[92%] h-2 bg-cyan-400 rounded-full"></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">+4% improvement this week</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20">
                <h2 className="text-purple-400 font-bold mb-3">HR Load</h2>
                <div className="text-3xl font-bold text-white mb-2">Stable</div>
                <p className="text-gray-400 text-sm">Leave approvals & attendance under control</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-green-500/20">
                <h2 className="text-green-400 font-bold mb-3">Live Activity</h2>
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
