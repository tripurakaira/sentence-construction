import { Question, UserAnswer } from '../types';

interface FeedbackProps {
  questions: Question[];
  userAnswers: UserAnswer[];
}

const Feedback = ({ questions, userAnswers }: FeedbackProps) => {
  const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
      {userAnswers.map((answer, index) => (
        <div key={index} className="mb-4 p-4 border-2 border-gray-300 rounded bg-gray-50">
          <p className="font-semibold mb-2">Question {index + 1}:</p>
          <p className="mb-2 text-gray-700">Your answer: {answer.userAnswers.join(', ')}</p>
          <p className="mb-2 text-gray-700">Correct answer: {questions[index].correctAnswers.join(', ')}</p>
          <p className={answer.isCorrect ? "text-green-600" : "text-red-600"}>
            {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
          </p>
        </div>
      ))}
      <p className="text-xl font-semibold mt-4">
        Score: {correctAnswers} out of {questions.length}
      </p>
    </div>
  );
};

export default Feedback; 