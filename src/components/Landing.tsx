import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Landing = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState(20);

  const handleStart = () => {
    setCoins(0);
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[600px] min-h-[500px] px-8 py-12">
        <div className="text-center mb-2">
          <div className="relative w-8 h-8 mx-auto mb-8">
            <div className="absolute inset-0">
              <svg className="w-full h-full text-gray-800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 translate-x-1 translate-y-1">
              <svg className="w-3 h-3 text-gray-800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Sentence Construction</h2>
          <p className="text-sm text-gray-600 mb-12">
            Select the correct words to complete the sentence by arranging<br />
            the provided options in the right order.
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Time Per Question</p>
            <p className="text-base font-medium">30 sec</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Total Questions</p>
            <p className="text-base font-medium">10</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Coins</p>
            <div className="flex items-center justify-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#FCD34D"/>
              </svg>
              <p className="text-base font-medium">{coins}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => window.history.back()}
            className="px-10 py-2.5 rounded-md text-blue-600 border border-blue-600 hover:bg-blue-50 font-medium text-sm"
          >
            Back
          </button>
          <button 
            onClick={handleStart}
            className="px-10 py-2.5 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium text-sm"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing; 