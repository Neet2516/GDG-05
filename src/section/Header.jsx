import React, { useState, useCallback, useEffect } from 'react';

const Header = ({ setView }) => {
    const navItemClass = "text-gray-700 hover:text-orange-600 transition-colors cursor-pointer";
    const loginBtnClass = "px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-all flex items-center";
    const HeartPulseIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        <path d="M3.22 10H8l2.77-6.23a.91.91 0 0 1 1.79 0L15 10h4.78"/>
    </svg>
);

    return (
        <header className="fixed top-0 left-0 w-full z-10 bg-orange-300/80 shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center space-x-2">
                    <HeartPulseIcon className="w-6 h-6 text-gray-700" />
                    <span className="text-xl font-bold text-gray-700">HealthSnap</span>
                </div>

                {/* Navigation and Actions */}
                <nav className="flex items-center space-x-4 sm:space-x-6">
                    <span className="hidden md:inline-block" onClick={() => console.log('Nav: About us')}><a href="#" className={navItemClass}>About us</a></span>
                    <span className="hidden md:inline-block" onClick={() => console.log('Nav: App')}><a href="#" className={navItemClass}>App</a></span>
                    <button className={`${loginBtnClass} hidden sm:flex`} onClick={() => setView(VIEWS.LOGIN)}>
                        Login &rarr;
                    </button>
                    <button className={`${loginBtnClass} bg-indigo-500!`} onClick={() => setView(VIEWS.SIGNUP)}>
                        Sign Up &rarr;
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header
