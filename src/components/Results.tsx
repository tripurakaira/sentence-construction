import { useLocation, useNavigate } from 'react-router-dom';

interface Question {
  questionId: string;
  question: string;
  questionType: string;
  answerType: string;
  options: string[];
  correctAnswer: string[];
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, questions } = location.state || { answers: [], questions: [] };

  if (!answers || !questions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer: string[], index: number) => {
      const correctAnswer = questions[index].correctAnswer;
      if (JSON.stringify(answer.sort()) === JSON.stringify(correctAnswer.sort())) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  const isAnswerCorrect = (userAnswer: string[], correctAnswer: string[]) => {
    return JSON.stringify(userAnswer.sort()) === JSON.stringify(correctAnswer.sort());
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:8000/data');
      const data = await response.json();
      // ... rest of the code
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      

      {/* Score Circle */}
      <div className="flex flex-col items-center mt-12 mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#22C55E"
              strokeWidth="3"
              strokeDasharray={`${percentage}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-semibold">{percentage}</span>
          </div>
        </div>
        <span className="text-sm text-gray-600 mt-2">Overall Score</span>
      </div>

      {/* Feedback Text */}
      <div className="text-center px-8 mb-6">
        <p className="text-gray-700 text-sm leading-relaxed">
          While you correctly formed several sentences, there are a couple of areas where
          improvement is needed. Pay close attention to sentence structure and word placement
          to ensure clarity and correctness. Review your responses below for more details.
        </p>
      </div>

      {/* Dashboard Button */}
      <div className="flex justify-center mb-8">
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>

      {/* Questions Review */}
      <div className="px-4 pb-8 max-w-2xl mx-auto">
        {questions.map((question: Question, index: number) => (
          <div key={question.questionId} className="mb-3 bg-white rounded-lg">
            <div className="p-3">
              {/* Prompt header */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] text-gray-500">Prompt</span>
                <span className="text-[11px] text-gray-500">{index + 1}/10</span>
              </div>
              
              {/* Question text */}
              <p className="text-[13px] text-gray-800 mb-3 leading-relaxed">
                {question.question}
              </p>

              {/* Your response section */}
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] text-gray-500">Your response</span>
                  {isAnswerCorrect(answers[index] || [], question.correctAnswer) ? (
                    <span className="text-[11px] text-green-600">Correct</span>
                  ) : (
                    <span className="text-[11px] text-red-600">Incorrect</span>
                  )}
                </div>
                <p className="text-[13px] text-gray-800 leading-relaxed">
                  {answers[index]?.join(' ')}
                </p>
                {!isAnswerCorrect(answers[index] || [], question.correctAnswer) && (
                  <>
                    <span className="text-[11px] text-gray-500 block mt-3 mb-1">Correct answer</span>
                    <p className="text-[13px] text-gray-800 leading-relaxed">
                      {question.correctAnswer.join(' ')}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results; 