import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { userContext } from "../../context/UserContext";
import Logout from "../Logout/Logout";
import subLogo from '../../assets/sub-logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let { userTokenAccess } = useContext(userContext);

  const navItems = [
    { path: "/home", label: "الرئيسية", icon: "fa-house", end: true },
    { path: "/dashboard", label: "لوحة التحكم", icon: "fa-gauge" },
    { path: "/appointments", label: "المواعيد", icon: "fa-calendar-days" },
    { path: "/library", label: "المكتبة", icon: "fa-book" },
    { path: "/stories", label: "القصص التراثية", icon: "fa-feather" },
    { path: "/community/recipes", label: "المجتمع", icon: "fa-users" },
    { path: "/medicalTests", label: "التحاليل", icon: "fa-test" },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-lg ${
      isActive
        ? "bg-emerald-600 text-white shadow-lg"
        : "text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800"
    }`;

  const AuthLinks = () => (
    <div className="flex gap-4">
      <NavLink to="/" className="bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition-all duration-300 font-semibold">
        Register
      </NavLink>
      <NavLink to="/login" className="bg-emerald-100 text-emerald-700 px-6 py-2 rounded-xl hover:bg-emerald-200 transition-all duration-300 font-semibold">
        Login
      </NavLink>
    </div>
  );

  return (
    <nav className="bg-[#f1f2ec] backdrop-blur-lg fixed top-0 inset-x-0 z-50 shadow-sm border-b border-emerald-100">
      <div className=" mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink
          to="/"
          className="text-2xl font-bold text-emerald-700 flex items-center gap-3"
        >
          <img src={subLogo} alt="" style={{width: '170px', height: '50px'}}/>
        </NavLink>

        {userTokenAccess && (
          <ul className="hidden md:flex gap-2 font-medium">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} end={item.end} className={linkClass}>
                  <i className={`fa-solid ${item.icon}`}></i> {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        <div className="hidden md:block">
          {userTokenAccess ? <Logout /> : <AuthLinks />}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden cursor-pointer text-emerald-700 focus:outline-none text-2xl bg-emerald-100 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-emerald-200 transition-all duration-300"
        >
          <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-emerald-100 px-6 py-4 space-y-2 animate-slideDown">
          {userTokenAccess &&
            navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-lg ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "text-emerald-700 hover:bg-emerald-100"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <i className={`fa-solid ${item.icon}`}></i> {item.label}
              </NavLink>
            ))}

          <div className="pt-4 border-t border-emerald-100">
            {userTokenAccess ? <Logout /> : <AuthLinks />}
          </div>
        </div>
      )}
    </nav>
  );
}