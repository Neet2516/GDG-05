import React, { useState } from 'react'
import side from "./side.png"

function Login() {
  const user = JSON.parse(localStorage.getItem("PD"));
  console.log(user)
    const [useremail,Setuseremail]="";
    const [password,Setpasword]=""
    const [showPassword,SetshowPassword]=useState(false);
    const handleSubmit = (event) => {
      event.preventDefault();
    };
  return (
    <div>
        <div className='mt-10 flex   items-center justify-center flex-wrap'>
                    
                <div className='relative'>
                    <img src={side} alt="" className='w-[screen] md:w-[50vw]'/>
                    <div className='absolute text-5xl text-blue-600 tracking-wide  font-semibold space-x-1  top-0'>Welcome , Health<br/> Enthusiast!</div>
                </div>
                <div className='flex flex-col overflow-x-hidden  bg-[#F7F8F9] rounded w-4/5 md:w-2/5  shadow-gray-500 ' style={{ boxShadow: '-4px 0 6px rgba(0, 0, 0, 0.1)' }}>

                    <form  onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
                        <h1 className='text-[#4b4848ca] text-center text-2xl font-bold'>Login</h1>
                        <input value={useremail}
                        onChange={(e)=>{
                          Setuseremail(e.target.value);
                        }} className=' px-1 bg-[#E3E5E5] py-3 border rounded mt-10 w-3/4'  type="text" placeholder='Email Address'/>
                        <div className='  bg-[#E3E5E5] rounded border mt-10 w-3/4 flex'>
                        <input className=' px-1 bg-[#E3E5E5] py-3 rounded w-full' onChange={(e)=>{
                          Setuseremail(e.target.value);
                        }} type={showPassword ? "text" : "password" } placeholder='Password'/>

                        <button
                          type="button"
                          id="toggle-password"
                          onClick={() => {
                              SetshowPassword(!(showPassword));
                          }}
                          className="pr-1"
                        >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3-11-7 1.02-2.04 2.64-3.8 4.66-4.9M3 3l18 18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
                        </button>
        </div>
                        <button className="bg-blue-600 text-white text-center py-2 my-10 w-3/4 font-bold" onClick={()=>{if (useremail === user.email) {
                          console.log("HEy")
                        } else {
                         console.log("DOOOOO") 
                        }}}>Login</button>
                    </form>
                </div>
        </div>
      
    </div>
  )
}

export default Login
