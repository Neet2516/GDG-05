import React from 'react';
import { FaQuestionCircle, FaClock, FaCheck } from 'react-icons/fa';
import survey from '../../assets/SurveyPage/survey.png'

const SeverityCard = ({ level, description, colorClass, isSelected, onClick }) => (
  <button
    onClick={() => onClick(level)}
    className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 w-full text-center transition-all duration-300 transform hover:scale-[1.03] 
      ${isSelected 
        ? `border-blue-600 shadow-xl ring-4 ring-blue-200 bg-white` 
        : 'border-gray-200 bg-gray-50 hover:bg-white'}
    `}
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl mb-2 
      ${colorClass}`}>
      {isSelected ? <FaCheck /> : '?'}
    </div>
    <h4 className="text-lg font-semibold text-gray-800">{level}</h4>
    <p className="text-sm text-gray-500 mt-1">{description}</p>
  </button>
);

const SymptomSeverityStep = ({ data, updateData, onNext, onBack }) => {
  const handleSeveritySelect = (level) => {
    updateData('severity', level);
  };

  // Duration options
  const durationOptions = Array.from({ length: 30 }, (_, i) => i + 1);

  const isFormValid = data.severity && data.durationDays;

  return (
    <div className="flex flex-col lg:flex-row items-start">
      <div className="w-full lg:w-3/5">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center">
          <FaQuestionCircle className="text-blue-600 mr-3" /> Symptom Severity
        </h2>
        <p className="text-gray-600 mb-8">select the level that best describes your symptom</p>

        {/* Severity Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <SeverityCard
            level="None"
            description="No symptoms"
            colorClass="bg-green-500"
            isSelected={data.severity === 'None'}
            onClick={handleSeveritySelect}
          />
          <SeverityCard
            level="Mild"
            description="Slight discomfort"
            colorClass="bg-yellow-500"
            isSelected={data.severity === 'Mild'}
            onClick={handleSeveritySelect}
          />
          <SeverityCard
            level="Moderate"
            description="Noticeable symptoms"
            colorClass="bg-orange-500"
            isSelected={data.severity === 'Moderate'}
            onClick={handleSeveritySelect}
          />
          <SeverityCard
            level="Severe"
            description="Significant symptoms"
            colorClass="bg-red-500"
            isSelected={data.severity === 'Severe'}
            onClick={handleSeveritySelect}
          />
        </div>

        {/* Duration Input */}
        <div className="flex items-center mb-10">
          <FaClock className="text-2xl text-gray-500 mr-4" />
          <span className="text-xl font-medium text-gray-800 mr-4">Symptom Duration</span>
          
          <select
            value={data.durationDays}
            onChange={(e) => updateData('durationDays', parseInt(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg text-lg focus:ring-blue-500 focus:border-blue-500"
          >
            {durationOptions.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <span className="ml-2 text-lg text-gray-700">Days</span>
        </div>

        {/* Navigation Button */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={onNext}
            disabled={!isFormValid}
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
              <img src={survey} alt="" /></div>
    </div>
  );
};

export default SymptomSeverityStep;