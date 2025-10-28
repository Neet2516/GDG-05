import React from 'react'
import logo from "../../assets/logo.png";

function Header() {
  return (
    <>
    <div className='bg-[#EBA386] w-full flex items-center justify-between h-[10vh]'>
    <img src={logo} alt="" className='h-full' />
    <ul className='hidden md:flex  items-center justify-evenly gap-10'>
      <li>About Us</li>
      <li>App</li>
      <button>{`Create ->`}</button>
    </ul>

    

    </div>
    </>
  )
}

export default Header
