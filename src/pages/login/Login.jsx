import React, { useState } from 'react'
import side from "./side.png"
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const user = JSON.parse(localStorage.getItem("UserPersonalDetails"));
  
  console.log(user)
    const [email,setEmail]=useState("");
    const navigate = useNavigate();
    const [password,setPassword]=useState("");
    const [showPassword,SetshowPassword]=useState(false);
    const handleSubmit = (event) => {
      event.preventDefault();
    };
    // Add this function inside the Login component, before the return statement

const handleLogin = async () => {
    try {
        const response = await fetch("https://healthsnap-68ry.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                "email": email,
                "password": password 
            }),
        });

        if (!response.ok) {
            // Handle HTTP errors (e.g., 401 Unauthorized, 404 Not Found)
            const err = await response.json();
            throw new Error(err.message || `Login failed with status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Login successful:", result); 
        
        // 🔑 Store the token/user data in Local Storage or Context/State
        localStorage.setItem("authToken", result.token); 
        localStorage.setItem(
  "UserPersonalDetails",
  JSON.stringify({ ...JSON.parse(localStorage.getItem("UserPersonalDetails")), Login: true })
);
        
        alert("Login successful!");
        navigate("/dashboard"); // Navigate on successful API response
    } catch (error) {
        console.error("Login Error:", error.message);
        alert(`Login Failed: ${error.message}`);
    }
};
  return (
    <div>
        <div className='mt-10 flex   items-center justify-center flex-wrap'>
                    
                <div className='relative'>
                    <img src={side} alt="" className='w-[screen] md:w-[50vw]'/>
                    <div className='absolute hidden md:block text-5xl text-blue-600 tracking-wide  font-semibold space-x-1  top-0'>Welcome , Health<br/>Enthusiast!</div>
                </div>
                <div className='flex flex-col mt-5 overflow-x-hidden  bg-[#F7F8F9] rounded w-4/5 md:w-2/5  shadow-gray-500 ' style={{ boxShadow: '-4px 0 6px rgba(0, 0, 0, 0.1)' }}>

                    <form  onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
                        <h1 className='text-[#4b4848ca] text-center text-2xl font-bold'>Login</h1>
                        <input value={email}
                        onChange={(e)=>{
                          setEmail(e.target.value);
                        }} className=' px-1 bg-[#E3E5E5] py-3 border rounded mt-10 w-3/4'  type="text" placeholder='Email Address'/>
                        <div className='  bg-[#E3E5E5] rounded border mt-10 w-3/4 flex'>
                        <input className=' px-1 bg-[#E3E5E5] py-3 rounded w-full' onChange={(e)=>{
                          setPassword(e.target.value);
                        }} type={showPassword ? "text" : "password" } placeholder='Password'/>

                        
        </div>
                        <button 
    className="bg-blue-600 text-white text-center py-2 my-10 w-3/4 font-bold active:bg-gray-500" 
    // Call the API function
    onClick={handleLogin} 
>
          Login</button>

                        <Link to="/register"><h1 className='text-center text-red-600 mb-10 '>Create a new account</h1></Link>

                        
                    </form>
                </div>
        </div>
      
    </div>
  )
}

export default Login
