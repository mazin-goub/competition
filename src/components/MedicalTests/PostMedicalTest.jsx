import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";

export default function AddMedicalTest() {
  const { userTokenAccess } = useContext(userContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    date: Yup.date().required("التاريخ مطلوب"),
    time: Yup.string().required("الوقت مطلوب"),
    title: Yup.string().required("العنوان مطلوب"),
    subtitle: Yup.string().required("العنوان الفرعي مطلوب"),
    result: Yup.string().required("النتيجة مطلوبة"),
    notes: Yup.string(),
  });

  async function handleSubmit(values, { resetForm }) {
    try {
      const { data } = await api.post(
        "/medicalTests/all/",
        values,
        { headers: { Authorization: `Bearer ${userTokenAccess}` } }
      );

      toast.success("تم إضافة التحليل بنجاح ");
      resetForm();

      setTimeout(() => {
        navigate("/medicalTests");
      }, 1500);
    } catch (err) {
      toast.error(err?.response?.data?.error || "حدث خطأ أثناء إضافة التحليل الطبي");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-12 px-6" style={{marginTop: '-70px'}}>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-emerald-100 p-8">
        <Toaster position="top-center" />
        <h2 className="text-3xl font-bold text-emerald-700 mb-8 text-center font-cairo">إضافة تحليل جديد</h2>

        <Formik
          initialValues={{
            date: "",
            time: "",
            title: "",
            subtitle: "",
            result: "",
            notes: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-emerald-700 mb-3">📅 التاريخ</label>
                  <Field 
                    type="date" 
                    name="date" 
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300" 
                  />
                  <ErrorMessage name="date" component="p" className="text-red-500 text-sm mt-2" />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-emerald-700 mb-3">⏰ الوقت</label>
                  <Field 
                    type="time" 
                    name="time" 
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300" 
                  />
                  <ErrorMessage name="time" component="p" className="text-red-500 text-sm mt-2" />
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-emerald-700 mb-3">🏷️ العنوان الرئيسي</label>
                <Field 
                  type="text" 
                  name="title" 
                  placeholder="أدخل العنوان الرئيسي للتحليل..." 
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300" 
                />
                <ErrorMessage name="title" component="p" className="text-red-500 text-sm mt-2" />
              </div>

              <div>
                <label className="block text-lg font-semibold text-emerald-700 mb-3">📋 العنوان الفرعي</label>
                <Field 
                  type="text" 
                  name="subtitle" 
                  placeholder="أدخل العنوان الفرعي للتحليل..." 
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300" 
                />
                <ErrorMessage name="subtitle" component="p" className="text-red-500 text-sm mt-2" />
              </div>

              <div>
                <label className="block text-lg font-semibold text-emerald-700 mb-3">✅ النتيجة</label>
                <Field 
                  type="text" 
                  name="result" 
                  placeholder="أدخل نتيجة التحليل..." 
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300" 
                />
                <ErrorMessage name="result" component="p" className="text-red-500 text-sm mt-2" />
              </div>

              <div>
                <label className="block text-lg font-semibold text-emerald-700 mb-3">📝 الملاحظات</label>
                <Field 
                  as="textarea" 
                  name="notes" 
                  placeholder="أدخل أي ملاحظات إضافية..." 
                  rows="4"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300" 
                />
                <ErrorMessage name="notes" component="p" className="text-red-500 text-sm mt-2" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 text-white py-4 px-6 rounded-xl shadow-lg hover:bg-emerald-700 transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                💾 حفظ التحليل
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
