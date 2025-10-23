import React, { useState, useCallback, useEffect } from 'react';

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
const LoginPage = ({ setView }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            if (email === 'test@example.com' && password === 'password') {
                setMessage({ type: 'success', text: 'Login Successful! (Simulated)' });
            } else {
                setMessage({ type: 'error', text: 'Invalid credentials. (Simulated)' });
            }
        }, 1500);
    };

    const handleGoogleLogin = () => {
        setMessage({ type: 'info', text: 'Initiating "Continue with Google" (Simulated)' });
    };
    
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-gray-700 placeholder-gray-400";

    return (
        <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl space-y-6">
            <div className="flex flex-col items-center space-y-2 mb-6">
                <HeartPulseIcon className="w-12 h-12 text-blue-600" />
                <h1 className="text-3xl font-extrabold text-gray-800">HealthSnap</h1>
                <p className="text-sm text-gray-500">Sign in to your account</p>
            </div>

            {/* Message/Error Display */}
            {message && (
                <div className={`p-3 rounded-lg text-sm ${
                    message.type === 'success' ? 'bg-green-100 text-green-700' :
                    message.type === 'info' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                }`}>
                    {message.text}
                </div>
            )}

            {/* Email Input */}
            <div>
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    required
                />
            </div>

            {/* Password Input */}
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    required
                />
            </div>

            {/* Login Button */}
            <button
                type="submit"
                className={`w-full py-3 font-semibold rounded-lg shadow-lg transition-all flex items-center justify-center space-x-2 relative ${
                    isLoading ? 'bg-orange-400 text-white cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/50'
                }`}
                disabled={isLoading}
            >
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                ) : (
                    'Login'
                )}
                {/* Simulated 'slashed eye' icon from design */}
                <div className={`absolute right-4 ${isLoading ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                    <SlashIcon className="w-5 h-5 text-white"/>
                </div>
            </button>

            {/* Forgot Password Link */}
            <div className="text-center text-sm">
                <button
                    type="button"
                    onClick={() => setMessage({ type: 'info', text: 'Password reset flow initiated (Simulated)' })}
                    className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
                >
                    Forgot your password?
                </button>
            </div>

            {/* OR Separator */}
            <div className="flex items-center space-x-2 my-4">
                <div className="grow border-t border-gray-300"></div>
                <span className="shrink text-sm text-gray-500 font-medium">OR</span>
                <div className="grow border-t border-gray-300"></div>
            </div>

            {/* Continue with Google Button */}
            <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 border border-gray-300 bg-white text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-center space-x-3"
            >
                <GoogleIcon />
                <span>Continue with Google</span>
            </button>

            {/* Switch to Signup */}
            <div className="text-center pt-4">
                <span className="text-sm text-gray-600">Don't have an account? </span>
                <button
                    type="button"
                    onClick={() => setView(VIEWS.SIGNUP)}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                >
                    Sign Up
                </button>
            </div>
        </form>
    );
};
export default LoginPage
