import { useState, useContext } from "react";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";

export default function AddAppointment() {
  const { userTokenAccess } = useContext(userContext);
  const [form, setForm] = useState({
    date: "",
    time: "",
    location: "",
    name: "",
    appointment_type: "regular",
    notes_or_details: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/appointments/all/", form, {
        headers: { Authorization: `Bearer ${userTokenAccess}` },
      });
      alert("✅ Appointment added successfully!");
      setForm({
        date: "",
        time: "",
        location: "",
        name: "",
        appointment_type: "regular",
        notes_or_details: "",
      });
    } catch (err) {
      console.error("❌ Error adding appointment:", err.response?.data || err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md p-4">
      <input name="date" type="date" value={form.date} onChange={handleChange} className="border p-2 w-full" required />
      <input name="time" type="time" value={form.time} onChange={handleChange} className="border p-2 w-full" required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="border p-2 w-full" />
      <input name="name" placeholder="Doctor / Hospital" value={form.name} onChange={handleChange} className="border p-2 w-full" />
      <select name="appointment_type" value={form.appointment_type} onChange={handleChange} className="border p-2 w-full">
        <option value="medical">Medical</option>
        <option value="regular">Regular</option>
        <option value="follow-up">Follow-up</option>
        <option value="emergency">Emergency</option>
        <option value="annual">Annual</option>
        <option value="consultation">Consultation</option>
        <option value="diagnostic">Diagnostic</option>
        <option value="procedure">Procedure</option>
        <option value="second_opinion">Second Opinion</option>
        <option value="telemedicine">Telemedicine</option>
        <option value="physical_exam">Physical Exam</option>
        <option value="group_session">Group Session</option>
        <option value="home_visit">Home Visit</option>
        <option value="virtual">Virtual</option>
      </select>
      <textarea name="notes_or_details" placeholder="Notes" value={form.notes_or_details} onChange={handleChange} className="border p-2 w-full" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">➕ Add</button>
    </form>
  );
}
