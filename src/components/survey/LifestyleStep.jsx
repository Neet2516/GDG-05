import React from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import survey from '../../assets/SurveyPage/survey.png'
// Helper component for a single Radio Row
const RadioRow = ({ label, name, options, selectedValue, onChange }) => {
  // Use a unique ID for each row to link label to inputs
  const id = name.toLowerCase().replace(/[^a-z0-9]/g, ''); 

  return (
    <div className="py-4 border-b border-gray-200">
      <label htmlFor={id} className="text-lg text-gray-800 mb-2 block sm:inline-block sm:w-1/4">
        {label}
      </label>
      <div className="flex flex-wrap sm:inline-flex sm:space-x-8 mt-2 sm:mt-0 sm:ml-4">
        {options.map(option => (
          <label key={option.value} className="flex items-center mr-6 cursor-pointer text-gray-700">
            <input
              type="radio"
              name={name}
              id={`${id}-${option.value}`}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(name, option.value)}
              className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const LifestyleStep = ({ data, updateData, onNext, onBack }) => {
  // Define options for each category
  const dietOptions = [
    { label: 'Vegan', value: 'Vegan' },
    { label: 'Vegetarian', value: 'Vegetarian' },
    { label: 'Non vegetarian', value: 'Non-vegetarian' },
  ];

  const qualityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Normal', value: 'Normal' },
    { label: 'High', value: 'High' },
  ];
  
  const simpleOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  
  const alcoholOptions = [
    { label: 'Occasionally', value: 'Occasionally' },
    { label: 'Regularly', value: 'Regularly' },
    { label: 'Never', value: 'Never' },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start">
      <div className="w-full lg:w-3/5">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Select what describes you
        </h2>
        <p className="text-blue-600 mb-6">Select one answer for each statement</p>

        {/* Lifestyle Questionnaire */}
        <div className="border-t border-gray-200">
          <RadioRow
            label="Diet type"
            name="diet"
            options={dietOptions}
            selectedValue={data.diet}
            onChange={updateData}
          />
          <RadioRow
            label="Sleep quality"
            name="sleep"
            options={qualityOptions}
            selectedValue={data.sleep}
            onChange={updateData}
          />
          <RadioRow
            label="Hydration level"
            name="hydration"
            options={qualityOptions}
            selectedValue={data.hydration}
            onChange={updateData}
          />
          <RadioRow
            label="Stress level"
            name="stress"
            options={qualityOptions}
            selectedValue={data.stress}
            onChange={updateData}
          />
          <RadioRow
            label="Smoking"
            name="smoking"
            options={simpleOptions}
            selectedValue={data.smoking}
            onChange={updateData}
          />
          <RadioRow
            label="Alcohol intake"
            name="alcohol"
            options={alcoholOptions}
            selectedValue={data.alcohol}
            onChange={updateData}
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
            onClick={onNext}
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

export default LifestyleStep;