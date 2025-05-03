import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Question, QuizState, UserAnswer, TimerProps } from '../types';
import Sentence from '../components/Sentence';
import Options from '../components/Options';
import Timer from '../components/Timer';
import Feedback from '../components/Feedback';

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    userAnswers: [],
    timeRemaining: 30,
    isQuizComplete: false
  });
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://sentence-construction.onrender.com/data');
      const data = await response.json();
      if (data && data.questions) {
        setQuestions(data.questions);
        console.log('Fetched questions:', data.questions);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (quizState.timeRemaining > 0 && !quizState.isQuizComplete) {
      const timer = setTimeout(() => {
        setQuizState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (quizState.timeRemaining === 0) {
      handleNextQuestion();
    }
  }, [quizState.timeRemaining, quizState.isQuizComplete]);

  const handleWordClick = (word: string) => {
    const currentQuestion = questions[quizState.currentQuestionIndex];
    if (selectedWords.length < currentQuestion.blanks) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleBlankClick = (index: number) => {
    const newSelectedWords = [...selectedWords];
    newSelectedWords.splice(index, 1);
    setSelectedWords(newSelectedWords);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[quizState.currentQuestionIndex];
    const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(currentQuestion.correctAnswers);

    const newUserAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      userAnswers: [...selectedWords],
      isCorrect
    };

    setQuizState(prev => ({
      ...prev,
      userAnswers: [...prev.userAnswers, newUserAnswer],
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      timeRemaining: 30
    }));

    setSelectedWords([]);

    if (quizState.currentQuestionIndex === questions.length - 1) {
      setQuizState(prev => ({ ...prev, isQuizComplete: true }));
    }
  };

  if (quizState.isQuizComplete) {
    return <Feedback questions={questions} userAnswers={quizState.userAnswers} />;
  }

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[quizState.currentQuestionIndex];
  const isNextEnabled = selectedWords.length === currentQuestion.blanks;

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            {/* Timer Display */}
            <div className="mb-4 text-center">
              <div className="text-2xl font-bold">Time Left: {quizState.timeRemaining}s</div>
            </div>

            {/* Question Display */}
            {questions.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Question {quizState.currentQuestionIndex + 1} of {questions.length}
                </h2>
                <Sentence
                  question={currentQuestion}
                  selectedWords={selectedWords}
                  onBlankClick={handleBlankClick}
                />

                {/* Options */}
                <Options
                  options={currentQuestion.options}
                  selectedWords={selectedWords}
                  onWordClick={handleWordClick}
                />

                {/* Selected Options Display */}
                <div className="mb-6">
                  <p className="font-semibold mb-2">Your Answer:</p>
                  <p className="p-2 bg-gray-100 rounded">
                    {selectedWords.join(' ')}
                  </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  <button
                    onClick={() => navigate('/')}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Quit
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    {quizState.currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {questions.length === 0 && (
              <div className="text-center">
                <p className="text-xl font-semibold">Loading questions...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz; 