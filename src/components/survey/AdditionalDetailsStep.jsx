import React from 'react';
import { MdChatBubble, MdArrowBack, MdArrowForward } from 'react-icons/md';
import survey from '../../assets/SurveyPage/survey.png'

const AdditionalDetailsStep = ({ data, updateData, onNext, onBack }) => {
  // Handler for text area changes
  const handleTextChange = (e) => {
    updateData('additionalDetails', e.target.value);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start">
      <div className="w-full lg:w-3/5">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <MdChatBubble className="text-blue-600 mr-3" /> Any other details we should know?
        </h2>

        {/* Text Area Input */}
        <div className="mb-10 p-4 border border-gray-300 rounded-lg">
          <p className="text-sm text-gray-500 mb-2 flex items-center">
            <span className="text-green-500 mr-2">✓</span> Please describe any unique details that make them better or worse (e.g., 'worse in the morning,' 'happens after exercise')
          </p>
          <textarea
            value={data.additionalDetails}
            onChange={handleTextChange}
            rows="6"
            placeholder="Type your details here..."
            className="w-full p-3 text-gray-700 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
          ></textarea>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex justify-between items-center">
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 px-4 py-2"
          >
            Skip
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

export default AdditionalDetailsStep;