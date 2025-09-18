// // import { createContext, useEffect, useState } from "react";

// // export let userContext = createContext();

// // export default function UserContextProvider({ children }) {
// //   const [userTokenAccess, setUserTokenAccess] = useState(null);
// //   const [userTokenRefresh, setUserTokenRefresh] = useState(null);

// //   useEffect(() => {
// //     if (localStorage.getItem("accessToken")) {
// //       setUserTokenAccess(localStorage.getItem("accessToken"));
// //     }
// //     if (localStorage.getItem("refreshToken")) {
// //       setUserTokenRefresh(localStorage.getItem("refreshToken"));
// //     }
// //   }, []);

// //   return (
// //     <userContext.Provider
// //       value={{
// //         userTokenAccess,
// //         setUserTokenAccess,
// //         userTokenRefresh,
// //         setUserTokenRefresh,
// //       }}
// //     >
// //       {children}
// //     </userContext.Provider>
// //   );
// // }
// // src/context/UserContext.js
// import { createContext, useEffect, useState } from "react";

// export let userContext = createContext();

// export default function UserContextProvider({ children }) {
//   const [userTokenAccess, setUserTokenAccess] = useState(null);
//   const [userTokenRefresh, setUserTokenRefresh] = useState(null);

//   useEffect(() => {
//     const access = localStorage.getItem("accessToken");
//     const refresh = localStorage.getItem("refreshToken");
//     if (access) setUserTokenAccess(access);
//     if (refresh) setUserTokenRefresh(refresh);
//   }, []);

//   return (
//     <userContext.Provider
//       value={{
//         userTokenAccess,
//         setUserTokenAccess,
//         userTokenRefresh,
//         setUserTokenRefresh,
//       }}
//     >
//       {children}
//     </userContext.Provider>
//   );
// }



// src/context/UserContext.js
import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

export default function UserContextProvider({ children }) {
  const [userTokenAccess, setUserTokenAccess] = useState(null);
  const [userTokenRefresh, setUserTokenRefresh] = useState(null);

  useEffect(() => {
    const access = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");
    if (access) setUserTokenAccess(access);
    if (refresh) setUserTokenRefresh(refresh);
  }, []);

  // Save tokens after login
  const login = (access, refresh) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    setUserTokenAccess(access);
    setUserTokenRefresh(refresh);
  };

  // Clear tokens after logout
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUserTokenAccess(null);
    setUserTokenRefresh(null);
  };

  return (
    <userContext.Provider
      value={{
        userTokenAccess,
        userTokenRefresh,
        setUserTokenAccess,
        setUserTokenRefresh,
        login,
        logout,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
