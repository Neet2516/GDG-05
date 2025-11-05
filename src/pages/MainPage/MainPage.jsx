import React from 'react'
import Dashimg from './image.png'
function MainPage() {
  return (
    <div className='md:flex'>
        <div className=' text-[#333333] font-semibold text-4xl w-full md:w-1/2 flex flex-col md:px-30 justify-center'> 
        
        <div className='w-2/3'>Stop guessing start understanding your body's <span className='text-blue-600'>patterns</span>
        </div>
        <div>
            <ul className=' mt-5 text-sm text-black[list-style-image]'>
                <li className='flex'><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-black  mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>Log your Data, Effortlessly</li>
                <li className='flex'><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-black  mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>Uncover Hidden trends with AI</li>
                <li className='flex'><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-black  mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>Stay on Track with Smart Reminders</li>
                <li className='flex'><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-black  mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>Receive Personalized Wellness Tips
</li></ul>
<button className='bg-blue-600 text-[1rem] rounded px-3 py-3 text-white  flex items-center justify-center gap-5 mt-5 '><span>Start Tracking</span><svg width="15" height="10" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 6.5H1M19 6.5L13.4615 1M19 6.5L13.4615 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</button>
</div>
        
        
    </div>
        <div className='md:w-1/2 '><img className="md:h-150 w-150" src={Dashimg}  alt="" /></div>
      
    </div>
  )
}

export default MainPage
