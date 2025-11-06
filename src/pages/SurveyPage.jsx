import React, { useState } from 'react';
import StepIndicator from '../components/survey/StepIndicator';
import PersonalInfoStep from '../components/survey/PersonalInfoStep';
import LifestyleStep from '../components/survey/LifestyleStep';
import SymptomStep from '../components/survey/SymptomStep';
import SymptomSeverityStep from '../components/survey/SymptomSeverityStep';
import AdditionalDetailsStep from '../components/survey/AdditionalDetailsStep';
import MetricsTrackingStep from '../components/survey/MetricsTrackingStep';
import { useNavigate } from 'react-router';

// STEP DEFINITIONS: 4 main steps
const STEPS = ['Info', 'Eval', 'Tracking', 'Trends'];

const SurveyPage = ({ onSurveyComplete }) => {
  // State to track the main step index (0, 1, 2, 3)
  const [currentStep, setCurrentStep] = useState(0);
  
  // NEW: State for internal steps within the 'Eval' phase
  const [evalSubStep, setEvalSubStep] = useState(0); // 0: Lifestyle, 1: Symptom, 2: Severity

  // NEW: State for internal steps within the 'Tracking' phase
  const [trackingSubStep, setTrackingSubStep] = useState(0); // 0: AdditionalDetails, 1: MetricsTracking

  // State to hold all form data (omitted for brevity)
  const [formData, setFormData] = useState({ 
    /* ... (all your existing form fields) ... */
    name: '', gender: '', dob: '', height: '', weight: '', country: '', diet: 'Vegan', sleep: 'Normal', hydration: 'Normal', stress: 'Normal', smoking: 'No', alcohol: 'Never', symptoms: [], otherSymptom: '', severity: 'None', durationDays: 3, additionalDetails: '', stepsWalked: '', waterIntake: '', sleepHours: '', averageHeartRate: '', bmi: '', calorieIntake: '',
  });

  // Function to update form data (omitted for brevity)
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- NAVIGATION LOGIC ---

  // Main Handler: Moves to the next major step (0->1, 1->2, 2->3)
  const handleNextMajorStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      // Reset sub-steps when entering a new major step
      setEvalSubStep(0);
      setTrackingSubStep(0);
    } else {
      // Survey complete
      console.log('Survey Complete. Submitting data:', formData);
      if (onSurveyComplete) {
        onSurveyComplete(formData);
      }
    }
  };
  const navigate = useNavigate();
  // Main Handler: Moves to the previous major step (3->2, 2->1, 1->0)
  const handleBackMajorStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      // When going back, set sub-step to the LAST step of the previous phase
      if (currentStep === 2) setEvalSubStep(2); // If going back from Tracking, go to Eval's last sub-step
      if (currentStep === 1) setTrackingSubStep(1); // If going back from Eval, go to Info (which has no sub-steps)
    }
  };


  // --- SUB-STEP HANDLERS ---

  // Evaluaton Phase (Step 1) Handlers
  const handleEvalNext = () => {
    if (evalSubStep < 2) {
      setEvalSubStep(prev => prev + 1);
    } else {
      handleNextMajorStep(); // Move to next major step (Tracking)
    }
  };

  const handleEvalBack = () => {
    if (evalSubStep > 0) {
      setEvalSubStep(prev => prev - 1);
    } else {
      handleBackMajorStep(); // Move back to previous major step (Info)
    }
  };

  // Tracking Phase (Step 2) Handlers
  const handleTrackingNext = () => {
    if (trackingSubStep < 1) {
      setTrackingSubStep(prev => prev + 1);
    } else {
      handleNextMajorStep(); // Move to next major step (Trends)
    }
  };

  const handleTrackingBack = () => {
    if (trackingSubStep > 0) {
      setTrackingSubStep(prev => prev - 1);
    } else {
      handleBackMajorStep(); // Move back to previous major step (Eval)
    }
  };
  const userToken =localStorage.getItem("authToken");

  const handleSubmitProfile = async () => {
   
    const payload = {
        name: formData.name,
        gender: formData.gender,
        DOB: formData.dob, // Mapping 'dob' to 'DOB'
        relationship: "Self", // Hardcoded based on your curl example
        height: Number(formData.height),
        weight: Number(formData.weight),
        country: formData.country,
        diet_type: formData.diet, // Mapping 'diet' to 'diet_type'
        sleep_quality: formData.sleep, // Mapping 'sleep' to 'sleep_quality'
        hydration_level: formData.hydration,
        stress_level: formData.stress,
        smoking: formData.smoking,
        alcohol_intake: formData.alcohol,
        symptoms: formData.symptoms,
        symptom_severity: formData.severity, // Mapping 'severity' to 'symptom_severity'
        details: formData.additionalDetails, // Mapping 'additionalDetails' to 'details'
        steps_walked: Number(formData.stepsWalked),
        sleep_hours: Number(formData.sleepHours),
        water_intake: Number(formData.waterIntake),
        BMI: Number(formData.bmi),
        heart_rate: Number(formData.averageHeartRate),
        calorie_intake: Number(formData.calorieIntake),
    };

    console.log("Submitting Payload:", payload);

    // --- API Call Logic ---
    try {
        const response = await fetch('https://healthsnap-68ry.onrender.com/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // This is the CRITICAL part for authorization:
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Profile created successfully:', data);
            localStorage.setItem("Form" ,JSON.stringify(formData));
            localStorage.setItem("Trends",JSON.stringify(data));
            // ONLY navigate on success
            navigate('/dashboard');
        } else {
            // Handle HTTP error statuses (400, 500, etc.)
            const errorData = await response.json();
            console.error('API Error:', response.status, errorData);
            alert(`Failed to save profile: ${errorData.message || 'Server error'}`);
        }
    } catch (error) {
        // Handle network errors (no internet, server down, etc.)
        console.error('Network or Fetch Error:', error);
        alert('A network error occurred. Please try again.');
    }
};
  // --- RENDER LOGIC ---
  const renderStep = () => {
    switch (currentStep) {
      
      case 0: // Info Step
        return (
          <PersonalInfoStep 
            data={formData} 
            updateData={updateFormData} 
            onNext={handleNextMajorStep} // Goes to Eval
          />
        );
      
      case 1: // Eval Step (Sub-steps: Lifestyle, Symptom, Severity)
        // Render different components based on internal sub-step state
        if (evalSubStep === 0) {
          return (
            <LifestyleStep 
              data={formData} 
              updateData={updateFormData} 
              onNext={handleEvalNext} // Go to SymptomStep
              onBack={handleEvalBack} // Go back to PersonalInfoStep
            />
          );
        } else if (evalSubStep === 1) {
          return (
            <SymptomStep 
              data={formData} 
              updateData={updateFormData} 
              onNext={handleEvalNext} // Go to SymptomSeverityStep
              onBack={handleEvalBack} // Go back to LifestyleStep
            />
          );
        } else if (evalSubStep === 2) {
          return (
            <SymptomSeverityStep 
              data={formData} 
              updateData={updateFormData} 
              onNext={handleEvalNext} // Go to next MAJOR step (Tracking)
              onBack={handleEvalBack} // Go back to SymptomStep
            />
          );
        }
        break; // break from the main switch

      
      case 2: // Tracking Step (Sub-steps: AdditionalDetails, MetricsTracking)
        // Render different components based on internal sub-step state
        if (trackingSubStep === 0) {
          return (
            <AdditionalDetailsStep 
              data={formData} 
              updateData={updateFormData} 
              onNext={handleTrackingNext} // Go to MetricsTrackingStep
              onBack={handleTrackingBack} // Go back to Eval (SymptomSeverityStep)
            />
          );
        } else if (trackingSubStep === 1) {
          return (
            <MetricsTrackingStep 
              data={formData} 
              updateData={updateFormData} 
              onNext={handleTrackingNext} // Go to next MAJOR step (Trends)
              onBack={handleTrackingBack} // Go back to AdditionalDetailsStep
            />
          );
        }
        break; // break from the main switch

      
      case 3: // Trends Step (Final completion screen)
        return (
          <div className="text-center p-8 md:p-12">
            {/* ... (Your existing completion screen code) ... */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-green-600">You're All Set! 🎉</h2>
            </div>
            
            <p className="text-gray-600 text-lg mt-4 mb-8">
              Your health profile is complete. Click below to view your personalized dashboard and health trends.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBackMajorStep} // Go back to MetricsTrackingStep
                className="px-8 py-3 text-lg font-semibold rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
              
              <button
    onClick={handleSubmitProfile} // Call the new handler function
    className="px-10 py-3 text-lg font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
>
    Go to Dashboard →
</button>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center p-12">
            <h2 className="text-2xl font-bold text-red-600">Error: Invalid Step</h2>
            <p className="text-gray-600 mt-4">Please refresh the page and try again.</p>
          </div>
        );
    }
    // Return a default empty div if the sub-step logic falls through
    return <div className="p-4 text-center text-gray-500">Loading Step...</div>;
  };

  // --- FINAL JSX RENDER ---
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10 lg:p-12">
        
        {/* Step Indicator (Progress Bar) */}
        <div className="mb-10 md:mb-16">
          <StepIndicator 
            steps={STEPS} 
            currentStepIndex={currentStep} 
          />
        </div>

        {/* Render Current Step */}
        <div className="min-h-[400px]">
          {renderStep()}
        </div>

      </div>
    </div>
  );
};

export default SurveyPage;