import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Quiz from './components/Quiz';
import Results from './components/Results';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 w-full fixed inset-0 overflow-auto">
        <header className="border-b border-gray-100 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="w-8"></div>
            <h1 className="text-xl font-normal tracking-tight">
              Sentence Construction
            </h1>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
              <div className="text-gray-400 font-bold text-lg" style={{ transform: 'rotate(90deg)' }}>⋯</div>
            </button>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
