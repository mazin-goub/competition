import { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import toast from "react-hot-toast";

export default function EditProfileInfo() {
  let { userTokenAccess } = useContext(userContext);
  const [userInfo, setUserInfo] = useState(null);

  async function getUserInfo() {
    try {
      let { data } = await api.get(
        `https://apis.healing-herb.midoghanam.site/auth/account/userProfile/`,
        {
          headers: {
            Authorization: `Bearer ${userTokenAccess}`,
          },
        }
      );
      setUserInfo(data.user);
    } catch (err) {
      toast.error("فشل في تحميل البيانات");
    }
  }

  async function updateProfile(values) {
    try {
      await api.put(
        `https://apis.healing-herb.midoghanam.site/auth/account/userProfile/`,
        values,
        {
          headers: {
            Authorization: `Bearer ${userTokenAccess}`,
          },
        }
      );
      toast.success("تم تعديل البيانات بنجاح");
    } catch (err) {
      toast.error("فشل في تعديل البيانات");
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const validationSchema = Yup.object({
    first_name: Yup.string().required("مطلوب"),
    last_name: Yup.string().required("مطلوب"),
    age: Yup.number().required("مطلوب"),
    gender: Yup.string().required("مطلوب"),
    diseases: Yup.string(),
    allergies: Yup.string(),
    medications: Yup.string(),
  });

  return (
    <div className="p-6 font-cairo">
      <h1 className="text-2xl mb-4">تعديل البيانات الشخصية</h1>

      {userInfo && (
        <Formik
          initialValues={{
            first_name: userInfo?.name?.first || "",
            last_name: userInfo?.name?.last || "",
            age: userInfo?.age || "",
            gender: userInfo?.gender || "",
            diseases: userInfo?.diseases || "",
            allergies: userInfo?.allergies || "",
            medications: userInfo?.medications || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => updateProfile(values)}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block">الاسم الأول</label>
                <Field name="first_name" className="border p-2 w-full rounded" />
                <ErrorMessage name="first_name" component="div" className="text-red-500" />
              </div>

              <div>
                <label className="block">الاسم الأخير</label>
                <Field name="last_name" className="border p-2 w-full rounded" />
                <ErrorMessage name="last_name" component="div" className="text-red-500" />
              </div>

              <div>
                <label className="block">العمر</label>
                <Field name="age" type="number" className="border p-2 w-full rounded" />
                <ErrorMessage name="age" component="div" className="text-red-500" />
              </div>

              <div>
                <label className="block">الجنس</label>
                <Field as="select" name="gender" className="border p-2 w-full rounded">
                  <option value="">اختر</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-red-500" />
              </div>

              <div>
                <label className="block">الأمراض المزمنة</label>
                <Field name="diseases" className="border p-2 w-full rounded" />
              </div>

              <div>
                <label className="block">الحساسية</label>
                <Field name="allergies" className="border p-2 w-full rounded" />
              </div>

              <div>
                <label className="block">الأدوية</label>
                <Field name="medications" className="border p-2 w-full rounded" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-600"
              >
                حفظ التعديلات
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
