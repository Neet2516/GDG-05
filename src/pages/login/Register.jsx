import React, { useState } from 'react'
import google from './google.png'
import side from './side.png'

function Register() {
  
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log("Form submitted:", { name, email });
  };
  const [islogin,Setislogin]=useState(false)
  const [name ,Setname]=useState("");
  const [email ,Setemail]=useState("")
  const [password ,Setpassword]=useState("")
  const[confpass,Setconfpass]=useState("")
  
  return (
    <div className='mt-10 flex   items-center justify-center flex-wrap'>
            
        <div className='relative'>
            <img src={side} alt="" className='w-[screen] md:w-[50vw]'/>
            <div className='absolute text-5xl text-blue-600 tracking-wide  font-semibold space-x-1  top-0'>Welcome , Health<br/> Enthusiast!</div>
        </div>

        <div className='flex flex-col overflow-x-hidden  bg-[#F7F8F9] rounded w-4/5 md:w-2/5  shadow-gray-500 ' style={{ boxShadow: '-4px 0 6px rgba(0, 0, 0, 0.1)' }}>

            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
            <h1 className='text-[#4b4848ca] text-center text-2xl font-bold'>Create account</h1>
            <input className=' px-1 bg-[#E3E5E5] py-3 border rounded mt-10 w-3/4' type="text" placeholder='Full Name'onChange={(e) => Setname(e.target.value)} />
            <input className=' px-1 bg-[#E3E5E5] py-3 border rounded mt-10 w-3/4' type="text" placeholder='Email Address' onChange={(e) => Setemail(e.target.value)}/>
            <input className=' px-1 bg-[#E3E5E5] py-3 border rounded mt-10 w-3/4' type="password" placeholder='password' onChange={(e) => Setpassword(e.target.value)}/>
            <input className=' px-1 bg-[#E3E5E5] py-3 border rounded mt-10 w-3/4' type="text" placeholder='Confirm Password'onChange={(e) => Setconfpass(e.target.value)}/>
            <button
                    className="bg-blue-600 text-white text-center py-2 mt-10 w-3/4 font-bold"
                    onClick={() => {
                      
                      if (confpass === password) {
                        console.log(name, email, password);
                        
                        localStorage.setItem(
                          "PD",
                          JSON.stringify({
                            Login: islogin,
                            Name: name,
                            Email: email,
                            Password: password
                          })
                        );

                      
                        alert("Data saved to local storage!");
                      } else {
                        alert("Passwords do not match!");
                      }
                    }}
            >
              Create
            </button>

            <p className=' text-[0.8rem] text-center text-gray-500'>Already have an account? <span className='  text-orange-500'> Log in </span></p>
            <div className='text-gray-500 text-center '>-----------OR------------</div>
            <div className='flex  flex-wrap justify-center items-center text-center px-1 bg-[#E3E5E5] py-3 border rounded my-5 w-3/4 overflow-x-hidden'>
                <img src={google} alt=""  className='h-8'/>
                <div className='pl-2 text-[1rem] font-semibold text-gray-500'>Continue with Google</div>
            </div>
            </form>
            
            
        </div>
    </div>
  )
}

export default Register
