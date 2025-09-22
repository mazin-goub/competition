import { useEffect, useState, useContext } from "react";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

export default function AppointmentsList() {
  const { userTokenAccess } = useContext(userContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchAppointments() {
    try {
      const { data } = await api.get(`/appointments/all/`, {
        headers: { Authorization: `Bearer ${userTokenAccess}` },
      });
      setAppointments(data.appointments);
    } catch (err) {
      console.error("❌ Error fetching appointments:", err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }
  async function handleDelete(id) {
    try {
      await api.delete(`/appointments/all/${id}/`, {
        headers: { Authorization: `Bearer ${userTokenAccess}` },
      });
      // حدث القائمة بعد الحذف
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("❌ Error deleting appointment:", err.response?.data?.error || err.message);
    }
  }

  useEffect(() => {
    if (userTokenAccess) {
      fetchAppointments();
    }
  }, [userTokenAccess]);

  return (
    <div className="p-4">
      <Link
        to="add"
        className="inline-block mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        ➕ اضف ميعاد
      </Link>

      <h1 className="text-xl font-bold mb-4">📅 Appointments</h1>

      {loading ? (
        <p>⏳ Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p>🚫 No appointments found</p>
      ) : (
        <ul className="space-y-3">
          {appointments.map((a) => (
            <li key={a.id} className="border p-3 rounded shadow-sm bg-white">
              <p>
                <b>{a.date}</b> ⏰ {a.time}
              </p>
              <p>📍 {a.location}</p>
              <p>👨‍⚕️ {a.appointments_to}</p>
              <p>📌 {a.appointment_type}</p>
              <p>📝 {a.notes_or_details}</p>
              <button
                onClick={() => handleDelete(a.id)}
                className="text-red-600 hover:underline"
              >
                🗑️ امسح
              </button>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
