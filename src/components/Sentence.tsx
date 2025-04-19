import { Question } from '../types';

interface SentenceProps {
  question: Question;
  selectedWords: string[];
  onBlankClick: (index: number) => void;
}

const Sentence = ({ question, selectedWords, onBlankClick }: SentenceProps) => {
  const renderSentence = () => {
    return question.sentence.split('_____').map((part, index) => (
      <span key={index}>
        {part}
        {index < question.sentence.split('_____').length - 1 && (
          <button
            onClick={() => onBlankClick(index)}
            className="mx-1 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 border border-gray-400"
          >
            {selectedWords[index] || '_____'}
          </button>
        )}
      </span>
    ));
  };

  return (
    <div className="text-lg mb-6 text-gray-700">
      <p>{renderSentence()}</p>
    </div>
  );
};

export default Sentence; 