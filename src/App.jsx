import React, { useState, useCallback, useEffect } from 'react';
import Header from './section/Header';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const VIEWS = {
  LOGIN: 'login',
  SIGNUP: 'signup',
};

const HeartPulseIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        <path d="M3.22 10H8l2.77-6.23a.91.91 0 0 1 1.79 0L15 10h4.78"/>
    </svg>
);

const SlashIcon = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"/>
        <path d="m2 2 20 20"/>
    </svg>
);

const GoogleIcon = () => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.158,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.914,12,24,12c3.059,0,5.842,1.158,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,3.15,0.763,6.13,2.193,8.71l6.071-4.665C10.147,26.757,9,25.305,9,24C9,20.941,10.224,17.941,12.306,14.691z"/>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.789-2.02,13.315-5.266l-5.811-4.708C29.69,36.578,26.963,37.6,24,37.6c-5.247,0-9.761-3.535-11.385-8.312l-6.571,4.819C7.802,38.646,15.603,44,24,44z"/>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.612,2.392-1.928,4.425-3.64,6.012c-1.71,1.587-3.791,2.588-6.09,2.834c-0.178,0.024-0.355,0.048-0.533,0.071C33.329,38.452,40.158,32,40.158,24C40.158,21.821,39.69,19.897,38.995,18.117L43.611,20.083z"/>
    </svg>
);

const App = () => {
    const [currentView, setCurrentView] = useState(VIEWS.LOGIN);

    const renderView = useCallback(() => {
        switch (currentView) {
            case VIEWS.LOGIN:
                return <LoginPage setView={setCurrentView} />;
            case VIEWS.SIGNUP:
                return <SignupPage setView={setCurrentView} />;
            default:
                return <LoginPage setView={setCurrentView} />;
        }
    }, [currentView]);

    return (
        <div className="min-h-screen bg-gray-200 font-sans antialiased pt-16">
            <Header setView={setCurrentView} />
            <main className="flex items-center justify-center min-h-screen p-4">
                {renderView()}
            </main>
        </div>
    );
};
export default App;