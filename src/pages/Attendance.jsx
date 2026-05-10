import { useState, useEffect } from "react";
import API from "../utils/API";

const Attendance = () => {
  const [status, setStatus] = useState("Present");
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await API.get("/attendance");
      setAttendanceList(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.log(err);
      setAttendanceList([]);
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async () => {
    try {
      await API.post("/attendance/mark", {
        status,
        employeeId: localStorage.getItem("userId")
      });
      fetchAttendance();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-cyan-400 mb-6">
          My Attendance
        </h2>
        <div className="bg-black/40 border border-cyan-500/30 p-6 rounded-2xl flex items-center justify-between">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-black border border-cyan-500 p-2 rounded-md"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          <button
            onClick={markAttendance}
            className="bg-cyan-500 text-black px-6 py-2 rounded-md hover:bg-cyan-400 transition"
          >
            Mark Attendance
          </button>
        </div>
        <div className="mt-6 space-y-3">
          {loading ? (
            <p className="text-cyan-400">Loading...</p>
          ) : attendanceList.length === 0 ? (
            <p className="text-gray-400">No attendance records</p>
          ) : (
            attendanceList.map((item, i) => (
              <div
                key={i}
                className="flex justify-between p-4 bg-black/40 border border-gray-700 rounded-xl hover:border-cyan-500 transition"
              >
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  item.status === "Present" ? "bg-cyan-500 text-black" : "bg-blue-600 text-white"
                }`}>
                  {item.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
