import { useState, useEffect } from 'react';
import { Question, QuizState, UserAnswer } from '../types';
import { fetchQuestions } from '../api';
import Sentence from '../components/Sentence';
import Options from '../components/Options';
import Timer from '../components/Timer';
import Feedback from '../components/Feedback';

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    userAnswers: [],
    timeRemaining: 30,
    isQuizComplete: false
  });
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };
    loadQuestions();
  }, []);

  useEffect(() => {
    if (quizState.timeRemaining > 0 && !quizState.isQuizComplete) {
      const timer = setInterval(() => {
        setQuizState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
      return () => clearInterval(timer);
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
    <div>
      <Timer timeRemaining={quizState.timeRemaining} />
      <Sentence
        question={currentQuestion}
        selectedWords={selectedWords}
        onBlankClick={handleBlankClick}
      />
      <Options
        options={currentQuestion.options}
        selectedWords={selectedWords}
        onWordClick={handleWordClick}
      />
      <button
        onClick={handleNextQuestion}
        disabled={!isNextEnabled}
        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed border-2 border-green-700"
      >
        Next
      </button>
    </div>
  );
};

export default Quiz; 