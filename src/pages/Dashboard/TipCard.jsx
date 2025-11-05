import React from 'react';
import { FaLightbulb, FaCheckSquare } from 'react-icons/fa'; // Icons for lightbulb and checkmark

const TipCard = ({ tip }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start shadow-sm">
      <FaLightbulb className="text-yellow-500 text-2xl mr-3 mt-1 shrink-0" />
      <div className="grow">
        <h4 className="font-semibold text-blue-800 text-lg mb-1">Tip</h4>
        <p className="text-blue-700 text-base">{tip.text}</p>
      </div>
      {/* Optional: A checkmark if the tip can be marked as completed */}
      {tip.completed && (
        <FaCheckSquare className="text-green-500 text-2xl ml-3 shrink-0" />
      )}
    </div>
  );
};

export default TipCard;