import React, { useState, useEffect } from 'react';
import logo from "../../assets/logo.png";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Initialize login state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const userDetails = JSON.parse(localStorage.getItem("UserPersonalDetails")) || {};
    console.log(userDetails.Login);
    return userDetails.Login === true;
  });

  // 🔹 Optional: Watch for changes in localStorage (e.g., after login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      const userDetails = JSON.parse(localStorage.getItem("UserPersonalDetails")) || {};
      setIsLoggedIn(userDetails.Login === true);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <div className='bg-linear-to-r from-[#81d5fd] to-[#43c4ff] w-full flex items-center justify-between h-[10vh]'>
        <img src={logo} alt="" className='ml-10 h-3/4' />

        <ul className='hidden md:flex items-center justify-evenly gap-10 mr-3'>
          
          {/* 🏠 Home */}
          <NavLink
            to={isLoggedIn ? "/dashboard" : "#"}
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                alert("Please log in to access the survey!");
              } else {
                navigate("/dashboard");
              }
            }}
            style={{
              color: location.pathname === "/dashboard" ? "#60A5FA" : "inherit",
            }}
            className="font-medium hover:text-blue-400"
          >
            Home
          </NavLink>

          {/* 📋 Tracking */}
          <NavLink
            to={isLoggedIn ? "/survey" : "#"}
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                alert("Please log in to access the survey!");
              } else {
                navigate("/survey");
              }
            }}
            style={{
              color: location.pathname === "/survey" ? "#60A5FA" : "inherit",
            }}
            className="font-medium hover:text-blue-400"
          >
            Tracking
          </NavLink>

          {/* ⏰ Reminder */}
          <NavLink
            to={isLoggedIn ? "/reminders" : "#"}
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                alert("Please log in to access the survey!");
              } else {
                navigate("/reminders");
              }
            }}
            style={{
              color: location.pathname === "/reminders" ? "#60A5FA" : "inherit",
            }}
            className="font-medium hover:text-blue-400"
          >
            Reminder
          </NavLink>

          {/* 📊 Trends */}
          <NavLink
            to={isLoggedIn ? "/trends" : "#"}
            onClick={(e) => {
              const formData = localStorage.getItem("Form");
              const trendsData = localStorage.getItem("Trends");

              if (!isLoggedIn) {
                e.preventDefault();
                alert("⚠️ Please log in to access the dashboard!");
                return;
              }

              if (!formData) {
                e.preventDefault();
                alert("📝 Please complete the health form first!");
                return;
              }

              if (!trendsData) {
                e.preventDefault();
                alert("📊 No trend data found! Please submit your form to generate analysis.");
                return;
              }

              navigate("/trends");
            }}
            style={{
              color: location.pathname === "/trends" ? "#60A5FA" : "inherit",
            }}
            className="font-medium hover:text-blue-400 transition-colors"
          >
            Trends
          </NavLink>

          {/* ℹ️ About Us */}
          <NavLink
            to={isLoggedIn ? "/aboutus" : "#"}
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                alert("Please log in to access the survey!");
              } else {
                navigate("/aboutus");
              }
            }}
            style={{
              color: location.pathname === "/aboutus" ? "#60A5FA" : "inherit",
            }}
            className="font-medium hover:text-blue-400"
          >
            AboutUs
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default Header;
