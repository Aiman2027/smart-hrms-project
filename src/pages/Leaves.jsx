import { useState, useEffect } from "react";
import API from "../utils/API";

const Leaves = () => {
  const [reason, setReason] = useState("");
  const [leaveList, setLeaveList] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await API.get("/leaves");
      setLeaveList(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.log(err);
      setLeaveList([]);
    }
  };

  const applyLeave = async () => {
    try {
      await API.post("/leaves/apply", { reason });
      setReason("");
      fetchLeaves();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-400 animate-pulse">
          Leave Request
        </h2>
        <div className="mt-6 bg-gray-900 p-5 rounded-2xl border border-cyan-500/30 flex gap-3 hover:scale-105 transition">
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter leave reason..."
            className="flex-1 bg-black border border-cyan-500 p-2 rounded-md"
          />
          <button
            onClick={applyLeave}
            className="bg-blue-500 hover:bg-cyan-500 text-black font-bold px-6 py-2 rounded-md transition"
          >
            Apply
          </button>
        </div>
        <div className="mt-6 bg-gray-900 p-5 rounded-2xl border border-blue-500/30">
          <h3 className="text-cyan-300 mb-4">My Leaves</h3>
          <div className="space-y-3">
            {leaveList.length > 0 ? (
              leaveList.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-gray-700 hover:border-blue-400 transition-all duration-300 hover:translate-x-2"
                >
                  <div>
                    <p className="font-medium">{item.reason}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    item.status === "Approved"
                      ? "bg-cyan-500 text-black"
                      : item.status === "Rejected"
                      ? "bg-red-500 text-white"
                      : "bg-blue-500 text-black"
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No leaves found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaves;
