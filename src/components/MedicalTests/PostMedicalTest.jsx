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
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
      <Toaster position="top-center" />
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">إضافة تحليل جديد</h2>

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
        <Form className="space-y-4">
          <div>
            <Field type="date" name="date" className="border p-2 w-full rounded" />
            <ErrorMessage name="date" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <Field type="time" name="time" className="border p-2 w-full rounded" />
            <ErrorMessage name="time" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <Field type="text" name="title" placeholder="العنوان" className="border p-2 w-full rounded" />
            <ErrorMessage name="title" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <Field type="text" name="subtitle" placeholder="العنوان الفرعي" className="border p-2 w-full rounded" />
            <ErrorMessage name="subtitle" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <Field type="text" name="result" placeholder="النتيجة" className="border p-2 w-full rounded" />
            <ErrorMessage name="result" component="p" className="text-red-500 text-sm" />
          </div>

          <div>
            <Field as="textarea" name="notes" placeholder="ملاحظات" className="border p-2 w-full rounded" />
            <ErrorMessage name="notes" component="p" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-light transition-colors w-full"
          >
            حفظ التحليل
          </button>
        </Form>
      </Formik>
    </div>
  );
}
