import React from 'react';
import logo from "../../assets/logo.png";
import { NavLink, useNavigate, useLocation} from 'react-router-dom';

function Header() {
  const userDetails = JSON.parse(localStorage.getItem("UserPersonalDetails")) || {};
  const isLoggedIn = userDetails.Login === true;

  const handleClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); // stop navigation
      alert("Please log in to access the survey!");
    } else {
      navigate("/survey");
    }
  };
  return (
    <>
    <div className='bg-linear-to-r from-[#81d5fd] to-[#43c4ff] w-full flex items-center justify-between h-[10vh]'>
    <img src={logo} alt="" className='ml-10 h-3/4' />
    <ul className='hidden md:flex items-center justify-evenly gap-10 mr-3'>
      
    <NavLink
      to={isLoggedIn ? "/dashboard" : "#"}
      onClick={(e) => {
        if (!isLoggedIn) {
          e.preventDefault(); // stop navigation
          alert("Please log in to access the survey!");
        } else {
          navigate("/dashboard");
        }
      }}
      style={{
        color: location.pathname === "/dashboard" ? "#60A5FA" : "inherit", // Tailwind's blue-400 hex
      }}
      className="font-medium hover:text-blue-400"
    >
      Home
    </NavLink>
        <NavLink
      to={isLoggedIn ? "/survey" : "#"}
      onClick={(e) => {
        if (!isLoggedIn) {
          e.preventDefault(); // stop navigation
          alert("Please log in to access the survey!");
        } else {
          navigate("/survey");
        }
      }}
      style={{
        color: location.pathname === "/survey" ? "#60A5FA" : "inherit", // Tailwind's blue-400 hex
      }}
      className="font-medium hover:text-blue-400"
    >
      Tracking
    </NavLink>
    <NavLink
      to={isLoggedIn ? "/reminders" : "#"}
      onClick={(e) => {
        if (!isLoggedIn) {
          e.preventDefault(); // stop navigation
          alert("Please log in to access the survey!");
        } else {
          navigate("/reminders");
        }
      }}
      style={{
        color: location.pathname === "/reminders" ? "#60A5FA" : "inherit", // Tailwind's blue-400 hex
      }}
      className="font-medium hover:text-blue-400"
    >
      Reminder
    </NavLink>
    <NavLink
      to={isLoggedIn ? "/trends" : "#"}
      onClick={(e) => {
        if (!isLoggedIn) {
          e.preventDefault(); 
          alert("Please log in to access the survey!");
        } else {
          navigate("/trends");
        }
      }}
      style={{
        color: location.pathname === "/trends" ? "#60A5FA" : "inherit", // Tailwind's blue-400 hex
      }}
      className="font-medium hover:text-blue-400"
    >
      Trends
    </NavLink>
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
        color: location.pathname === "/aboutus" ? "#60A5FA" : "inherit", // Tailwind's blue-400 hex
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