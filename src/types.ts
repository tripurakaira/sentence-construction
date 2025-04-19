export interface Question {
  id: number;
  sentence: string;
  blanks: number;
  options: string[];
  correctAnswers: string[];
}

export interface UserAnswer {
  questionId: number;
  userAnswers: string[];
  isCorrect: boolean;
}

export interface QuizState {
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  timeRemaining: number;
  isQuizComplete: boolean;
} 