// import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/UserContext";
import api from "../utils/axiosInstance.js";
export default function Login() {
   const errorMessages = {
    "This username is already taken.": "اسم المستخدم مستخدم بالفعل.",

  };
 let { setUserTokenRefresh, setUserTokenAccess } = useContext(userContext);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function login(values) {
    try {
      setLoading(true);
      let { data } = await api.post("/auth/login/", values);

      localStorage.setItem("accessToken", data.tokens.access);
      localStorage.setItem("refreshToken", data.tokens.refresh);
      setUserTokenAccess(data.tokens.access);
      setUserTokenRefresh(data.tokens.refresh);

      toast.success("تم تسجيل الدخول بنجاح!");
      navigate("/home");
    } catch (error) {
        let serverMessage = error.response.data.error;
        
      let translatedMessage = errorMessages[serverMessage] || "حدث خطأ غير متوقع، حاول مرة أخرى.";

      toast.error(translatedMessage);
        setLoading(false)
    } finally {
      setLoading(false);
    }
  }
  let validationSchema = Yup.object().shape({
    username: Yup.string()
      .matches(
        /^[a-zA-Z0-9._-]{3,20}$/,
        "اسم المستخدم يجب أن يكون من 3 إلى 20 حرفًا، ويُسمح بالأرقام والنقاط والشرطات"
      )
      .required("اسم المستخدم مطلوب"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل، وتشمل رقم وحرف واحد على الأقل."
      )
      .required("كلمة المرور مطلوبة"),
    });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });

  return (
    <form
      className="w-1/2 mx-auto p-6 bg-white rounded-xl shadow-md"
      onSubmit={formik.handleSubmit}
    >
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
