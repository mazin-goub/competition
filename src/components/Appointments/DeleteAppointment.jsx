import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";

export default function DeleteAppointment() {
  const { userTokenAccess } = useContext(userContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("⚠️ Are you sure you want to delete this appointment?")) return;

    try {
      await api.delete("/appointments/all/", {
        headers: { Authorization: `Bearer ${userTokenAccess}` },
        data: { id }, // مهم جدًا 👈
      });
      alert("✅ Appointment deleted successfully!");
      navigate("/appointments"); // رجع للـ list
    } catch (err) {
      console.error("❌ Error deleting appointment:", err.response?.data || err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">🗑 Delete Appointment</h2>
      <p>Are you sure you want to delete appointment with ID: <b>{id}</b>?</p>
      <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded mt-3">
        ❌ Confirm Delete
      </button>
    </div>
  );
}
