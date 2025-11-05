import React from 'react';
import { FaUser, FaVenusMars, FaCalendarAlt, FaRulerVertical, FaWeight, FaGlobe } from 'react-icons/fa';
import survey from '../../assets/SurveyPage/survey.png'

// Helper component for radio button groups
const RadioGroup = ({ label, name, options, selectedValue, onChange }) => (
  <div className="flex items-center space-x-6 text-gray-700">
    <span className="font-medium mr-4">{label}:</span>
    {options.map(option => (
      <label key={option.value} className="flex items-center cursor-pointer">
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={() => onChange(option.value)}
          className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <span className="ml-2">{option.label}</span>
      </label>
    ))}
  </div>
);

const PersonalInfoStep = ({ data, updateData, onNext }) => {
  // Simple check for required fields before enabling next button
  const isFormValid = data.name && data.gender && data.dob && data.height && data.weight && data.country;

  // Gender options
  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start">
      <div className="w-full lg:w-3/5">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          For better tracking, please provide few details about you
        </h2>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Name */}
          <div className="flex items-center">
            <FaUser className="text-xl text-gray-500 mr-4" />
            <span className="w-24 text-gray-700 font-medium">Your Name</span>
            <input
              type="text"
              placeholder="Enter name"
              value={data.name}
              onChange={(e) => updateData('name', e.target.value)}
              className="grow p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Gender */}
          <div className="flex items-center">
            <FaVenusMars className="text-xl text-gray-500 mr-4" />
            <span className="w-24 text-gray-700 font-medium">Gender</span>
            <RadioGroup
              name="gender"
              options={genderOptions}
              selectedValue={data.gender}
              onChange={(value) => updateData('gender', value)}
            />
          </div>

          {/* Date of Birth (Simplified for demo) */}
          <div className="flex items-center">
            <FaCalendarAlt className="text-xl text-gray-500 mr-4" />
            <span className="w-24 text-gray-700 font-medium">Date of Birth</span>
            <input
              type="date"
              value={data.dob}
              onChange={(e) => updateData('dob', e.target.value)}
              className="grow p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Height */}
          <div className="flex items-center">
            <FaRulerVertical className="text-xl text-gray-500 mr-4" />
            <span className="w-24 text-gray-700 font-medium">Height</span>
            <input
              type="number"
              placeholder="Enter height in cm"
              value={data.height}
              onChange={(e) => updateData('height', e.target.value)}
              className="grow p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Weight */}
          <div className="flex items-center">
            <FaWeight className="text-xl text-gray-500 mr-4" />
            <span className="w-24 text-gray-700 font-medium">Weight</span>
            <input
              type="number"
              placeholder="Enter weight in Kg"
              value={data.weight}
              onChange={(e) => updateData('weight', e.target.value)}
              className="grow p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Country */}
          <div className="flex items-center">
            <FaGlobe className="text-xl text-gray-500 mr-4" />
            <span className="w-24 text-gray-700 font-medium">Country</span>
            <input
              type="text"
              placeholder="Enter your country"
              value={data.country}
              onChange={(e) => updateData('country', e.target.value)}
              className="grow p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

        </div>

        {/* Navigation Button */}
        <div className="mt-10 flex justify-start">
          <button
            onClick={onNext}
            disabled={!isFormValid} // Disable button until form is valid
            className={`flex items-center px-8 py-3 text-lg font-semibold rounded-full transition-colors duration-300 ${
              isFormValid 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next &rarr;
          </button>
        </div>
      </div>

      {/* Doctor/Illustration Section */}
      <div className="hidden lg:block lg:w-2/5 mt-8 lg:mt-0 lg:pl-10">
              <img src={survey} alt="" />
              </div>
    </div>
  );
};

export default PersonalInfoStep;