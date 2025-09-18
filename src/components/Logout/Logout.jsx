import React, { useContext } from "react";
import { userContext } from "../../context/UserContext";
// import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance.js";
export default function Logout() {
//   let navigate = useNavigate();
//   let { setUserTokenRefresh, userTokenRefresh, setUserTokenAccess, userTokenAccess } =
//     useContext(userContext);

//   async function logout() {
//     try {
//       await axios.post(
//         `https://apis.healing-herb.midoghanam.site/auth/logout/`,
//         { refresh: userTokenRefresh }, // ✅ خلي المفتاح refresh
//         {
//           headers: {
//             "ngrok-skip-browser-warning": true,
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${userTokenAccess}`,
//           },
//         }
//       );

//       localStorage.removeItem("refreshToken");
//       localStorage.removeItem("accessToken");

//       // صَفّي الـ context
//       setUserTokenAccess(null);
//       setUserTokenRefresh(null);

//       toast.success("تم تسجيل الخروج بنجاح!");
//       navigate("/login"); 
//     } catch (error) {
//       console.error(error);
//       toast.error("حصل خطأ أثناء تسجيل الخروج");
//     }
//   }
 let navigate = useNavigate();
  let { setUserTokenRefresh, userTokenRefresh, setUserTokenAccess } =
    useContext(userContext);

  async function logout() {
    try {
      await api.post("/auth/logout/", { refresh: userTokenRefresh });

      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");

      setUserTokenAccess(null);
      setUserTokenRefresh(null);

      toast.success("تم تسجيل الخروج!");
      navigate("/login");
    } catch (error) {
      toast.error("فشل تسجيل الخروج");
    }
  }

  return (
    <button
      onClick={logout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      تسجيل الخروج
    </button>
  );
}
