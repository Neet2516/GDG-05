import React from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import survey from '../../assets/SurveyPage/survey.png'

const SYMPTOM_OPTIONS = [
  "fever", "cough", "sore_throat", "runny_nose", "breath_shortness", "fatigue",
    "headache", "body_pain", "appetite_loss", "nausea", "stomach_pain",
    "sleep_quality", "mood_swings", "anxiety", "irritability", "concentration_loss"
];

const SymptomStep = ({ data, updateData, onNext, onBack }) => {
  // Handler for Checkbox changes
  const handleSymptomChange = (symptom) => {
    const isSelected = data.symptoms.includes(symptom);
    
    // Toggle symptom selection
    const newSymptoms = isSelected
      ? data.symptoms.filter(s => s !== symptom)
      : [...data.symptoms, symptom];

    updateData('symptoms', newSymptoms);
  };

  // Helper for rendering checkboxes in two columns
  const renderCheckboxes = () => {
    const half = Math.ceil(SYMPTOM_OPTIONS.length / 2);
    const col1 = SYMPTOM_OPTIONS.slice(0, half);
    const col2 = SYMPTOM_OPTIONS.slice(half);

    const renderColumn = (column) => (
      <div className="space-y-4">
        {column.map(symptom => (
          <label key={symptom} className="flex items-center text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={data.symptoms.includes(symptom)}
              onChange={() => handleSymptomChange(symptom)}
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-3">{symptom}</span>
          </label>
        ))}
      </div>
    );

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {renderColumn(col1)}
        {renderColumn(col2)}
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row items-start">
      <div className="w-full lg:w-3/5">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Select any symptoms you're experiencing today
        </h2>

        {/* Symptom Checkboxes */}
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          {renderCheckboxes()}
        </div>

        {/* Other Symptom Input (Dropdown placeholder) */}
        <div className="flex items-center mb-10">
          <label htmlFor="other-symptom" className="text-lg text-gray-800 mr-4 font-medium">
            Other symptom (if any) :
          </label>
          {/* Using a simple text input for demo, but can be a custom searchable dropdown */}
          <input
            id="other-symptom"
            type="text"
            placeholder="Type here..."
            value={data.otherSymptom}
            onChange={(e) => updateData('otherSymptom', e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 grow max-w-xs"
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

export default SymptomStep;