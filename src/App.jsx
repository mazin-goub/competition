import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import Home from "./components/Home/Home";
import Library from "./components/Library/Library";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import Stories from "./components/Stories/Stories";
import Chatbot from "./components/Chatbot/Chatbot";
import { Toaster, toast  } from "react-hot-toast";
import HerbDetails from "./components/HerbDetails/HerbDetails.jsx";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Notfound from "./components/Notfound/Notfound";
import UserContextProvider from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
import EditProfileInfo from "./components/Dashboard/EditProfileInfo";
import AppointmentsList from "./components/Appointments/AppointmentsList";
import AddAppointment from "./components/Appointments/AddAppointment";
import EditAppointment from "./components/Appointments/EditAppointment";
import DeleteAppointment from "./components/Appointments/DeleteAppointment";
import PostMedicalTest from "./components/MedicalTests/PostMedicalTest";
import CreatePost from "./components/Community/components/CreatePost";
import MedicalTests from "./components/MedicalTests/MedicalTests";
import UpdateMedicalTests from "./components/MedicalTests/UpdateMedicalTests";
import Recipe from "./components/Community/Recipe";
import RecipeDetail from "./components/Community/RecipeDeatails";



let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Register /> },
      { path: "library", element: <ProtectedRoute> <Library /></ProtectedRoute> },
      { path: "home", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "editProfile", element: <ProtectedRoute><EditProfileInfo /></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "dashboard", element: <ProtectedRoute> <Dashboard /></ProtectedRoute> },
      { path: "stories", element: <ProtectedRoute><Stories /></ProtectedRoute> },
      { path: "medicalTests/add", element: <ProtectedRoute><PostMedicalTest /></ProtectedRoute> },
      { path: "medicalTests/update/:id", element: <ProtectedRoute><UpdateMedicalTests /></ProtectedRoute> },
      { path: "appointments", element: <ProtectedRoute><AppointmentsList /></ProtectedRoute> },
      { path: "appointments/add", element: <ProtectedRoute><AddAppointment /></ProtectedRoute> },
      { path: "appointments/edit/:id", element: <ProtectedRoute><EditAppointment /></ProtectedRoute> },
      { path: "appointments/delete/:id", element: <ProtectedRoute><DeleteAppointment /></ProtectedRoute> },
      { path: "community/recipes", element: <ProtectedRoute><Recipe /></ProtectedRoute> },
      { path: "community/recipes/:id", element: <ProtectedRoute><RecipeDetail /></ProtectedRoute> },
      { path: "createPost", element: <ProtectedRoute><CreatePost /></ProtectedRoute> },
      { path: "medicalTests", element: <ProtectedRoute><MedicalTests /></ProtectedRoute> },
      { path: "herbDetails/:id", element: <HerbDetails /> },
      { path: "chatbot", element: <ProtectedRoute><Chatbot /></ProtectedRoute> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

export default function App() {
  return <>
    <UserContextProvider>
      <RouterProvider router={routers} />
      <Toaster position="top-right" reverseOrder={false}/>
    </UserContextProvider>

  </>
}
