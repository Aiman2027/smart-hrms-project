import { useState, useEffect } from "react";
import API from "../utils/API";

const AdminLeavePanel = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLeaves = async () => {
    try {
      setError("");
      const res = await API.get("/leaves");
      const data = res.data?.data || res.data || [];
      setLeaves(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setError("Failed to load leaves");
      setLeaves([]);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setLoading(true);
      await API.put(`/leaves/${id}`, { status });
      fetchLeaves();
    } catch (err) {
      console.log(err);
      setError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-cyan-400 mb-6">
          Employee Leaves
        </h2>
        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4">
            {error}
          </div>
        )}
        {loading && (
          <p className="text-cyan-400 mb-4">Processing...</p>
        )}
        <div className="space-y-4">
          {leaves.length === 0 ? (
            <div className="text-gray-400 text-center mt-10">
              No leave requests found
            </div>
          ) : (
            leaves.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 bg-gray-900 border border-cyan-500/30 rounded-xl hover:scale-[1.02] transition"
              >
                <div>
                  <p className="font-bold">{item.reason || "No reason"}</p>
                  <p className="text-sm text-gray-400">
                    {item.employeeId?.name || "Employee"} •{" "}
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === "Approved"
                      ? "bg-green-500 text-black"
                      : item.status === "Rejected"
                      ? "bg-red-500 text-white"
                      : "bg-blue-500 text-black"
                  }`}>
                    {item.status}
                  </span>
                  <button
                    disabled={loading}
                    onClick={() => updateStatus(item._id, "Approved")}
                    className="bg-cyan-500 text-black px-3 py-1 rounded-md text-sm hover:bg-cyan-600 transition disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => updateStatus(item._id, "Rejected")}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLeavePanel;
