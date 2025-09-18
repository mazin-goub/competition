// import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/UserContext";
import api from "../utils/axiosInstance.js";
export default function Register() {
//    const errorMessages = {
//     "This username is already taken.": "اسم المستخدم مستخدم بالفعل.",

//   };
//   let {setUserTokenRefresh , setUserTokenAccess} = useContext(userContext)
//   let navigate = useNavigate();
//   const [loading, setLoading] = useState(false)
//   async function register(values) {
//     try {
//         setLoading(true)
//       let { data } = await axios.post(
//         `https://apis.healing-herb.midoghanam.site/auth/register/`,
//         values,
//         {
//           headers: {
//             "ngrok-skip-browser-warning": true,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(data);
//       localStorage.setItem("accessToken", data.tokens.access);
// localStorage.setItem("refreshToken", data.tokens.refresh);
// setUserTokenAccess(data.tokens.access);
// setUserTokenRefresh(data.tokens.refresh)
//       toast.success("تم التسجيل بنجاح!");

//       setLoading(false);
//       navigate('home')
//     } catch (error) {
//         let serverMessage = error.response.data.error;
        
//       let translatedMessage = errorMessages[serverMessage] || "حدث خطأ غير متوقع، حاول مرة أخرى.";

//       toast.error(translatedMessage);
//         setLoading(false)
//     }
//   }
  let { setUserTokenRefresh, setUserTokenAccess } = useContext(userContext);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function register(values) {
    try {
      setLoading(true);
      let { data } = await api.post("/auth/register/", values);

      localStorage.setItem("accessToken", data.tokens.access);
      localStorage.setItem("refreshToken", data.tokens.refresh);
      setUserTokenAccess(data.tokens.access);
      setUserTokenRefresh(data.tokens.refresh);

      toast.success("تم التسجيل بنجاح!");
      navigate("/home");
    } catch (error) {
      toast.error("حدث خطأ أثناء التسجيل");
    } finally {
      setLoading(false);
    }
  }
  let validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .matches(/^[\p{L}\s'-]+$/u, "الاسم الأول يجب أن يحتوي على حروف فقط")
      .required("الاسم الأول مطلوب"),
    last_name: Yup.string()
      .matches(/^[\p{L}\s'-]+$/u, "الاسم الأخير يجب أن يحتوي على حروف فقط")
      .required("الاسم الأخير مطلوب"),
    username: Yup.string()
      .matches(
        /^[a-zA-Z0-9._-]{3,20}$/,
        "اسم المستخدم يجب أن يكون من 3 إلى 20 حرفًا، ويُسمح بالأرقام والنقاط والشرطات"
      )
      .required("اسم المستخدم مطلوب"),
    email: Yup.string()
      .email("يرجى إدخال بريد إلكتروني صحيح")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل، وتشمل رقم وحرف واحد على الأقل."
      )
      .required("كلمة المرور مطلوبة"),
    age: Yup.number()
      .min(10, "العمر يجب أن يكون أكبر من 10 سنوات")
      .max(120, "يرجى إدخال عمر صحيح")
      .required("العمر مطلوب"),
    gender: Yup.string()
      .oneOf(["ذكر", "أنثى"], "الرجاء اختيار الجنس")
      .required("الجنس مطلوب"),
    diseases: Yup.string(),
    allergies: Yup.string(),
    medications: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      email: "",
      age: "",
      gender: "",
      diseases: "",
      allergies: "",
      medications: "",
    },
    validationSchema,
    onSubmit: register,
  });

  return (
    <form
      className="w-1/2 mx-auto p-6 bg-white rounded-xl shadow-md"
      onSubmit={formik.handleSubmit}
    >
      {/* الاسم الأول + الأخير */}
      <div className="grid md:grid-cols-2 md:gap-6">
        {/* First Name */}
        <div className="mb-5">
          <input
            type="text"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.first_name}
            name="first_name"
            id="first_name"
            aria-invalid={
              formik.touched.first_name && formik.errors.first_name ? "true" : "false"
            }
            aria-describedby="firstNameError"
            className="block w-full rounded-lg border px-3 py-2 text-sm text-black focus:border-primary focus:ring-primary"
            placeholder="الاسم الأول"
          />
          {formik.touched.first_name && formik.errors.first_name && (
            <p id="firstNameError" role="alert" className="text-red-500 text-sm">
              {formik.errors.first_name}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-5">
          <input
            type="text"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.last_name}
            name="last_name"
            id="last_name"
            aria-invalid={
              formik.touched.last_name && formik.errors.last_name ? "true" : "false"
            }
            aria-describedby="lastNameError"
            className="block w-full rounded-lg border px-3 py-2 text-sm text-black focus:border-primary focus:ring-primary"
            placeholder="الاسم الأخير"
          />
          {formik.touched.last_name && formik.errors.last_name && (
            <p id="lastNameError" role="alert" className="text-red-500 text-sm">
              {formik.errors.last_name}
            </p>
          )}
        </div>
      </div>

      {/* البريد الإلكتروني + كلمة المرور */}
      <div className="grid md:grid-cols-2 md:gap-6">
        {/* Email */}
        <div className="mb-5">
          <input
            type="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            id="email"
            aria-invalid={
              formik.touched.email && formik.errors.email ? "true" : "false"
            }
            aria-describedby="emailError"
            className="block w-full rounded-lg border px-3 py-2 text-sm text-black focus:border-primary focus:ring-primary"
            placeholder="البريد الإلكتروني"
          />
          {formik.touched.email && formik.errors.email && (
            <p id="emailError" role="alert" className="text-red-500 text-sm">
              {formik.errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-5">
          <input
            type="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            id="password"
            aria-invalid={
              formik.touched.password && formik.errors.password ? "true" : "false"
            }
            aria-describedby="passwordError"
            className="block w-full rounded-lg border px-3 py-2 text-sm text-black focus:border-primary focus:ring-primary"
            placeholder="كلمة المرور"
          />
          {formik.touched.password && formik.errors.password && (
            <p id="passwordError" role="alert" className="text-red-500 text-sm">
              {formik.errors.password}
            </p>
          )}
        </div>
      </div>

      {/* اسم المستخدم + العمر */}
      <div className="grid md:grid-cols-2 md:gap-6">
        {/* Username */}
        <div className="mb-5">
          <input
            type="text"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.username}
            name="username"
            id="username"
            aria-invalid={
              formik.touched.username && formik.errors.username ? "true" : "false"
            }
            aria-describedby="usernameError"
            className="block w-full rounded-lg border px-3 py-2 text-sm text-black focus:border-primary focus:ring-primary"
            placeholder="اسم المستخدم"
          />
          {formik.touched.username && formik.errors.username && (
            <p id="usernameError" role="alert" className="text-red-500 text-sm">
              {formik.errors.username}
            </p>
          )}
        </div>

        {/* Age */}
        <div className="mb-5">
          <input
            type="number"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.age}
            name="age"
            id="age"
            aria-invalid={formik.touched.age && formik.errors.age ? "true" : "false"}
            aria-describedby="ageError"
            className="block w-full rounded-lg border px-3 py-2 text-sm text-black focus:border-primary focus:ring-primary"
            placeholder="العمر"
          />
          {formik.touched.age && formik.errors.age && (
            <p id="ageError" role="alert" className="text-red-500 text-sm">
              {formik.errors.age}
            </p>
          )}
        </div>
      </div>

      {/* الجنس */}
      <div className="mb-5">
        <p className="mb-2 text-sm font-medium text-gray-700">الجنس</p>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="ذكر"
              checked={formik.values.gender === "ذكر"}
              onChange={formik.handleChange}
              className="text-primary focus:ring-primary"
            />
            <i className="fas fa-mars text-blue-600"></i> ذكر
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="أنثى"
              checked={formik.values.gender === "أنثى"}
              onChange={formik.handleChange}
              className="text-primary focus:ring-primary"
            />
            <i className="fas fa-venus text-pink-600"></i> أنثى
          </label>
        </div>
        {formik.touched.gender && formik.errors.gender && (
          <p role="alert" className="text-red-500 text-sm">
            {formik.errors.gender}
          </p>
        )}
      </div>

      {/* الأمراض / الحساسية / الأدوية */}
      <div className="mb-5">
        <textarea
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.diseases}
          name="diseases"
          id="diseases"
          className="block w-full rounded-lg border px-3 py-2 text-sm text-black focus:border-primary focus:ring-primary"
          placeholder="الأمراض التي تعاني منها"
        />
      </div>
      <div className="mb-5">
        <textarea
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.allergies}
          name="allergies"
          id="allergies"
          className="block w-full rounded-lg border px-3 py-2 text-sm text-black focus:border-primary focus:ring-primary"
          placeholder="الحساسية من"
        />
      </div>
      <div className="mb-5">
        <textarea
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.medications}
          name="medications"
          id="medications"
          className="block w-full rounded-lg border px-3 py-2 text-sm text-black focus:border-primary focus:ring-primary"
          placeholder="الأدوية التي تتناولها"
        />
      </div>

{loading ?  <button

        type="submit"
        className="w-full rounded-lg bg-primary px-3 py-1.5 text-white font-medium hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary"
      >
        <i className="fa fa-spinner fa-spin text-white"></i>
      </button> : <button
        type="submit"
        className="w-full rounded-lg bg-primary px-5 py-2.5 text-white font-medium hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary"
      >
        تسجيل
      </button>}
      
     
    </form>
  );
}
