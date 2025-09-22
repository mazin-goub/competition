import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { userContext } from "../../context/UserContext";
import Logout from "../Logout/Logout";

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
    `flex items-center gap-2 px-2 py-1 rounded transition focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-dark)] ${
      isActive
        ? "text-white font-semibold bg-[var(--color-primary-light)]"
        : "hover:text-white"
    }`;

  const AuthLinks = () => (
    <div className="flex gap-4">
      <NavLink to="/" className="text-black">
        Register
      </NavLink>
      <NavLink to="/login" className="text-black">
        Login
      </NavLink>
    </div>
  );

  return (
    <nav className="bg-[var(--color-primary)]/70 backdrop-blur-md fixed top-0 inset-x-0 z-50 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink
          to="/"
          className="text-2xl font-bold text-[var(--color-secondary)] flex items-center gap-2"
        >
          <i className="fa-solid fa-leaf"></i> عشبة شفاء
        </NavLink>

        {userTokenAccess && (
          <ul className="hidden md:flex gap-6 text-[var(--color-secondary)] font-medium">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} end={item.end} className={linkClass}>
                  <i className={`fa-solid ${item.icon}`}></i> {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        {userTokenAccess ? <Logout /> : <AuthLinks />}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden cursor-pointer text-[var(--color-secondary)] focus:outline-none text-2xl"
        >
          <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[var(--color-primary)] text-[var(--color-secondary)] px-6 py-4 space-y-4 animate-slideDown">
          {userTokenAccess &&
            navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                <i className={`fa-solid ${item.icon}`}></i> {item.label}
              </NavLink>
            ))}

          {userTokenAccess ? <Logout /> : <AuthLinks />}
        </div>
      )}
    </nav>
  );
}
