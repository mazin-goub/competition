import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import Home from "./components/Home/Home";
import Library from "./components/Library/Library";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import Stories from "./components/Stories/Stories";
import Schedules from "./components/schedules/Schedules";
import Community from "./components/Community/Community";
import Chatbot from "./components/Chatbot/Chatbot";
import { Toaster } from "react-hot-toast";
import HerbDetails from "./components/herbDetails/herbDetails";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Notfound from "./components/Notfound/Notfound";
import UserContextProvider from "./context/UserContext";
import ProtectedRoute from "./components/Protectedroute/protectedroute";
import EditProfileInfo from "./components/Dashboard/EditProfileInfo";

let routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Register /> },
      { path: "library", element: <ProtectedRoute> <Library /></ProtectedRoute> },
      { path: "home", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "editProfile", element: <ProtectedRoute><EditProfileInfo /></ProtectedRoute> },
      { path: "login", element: <Login /> },
      {path:"dashboard" , element:<ProtectedRoute> <Dashboard/></ProtectedRoute>},
      {path : "stories" , element :<ProtectedRoute><Stories/></ProtectedRoute>},
      {path:"schedules" , element:<ProtectedRoute><Schedules/></ProtectedRoute>},
      {path:"community" , element:<ProtectedRoute><Community/></ProtectedRoute> },
      {path:"herbDetails/:id" , element:<HerbDetails/> },
      {path:"chatbot" , element:<ProtectedRoute><Chatbot/></ProtectedRoute> },
      {path:"*" , element:<Notfound/> },
    ],
  },
]);

export default function App() {
  return <>
  <UserContextProvider>
  <RouterProvider router={routers}  />
   <Toaster/>

  </UserContextProvider>

  </>
}
