import React, { useContext } from "react";
import { userContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance.js";

export default function Logout() {
  const navigate = useNavigate();
  const { setUserTokenRefresh, userTokenRefresh, setUserTokenAccess } =
    useContext(userContext);

  async function logout() {
    try {
      await api.post("/auth/logout/", { refresh: userTokenRefresh });
      toast.success("تم تسجيل الخروج!");
    } catch (error) {
      const serverMessage =
        error.response?.data?.detail || "فشل تسجيل الخروج، حاول مرة أخرى.";
      toast.error(serverMessage);
    } finally {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      setUserTokenAccess(null);
      setUserTokenRefresh(null);
      navigate("/login");
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
