import React from 'react';
import logo from "../../assets/logo.png";
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <>
    <div className='bg-linear-to-r from-blue-200 to-blue-700 w-full flex items-center justify-between h-[10vh]'>
    <img src={logo} alt="" className='h-full' />
    <ul className='hidden md:flex items-center justify-evenly gap-10'>
      <li>
        <NavLink to="/aboutus">About Us</NavLink>
      </li>
      <li>App</li>
      
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>

      <button>{`Create ->`}</button>
    </ul>
    </div>
    </>
  );
}

export default Header;