export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswers: string[];
  blanks: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  timeRemaining: number;
  isQuizComplete: boolean;
}

export interface UserAnswer {
  questionId: string;
  userAnswers: string[];
  isCorrect: boolean;
}

export interface TimerProps {
  timeRemaining: number;
}