import React, { useState } from 'react';

const TrainingPage = () => {
  // We use state to track which step of the training the driver is on
  const [currentStep, setCurrentStep] = useState(1);
  
  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizError, setQuizError] = useState("");

  const handleNextStep = () => setCurrentStep(currentStep + 1);

  const handleQuizSubmit = () => {
    // Simple validation: Ensure they answered correctly
    if (quizAnswers.q1 === "route" && quizAnswers.q2 === "admin") {
      setQuizError("");
      handleNextStep();
    } else {
      setQuizError("You must answer all questions correctly to pass the assessment.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-200 flex flex-col items-center py-10 px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-full">
        
        {/* Progress Bar */}
        <div className="flex justify-between border-b pb-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-800">URBAN-R Driver Certification</h1>
          <span className="text-sm font-bold bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
            Step {currentStep} of 3
          </span>
        </div>

        {/* STEP 1: VIDEO MODULE */}
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">1. Mandatory Safety & Route Training</h2>
            <div className="aspect-w-16 aspect-h-9 mb-6">
              {/* Embedded YouTube placeholder (Replace src with actual road safety video later) */}
              <iframe 
                className="w-full h-64 md:h-96 rounded-lg shadow"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Training Video"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-gray-600 mb-6">
              Please watch the entire video detailing municipal e-rickshaw regulations, 
              corridor restrictions, and passenger limits.
            </p>
            <button 
              onClick={handleNextStep}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition"
            >
              I have finished watching the video
            </button>
          </div>
        )}

        {/* STEP 2: ASSESSMENT QUIZ */}
        {currentStep === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">2. Comprehension Assessment</h2>
            <p className="text-gray-600 mb-6">You must pass this quiz to operate on URBAN-R networks.</p>

            <div className="space-y-6 mb-8">
              {/* Question 1 */}
              <div className="bg-gray-50 p-4 rounded border">
                <p className="font-semibold mb-2">Q1. Where are you allowed to operate your E-Rickshaw?</p>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="q1" value="anywhere" onChange={(e) => setQuizAnswers({...quizAnswers, q1: e.target.value})} />
                    <span>Anywhere in the city</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="q1" value="route" onChange={(e) => setQuizAnswers({...quizAnswers, q1: e.target.value})} />
                    <span>Only on my officially assigned route corridor</span>
                  </label>
                </div>
              </div>

              {/* Question 2 */}
              <div className="bg-gray-50 p-4 rounded border">
                <p className="font-semibold mb-2">Q2. Who has the final authority to reroute traffic during congestion?</p>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="q2" value="driver" onChange={(e) => setQuizAnswers({...quizAnswers, q2: e.target.value})} />
                    <span>The Driver</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="q2" value="admin" onChange={(e) => setQuizAnswers({...quizAnswers, q2: e.target.value})} />
                    <span>The Transport Admin via the URBAN-R portal</span>
                  </label>
                </div>
              </div>
            </div>

            {quizError && <p className="text-red-600 font-bold mb-4">{quizError}</p>}

            <button 
              onClick={handleQuizSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition"
            >
              Submit Assessment
            </button>
          </div>
        )}

        {/* STEP 3: CERTIFICATE & COMPLETION */}
        {currentStep === 3 && (
          <div className="animate-fade-in text-center py-8">
            <div className="inline-block bg-green-100 text-green-700 p-4 rounded-full mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Assessment Passed!</h2>
            
            {/* Mock Certificate UI */}
            <div className="mt-8 mb-8 p-8 border-4 border-double border-gray-300 bg-gray-50 rounded">
              <h3 className="text-xl font-bold uppercase tracking-widest text-gray-700 mb-4">Official Certification</h3>
              <p className="text-gray-600">This certifies that the registered driver has successfully completed the</p>
              <p className="text-lg font-bold text-blue-800 my-2">URBAN-R Route Compliance Training</p>
              <p className="text-sm text-gray-500 mt-4">Date: {new Date().toLocaleDateString()}</p>
            </div>

            <button 
              onClick={() => alert("Redirecting to Dashboard... (Backend API call goes here)")}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition"
            >
              Acknowledge & Go to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default TrainingPage;