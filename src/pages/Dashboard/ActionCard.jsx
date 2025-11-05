import React from 'react';
import { MdArrowForward } from 'react-icons/md'; // Example icon

const ActionCard = ({ icon, title, description, buttonText, onClick }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Icon */}
      <div className="text-4xl mb-4">
        {icon} {/* This can be an emoji or a React Icon component */}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-6 grow">
        {description}
      </p>

      {/* Button */}
      <button
        onClick={onClick}
        className="mt-auto flex items-center px-4 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
      >
        {buttonText} <MdArrowForward className="ml-2 text-lg" />
      </button>
    </div>
  );
};

export default ActionCard;