import React from 'react';

const StepIndicator = ({ steps, currentStepIndex }) => {
  return (
    <div className="flex items-center justify-between w-full relative">
      {/* Horizontal Line Connector */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 z-0"></div>

      {steps.map((step, index) => {
        const isCurrent = index === currentStepIndex;
        const isCompleted = index < currentStepIndex;

        return (
          <div key={step} className="flex flex-col items-center z-10 w-1/3">
            {/* Step Circle */}
            <div
              className={`w-4 h-4 rounded-full transition-all duration-300 ease-in-out ${
                isCompleted
                  ? 'bg-blue-600' // Completed color
                  : isCurrent
                  ? 'bg-blue-600 ring-4 ring-blue-300' // Current color with ring
                  : 'bg-gray-300' // Pending color
              }`}
            ></div>

            {/* Step Label */}
            <span
              className={`mt-2 text-xs sm:text-sm font-medium transition-colors duration-300 ${
                isCurrent || isCompleted ? 'text-gray-800' : 'text-gray-500'
              }`}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;