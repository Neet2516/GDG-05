import React from 'react'

const SignupPage = ({ setView }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true);

        if (!formData.name || !formData.email || !formData.password) {
            setMessage({ type: 'error', text: "Please fill in all required fields." });
            setIsLoading(false);
            return;
        }

        setTimeout(() => {
            setIsLoading(false);
            setMessage({ type: 'success', text: 'Sign Up Successful! (Simulated). Redirecting to Login.' });
            setTimeout(() => setView(VIEWS.LOGIN), 2000);
        }, 2000);
    };

    useEffect(() => {
        if (message && message.type !== 'success') {
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-gray-700 placeholder-gray-400";

    return (
        <form onSubmit={handleSignup} className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl space-y-6">
            <div className="flex flex-col items-center space-y-2 mb-6">
                <HeartPulseIcon className="w-12 h-12 text-blue-600" />
                <h1 className="text-3xl font-extrabold text-gray-800">Create Account</h1>
                <p className="text-sm text-gray-500">Join HealthSnap now!</p>
            </div>

            {/* Message/Error Display */}
            {message && (
                <div className={`p-3 rounded-lg text-sm ${
                    message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {message.text}
                </div>
            )}

            {/* Name Input */}
            <div>
                <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} className={inputClass} required />
            </div>
            
            {/* Email Input */}
            <div>
                <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} className={inputClass} required />
            </div>

            {/* Password Input */}
            <div>
                <input type="password" name="password" placeholder="Password *" value={formData.password} onChange={handleChange} className={inputClass} required />
            </div>

            {/* Sign Up Button */}
            <button
                type="submit"
                className={`w-full py-3 font-semibold rounded-lg shadow-lg transition-all flex items-center justify-center space-x-2 ${
                    isLoading ? 'bg-indigo-400 text-white cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/50'
                }`}
                disabled={isLoading}
            >
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                ) : (
                    'Sign Up'
                )}
            </button>
            
            {/* Switch to Login */}
            <div className="text-center pt-4">
                <span className="text-sm text-gray-600">Already have an account? </span>
                <button
                    type="button"
                    onClick={() => setView(VIEWS.LOGIN)}
                    className="text-orange-500 hover:text-orange-600 font-semibold transition-colors"
                >
                    Log In
                </button>
            </div>
        </form>
    );
};

export default SignupPage
