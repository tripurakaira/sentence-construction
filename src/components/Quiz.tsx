import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  questionId: string;
  question: string;
  questionType: string;
  answerType: string;
  options: string[];
  correctAnswer: string[];
}

interface QuizData {
  status: string;
  data: {
    testId: string;
    questions: Question[];
  };
  message: string;
}

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answers, setAnswers] = useState<string[][]>([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // When time runs out, move to next question
      console.log('Time up! Moving to next question');
      handleNext();
    }
  }, [timeLeft]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:8000/data');
      const data = await response.json();
      console.log('Raw data:', data); // Debug log
      
      // The data structure we're receiving is { testId, questions }
      if (data && Array.isArray(data.questions)) {
        setQuestions(data.questions);
        console.log('Fetched questions:', data.questions); // Debug log
      } else {
        console.error('Invalid data structure:', data); // Debug log
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleOptionClick = (option: string) => {
    console.log('Selected options before:', selectedOptions);
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else if (selectedOptions.length < 4) {
      setSelectedOptions([...selectedOptions, option]);
    }
    console.log('Selected options after:', selectedOptions);
  };

  const handleNext = () => {
    // Store the current answers
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOptions;
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOptions([]);
      setTimeLeft(30);
    } else {
      console.log('Navigating to results with:', {
        answers: newAnswers,
        questions: questions
      });
      // On the last question, navigate to results with all answers
      navigate('/results', { 
        state: { 
          answers: newAnswers,
          questions: questions,
          score: calculateScore(newAnswers)
        }
      });
    }
  };

  // Add this helper function to calculate score
  const calculateScore = (allAnswers: string[][]) => {
    let score = 0;
    allAnswers.forEach((answer, index) => {
      const correctAnswer = questions[index].correctAnswer;
      if (JSON.stringify(answer.sort()) === JSON.stringify(correctAnswer.sort())) {
        score++;
      }
    });
    return score;
  };

  // Add a useEffect to log when currentQuestion changes
  useEffect(() => {
    console.log('Current question changed to:', currentQuestion);
    console.log('Current question data:', questions[currentQuestion]);
  }, [currentQuestion, questions]);

  const handleQuit = () => {
    navigate('/');
  };

  const formatTime = (time: number) => {
    return `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[800px] w-full min-h-[600px] bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-1">
            {Array(10).fill(null).map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${index === currentQuestion ? 'bg-blue-600' : 'bg-gray-200'}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              {formatTime(timeLeft)}
            </div>
            <button
              onClick={handleQuit}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Quit
            </button>
          </div>
        </div>

        <div className="mb-12">
          <p className="text-xl text-gray-800 leading-relaxed mb-8">
            {questions[currentQuestion]?.question || 'Loading...'}
          </p>
          <div className="grid grid-cols-2 gap-6">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`
                  py-4 px-6 text-lg rounded-lg border-2 transition-all
                  ${selectedOptions.includes(option)
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-200 hover:border-blue-600 hover:bg-blue-50'
                  }
                `}
                disabled={selectedOptions.length === 4 && !selectedOptions.includes(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end items-center">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz; 