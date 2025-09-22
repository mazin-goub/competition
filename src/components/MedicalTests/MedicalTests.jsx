import React, { useContext, useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

export default function MedicalTests() {
  const { userTokenAccess } = useContext(userContext);
  const [medicalTests, setMedicalTests] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMedical() {
    try {
      const { data } = await api.get(`/medicalTests/all/`, {
        headers: { Authorization: `Bearer ${userTokenAccess}` },
      });
      setMedicalTests(data.medicalTests);
    } catch (err) {
      console.error("❌ Error fetching medicalTests:", err.response?.data?.error || err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMedical();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto p-4 font-sans">
      <div className="flex justify-end mb-6">
       <Link to={'add'} className="bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-primary-light transition-colors shadow-md"
         > أضف تحليل آخر

         </Link>
      </div>

      {medicalTests.length === 0 ? (
        <p className="text-center text-gray-500">لا توجد تحاليل طبية متاحة.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {medicalTests.map((test) => (
            <div
              key={test.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-md font-sans transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
            >
              <h2 className="text-xl font-bold text-primary mb-1">
                {test.title || "تحليل غير معروف"}
              </h2>
              <h2 className="text-xl font-bold text-primary mb-1">
                {test.subtitle || "تحليل غير معروف"}
              </h2>

              <h4 className="text-lg text-black mb-2">{test.type || "—"}</h4>
              <p className="text-base text-gray mb-2">
                التاريخ: {test.date || "—"}
              </p>
              <p className="text-base font-semibold text-success mb-2">
                النتيجة: {test.result || "—"}
              </p>
              <p className="text-base italic text-gray mb-4">
                الملاحظة: {test.notes || "لا توجد ملاحظات"}
              </p>
              <Link to={`update/${test.id}`} className="bg-primary-light text-white font-bold py-2 px-4 rounded-lg hover:bg-primary transition-colors"
              >تعديل التحليل</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
