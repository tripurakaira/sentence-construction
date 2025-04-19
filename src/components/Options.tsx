interface OptionsProps {
  options: string[];
  selectedWords: string[];
  onWordClick: (word: string) => void;
}

const Options = ({ options, selectedWords, onWordClick }: OptionsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {options.map((word, index) => (
        <button
          key={index}
          onClick={() => onWordClick(word)}
          disabled={selectedWords.includes(word)}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: '2px solid #1d4ed8'
          }}
          className="hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {word}
        </button>
      ))}
    </div>
  );
};

export default Options; 