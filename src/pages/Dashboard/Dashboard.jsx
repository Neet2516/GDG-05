import React from 'react';
import ActionCard from '../Dashboard/ActionCard'; // Assuming these are relative to the Dashboard.jsx location
import TipCard from '../Dashboard/TipCard';
import { useNavigate } from 'react-router-dom'; // Ensure you are using react-router-dom
import bottom from './bottom.png'

// Assuming your DashboardPage is in src/pages/Dashboard/Dashboard.jsx 
// and components are in src/pages/Dashboard/
const DashboardPage = () => {
  // Mock user data - could come from an API
  const userName = JSON.parse(localStorage.getItem("UserPersonalDetails")).Name;
  const navigate = useNavigate();

  // Mock tip data - could come from an API
  const currentTip = {
    id: 1,
    text: "Stay hydrated! Aim for 8 glass of water today",
    completed: false, 
  };

  const handleStartTracking = () => {
    navigate('/survey'); 
  };
  const handleSetReminder = () => {
    navigate('/reminders');
  };

  
  const handleViewTrends = () => {
  const isLoggedIn = localStorage.getItem("UserPersonalDetails");
  const formData = localStorage.getItem("Form");
  const trendsData = localStorage.getItem("Trends");

  if (!isLoggedIn) {
    alert("⚠️ Please log in to set reminders!");
    return;
  }

  if (!formData) {
    alert("📝 Please complete the health form before setting reminders!");
    return;
  }

  if (!trendsData) {
    alert("📊 Please generate your health trends first!");
    return;
  }

  // ✅ All good — navigate to reminders
  navigate("/trends");
};

  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      {/* Main content container with a subtle shadow and rounded corners */}
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10 z-10">
        {/* Abstract background shapes for visual appeal */}
        <div className="absolute -top-16 -left-16 w-48 h-50 bg-blue-200 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-200 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>

        <div className="mb-8 flex items-center flex-wrap overflow-hidden">
          <span className="text-4xl mr-3">👋</span> 
          <h1 className="text-3xl md:text-4xl font-bold  text-gray-800">
            Welcome, {userName}
          </h1>
        </div>

        {/* Tip Section (image_41254b.png) */}
        <div className="mb-10">
          <TipCard tip={currentTip} />
        </div>

        {/* Action Cards Section (image_41254b.png) */}
        <div className=" relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <ActionCard
            icon="📝" 
            title="Log New Data"
            description="Record symptoms, activities, mood"
            buttonText="Start Tracking"
            onClick={handleStartTracking} // Use the new handler
          />
          <ActionCard
            icon="🔔"
            title="Set a reminder"
            description="Schedule meds, appointments ..."
            buttonText="New Reminder"
            onClick={handleSetReminder} // Use the new handler
          />
          <ActionCard
            icon="📈"
            title="Check My Trends"
            description="hidden Pattern, recommendations"
            buttonText="View Insights"
            onClick={handleViewTrends} // Use the new handler
          />
          <img src={bottom} className="absolute bottom-[-45px] -right-16 h-50 w-50" alt="" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;