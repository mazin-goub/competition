// // src/api/axiosInstance.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://apis.healing-herb.midoghanam.site",
//   headers: {
//     "Content-Type": "application/json",
//     "ngrok-skip-browser-warning": "true",
//   },
// });

// // 🟢 Interceptor للـ Response (تجديد الـ Access Token)
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       localStorage.getItem("refreshToken")
//     ) {
//       originalRequest._retry = true;
//       try {
//         const refreshToken = localStorage.getItem("refreshToken");

//         const { data } = await axios.post(
//           "https://apis.healing-herb.midoghanam.site/auth/token/refresh/",
//           { refresh: refreshToken },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "ngrok-skip-browser-warning": "true",
//             },
//           }
//         );

//         localStorage.setItem("accessToken", data.access);
//         api.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${data.access}`;
//         originalRequest.headers[
//           "Authorization"
//         ] = `Bearer ${data.access}`;

//         return api(originalRequest);
//       } catch (err) {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;






// src/api/axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://apis.healing-herb.midoghanam.site",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// 🟢 Interceptor للـ Request (إضافة الـ Access Token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🟢 Interceptor للـ Response (تجديد الـ Access Token)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const { data } = await axios.post(
          "https://apis.healing-herb.midoghanam.site/auth/token/refresh/",
          { refresh: refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        localStorage.setItem("accessToken", data.access);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.access}`;
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${data.access}`;

        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
