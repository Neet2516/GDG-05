import React, { useState, useEffect } from 'react';
import {
  Footprints, Bed, Droplet, Flame, HeartPulse, Scale, Activity,
  Pill, LineChart, FileText, Dumbbell, Bell, Brain
} from 'lucide-react';

// --- Dashboard Helper Components ---

const ProgressCircle = ({ percentage, score, label, detail }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  let color = 'text-blue-500';
  let ringColor = 'stroke-blue-500';
  if (score >= 80) {
    color = 'text-green-500';
    ringColor = 'stroke-green-500';
  } else if (score >= 60) {
    color = 'text-yellow-500';
    ringColor = 'stroke-yellow-500';
  } else {
    color = 'text-red-500';
    ringColor = 'stroke-red-500';
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-gray-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="64"
            cy="64"
          />
          <circle
            className={`${ringColor} transition-all duration-700 ease-out`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="64"
            cy="64"
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-gray-800">{score}</span>
          <span className="text-xs text-gray-500">/100</span>
        </div>
      </div>
      <p className={`mt-2 text-sm font-semibold ${color}`}>{label}</p>
      <p className="text-xs text-gray-500 text-center mt-1 max-w-xs">{detail}</p>
    </div>
  );
};

const MetricCard = ({ title, value, unit, change, icon, iconBg }) => (
  <div className="p-4 sm:p-5 bg-white rounded-xl shadow-lg flex flex-col justify-between h-full">
    <div className="flex justify-between items-start">
      <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
      <div className={`p-2 rounded-full ${iconBg} text-white`}>
        {icon}
      </div>
    </div>

    <div className="mt-4">
      <p className="text-3xl sm:text-4xl font-extrabold text-gray-800">
        {value}
        <span className="text-lg font-medium ml-1 text-gray-600">{unit}</span>
      </p>
      {change && (
        <div className={`flex items-center text-xs mt-1 ${change.startsWith('↑') ? 'text-green-600' : 'text-red-600'}`}>
          {change} from yesterday
        </div>
      )}
    </div>
  </div>
);

const HealthCard = ({ title, children, className = '' }) => (
  <div className={`p-5 bg-white rounded-xl shadow-lg ${className}`}>
    <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
    {children}
  </div>
);

// --- Main Trends Page Component ---
const TrendsPage = ({ setPage }) => {
  const [formData, setFormData] = useState({});
  const [trendsData, setTrendsData] = useState({});

  // Load from localStorage on mount + listen for changes
  useEffect(() => {
    const loadData = () => {
      setFormData(JSON.parse(localStorage.getItem("Form")) || {});
      setTrendsData(JSON.parse(localStorage.getItem("Trends")) || {});
    };

    loadData(); // Initial load

    // Listen to localStorage changes across tabs
    window.addEventListener("storage", loadData);
    return () => window.removeEventListener("storage", loadData);
  }, []);

  // Rebuild dashboard data dynamically
  const DASHBOARD_DATA = {
    name: formData?.name || "Guest",
    greeting: "Your latest health analysis is ready.",
    metrics: formData?.stepsWalked ? [
      { title: "STEPS TODAY", value: parseInt(formData.stepsWalked).toLocaleString(), unit: 'steps', change: '↑ 12 %', icon: <Footprints className="h-5 w-5" />, iconBg: 'bg-blue-500' },
      { title: "SLEEP DURATION", value: formData.sleepHours, unit: 'hrs', change: '↑ 3 %', icon: <Bed className="h-5 w-5" />, iconBg: 'bg-indigo-500' },
      { title: "WATER INTAKE", value: formData.waterIntake, unit: 'glasses', change: '↓ 12 %', icon: <Droplet className="h-5 w-5" />, iconBg: 'bg-cyan-500' },
      { title: "CALORIE INTAKE", value: parseInt(formData.calorieIntake).toLocaleString(), unit: 'kcal', change: '↑ 10 %', icon: <Flame className="h-5 w-5" />, iconBg: 'bg-red-500' },
    ] : [],
    healthScore: { score: 88, label: "Excellent", detail: "Excellent metrics across the board, focusing on gut health is key." },
    symptoms: formData?.symptoms ? [
      { name: formData.symptoms[0]?.replace('_', ' '), severity: formData.severity, duration: `${formData.durationDays} days` }
    ] : [],
    vitals: formData?.averageHeartRate ? [
      { title: "Heart rate", value: formData.averageHeartRate, unit: 'bpm', icon: <HeartPulse className="h-5 w-5" /> },
      { title: "BMI", value: formData.bmi, unit: 'kg/m²', icon: <Scale className="h-5 w-5" /> },
    ] : [],
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-blue-50 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <header className="py-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-800 flex items-center">
            <Activity className="mr-3 text-yellow-500 h-8 w-8" /> Hello {DASHBOARD_DATA.name}
          </h1>
          <p className="text-lg text-gray-600 mt-1">{DASHBOARD_DATA.greeting}</p>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {DASHBOARD_DATA.metrics.map((m, index) => (
            <MetricCard key={index} {...m} />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

          {/* Health Score */}
          <HealthCard title="Overall Health Score" className="lg:col-span-1 flex flex-col items-center justify-center">
            <ProgressCircle
              percentage={DASHBOARD_DATA.healthScore.score}
              score={DASHBOARD_DATA.healthScore.score}
              label={DASHBOARD_DATA.healthScore.label}
              detail={DASHBOARD_DATA.healthScore.detail}
            />
          </HealthCard>

          {/* Symptoms */}
          <HealthCard title="Current Symptoms" className="lg:col-span-1">
            {DASHBOARD_DATA.symptoms.length > 0 ? (
              <>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium shadow-inner">
                    {DASHBOARD_DATA.symptoms[0].name}
                  </span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                    {DASHBOARD_DATA.symptoms[0].severity?.toUpperCase()}
                  </span>
                </div>
                <div className="flex space-x-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center"><Pill className="mr-1 h-4 w-4" /> Duration:</span>
                  <span className="font-semibold text-gray-700">{DASHBOARD_DATA.symptoms[0].duration}</span>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-sm">No symptoms recorded yet.</p>
            )}
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-300">
              Update symptoms
            </button>
          </HealthCard>

          {/* Health Analysis */}
          <HealthCard title="Health Analysis & Recommendation" className="lg:col-span-1">
            {trendsData?.data ? (
              <div className="space-y-4">
                <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded-lg">
                  <p className="text-sm font-semibold text-green-700 mb-1">Overall Health Trend</p>
                  <p className="text-2xl font-extrabold text-green-800 flex items-center">
                    {trendsData?.data?.model_1?.prediction || "No data"}
                    <LineChart className="ml-2 h-6 w-6" />
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Confidence: {trendsData?.data?.model_1?.confidence ? Math.round(trendsData.data.model_1.confidence * 100) : 0}%
                  </p>
                </div>

                <div className="p-3 bg-purple-50 border-l-4 border-purple-500 rounded-lg">
                  <p className="text-sm font-semibold text-purple-700 mb-1">Personalized Wellness Focus</p>
                  <p className="text-2xl font-extrabold text-purple-800 flex items-center">
                    {trendsData?.data?.model_2?.prediction || "No data"}
                    <Brain className="ml-2 h-6 w-6" />
                  </p>
                  <p className="text-xs text-purple-600 mt-1">Suggested by Wellness Model</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No trends data available yet.</p>
            )}

            <button className="mt-4 w-full text-blue-600 font-semibold flex items-center justify-center hover:text-blue-800">
              <FileText className="mr-2 h-5 w-5" /> View Full Log ({DASHBOARD_DATA.name || "User"}'s Entry)
            </button>
          </HealthCard>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <HealthCard title="Recent Vitals (today's)" className="md:col-span-1">
            <div className="space-y-4">
              {DASHBOARD_DATA.vitals.map((v, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl text-blue-600">{v.icon}</span>
                    <span className="font-medium text-gray-700">{v.title}</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {v.value}
                    <span className="text-base text-gray-500 ml-1">{v.unit}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-gray-400">
              User ID: {trendsData?.user || "N/A"}
            </div>
          </HealthCard>

          <HealthCard title="Quick Actions" className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="flex items-center justify-center p-4 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition-colors shadow-md">
                <FileText className="mr-2 text-xl" /> Log New Metrics
              </button>
              <button className="flex items-center justify-center p-4 bg-yellow-100 text-yellow-700 rounded-lg font-semibold hover:bg-yellow-200 transition-colors shadow-md">
                <Bell className="mr-2 text-xl" /> Manage Reminders
              </button>
              <button className="flex items-center justify-center p-4 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition-colors shadow-md">
                <LineChart className="mr-2 text-xl" /> View Trends
              </button>
              <button className="flex items-center justify-center p-4 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-colors shadow-md">
                <Dumbbell className="mr-2 text-xl" /> Daily Wellness Check
              </button>
            </div>
          </HealthCard>
        </div>
      </div>
    </div>
  );
};

export default TrendsPage;
