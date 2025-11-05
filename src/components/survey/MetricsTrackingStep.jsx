import React from 'react';
import { FaWalking, FaBed, FaHeartbeat, FaBalanceScale, FaTint, FaFire } from 'react-icons/fa';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import survey from '../../assets/SurveyPage/survey.png'

// Helper component for a single metric input field
const MetricInput = ({ icon: Icon, label, placeholder, unit, value, onChange, fieldName }) => {
  const handleChange = (e) => {
    // Allows empty string, or numerical values
    if (e.target.value === '' || /^\d*\.?\d*$/.test(e.target.value)) {
      onChange(fieldName, e.target.value);
    }
  };

  return (
    <div className="flex flex-col mb-6">
      <label className="text-base font-semibold text-gray-800 mb-1">{label}</label>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="text-gray-600 font-medium whitespace-nowrap">{unit}</span>
      </div>
    </div>
  );
};

const MetricsTrackingStep = ({ data, updateData, onNext, onBack }) => {

  const waterOptions = [
    { label: 'e.g., 2.5 litres or 8 glasses', value: '' },
    { label: 'Litres', value: 'Litres' },
    { label: 'Glasses', value: 'Glasses' },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start">
      <div className="w-full lg:w-3/5">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Fuel Your Progress : Enter Your Matrices for Personalized Advice
        </h2>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          
          {/* Steps Walked */}
          <MetricInput
            icon={FaWalking}
            label="Steps walked"
            placeholder="e.g., 7,500 steps today"
            unit="Steps"
            value={data.stepsWalked}
            onChange={updateData}
            fieldName="stepsWalked"
          />

          {/* Water Intake (with dropdown for unit) */}
          <div className="flex flex-col mb-6">
            <label className="text-base font-semibold text-gray-800 mb-1">Water Intake</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="e.g., 2.5 litres or 8"
                value={data.waterIntake}
                onChange={(e) => updateData('waterIntake', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                className="p-3 border border-gray-300 rounded-lg text-gray-600 font-medium focus:ring-blue-500 focus:border-blue-500"
                // Assuming we track the value only, not the unit for this demo
              >
                {waterOptions.map(option => (
                  <option key={option.label} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sleep Hours */}
          <MetricInput
            icon={FaBed}
            label="Sleep hours"
            placeholder="e.g., slept for 7 hours last night"
            unit="hours"
            value={data.sleepHours}
            onChange={updateData}
            fieldName="sleepHours"
          />

          {/* Average Heart Rate */}
          <MetricInput
            icon={FaHeartbeat}
            label="Average heart rate"
            placeholder="e.g., 70 bpm (beats per minute)"
            unit="bpm"
            value={data.averageHeartRate}
            onChange={updateData}
            fieldName="averageHeartRate"
          />

          {/* BMI */}
          <MetricInput
            icon={FaBalanceScale}
            label="BMI (Body mass index)"
            placeholder="e.g., 23.4 (Normal range)"
            unit="Kg/m²"
            value={data.bmi}
            onChange={updateData}
            fieldName="bmi"
          />

          {/* Calorie Intake */}
          <MetricInput
            icon={FaFire}
            label="Calorie Intake"
            placeholder="e.g., 1,950 kcal today"
            unit="kcal"
            value={data.calorieIntake}
            onChange={updateData}
            fieldName="calorieIntake"
          />

        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex space-x-4">
          <button
            onClick={onBack}
            className="flex items-center px-6 py-3 text-lg font-semibold rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-300"
          >
            <MdArrowBack className="mr-2" /> Back
          </button>
          <button
            onClick={onNext} // This button will trigger the final submission
            className="flex items-center px-8 py-3 text-lg font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
          >
            Next <MdArrowForward className="ml-2" />
          </button>
        </div>
      </div>

      {/* Doctor/Illustration Section */}
      <div className="hidden lg:block lg:w-2/5 mt-8 lg:mt-0 lg:pl-10"><img src={survey} alt="" />
              </div>
    </div>
  );
};

export default MetricsTrackingStep;