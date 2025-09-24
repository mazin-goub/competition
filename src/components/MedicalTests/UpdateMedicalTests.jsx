import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import Loader from "../Loader/Loader";

export default function UpdateMedicalTests() {
  const { userTokenAccess } = useContext(userContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);

  const validationSchema = Yup.object({
    date: Yup.date().required("التاريخ مطلوب"),
    time: Yup.string().required("الوقت مطلوب"),
    title: Yup.string().required("العنوان مطلوب"),
    subtitle: Yup.string().required("العنوان الفرعي مطلوب"),
    result: Yup.string().required("النتيجة مطلوبة"),
    notes: Yup.string(),
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get(`/medicalTests/all/${id}/`, {
          headers: { Authorization: `Bearer ${userTokenAccess}` },
        });
        setInitialValues(data);
      } catch (err) {
        toast.error("❌ فشل في جلب بيانات التحليل");
      }
    }
    fetchData();
  }, [id, userTokenAccess]);

  async function handleSubmit(values) {
    try {
      await api.put(`/medicalTests/all/${id}/`, values, {
        headers: { Authorization: `Bearer ${userTokenAccess}` },
      });
      toast.success("✅ تم تعديل التحليل بنجاح");
      navigate("/medical-tests");
    } catch (err) {
      toast.error(err?.response?.data?.error || "❌ حصل خطأ أثناء التعديل");
    }
  }

  if (!initialValues) {
    return <Loader/>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
      <Toaster position="top-center" />
      <h2 className="text-xl font-bold mb-6 text-center text-primary">تعديل التحليل</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <Field type="date" name="date" className="border p-2 w-full rounded" />
            {touched.date && errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

            <Field type="time" name="time" className="border p-2 w-full rounded" />
            {touched.time && errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}

            <Field type="text" name="title" placeholder="العنوان" className="border p-2 w-full rounded" />
            {touched.title && errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

            <Field type="text" name="subtitle" placeholder="العنوان الفرعي" className="border p-2 w-full rounded" />
            {touched.subtitle && errors.subtitle && <p className="text-red-500 text-sm">{errors.subtitle}</p>}

            <Field type="text" name="result" placeholder="النتيجة" className="border p-2 w-full rounded" />
            {touched.result && errors.result && <p className="text-red-500 text-sm">{errors.result}</p>}

            <Field as="textarea" name="notes" placeholder="الملاحظات" className="border p-2 w-full rounded" />
            {touched.notes && errors.notes && <p className="text-red-500 text-sm">{errors.notes}</p>}

            <button
              type="submit"
              className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-light transition"
            >
              حفظ التعديلات
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
