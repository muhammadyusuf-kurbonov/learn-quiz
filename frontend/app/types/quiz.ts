export interface QuizQuestion {
  id: number;
  text: string;
  type: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
}

export interface Quiz {
  id: number;
  title: string;
  totalQuestions: number;
  timeLimit: number;
  questions: QuizQuestion[];
}

export interface QuizResult {
  id: number;
  quizId: number;
  quizTitle: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: string;
  grade: string;
  completionDate: string;
  performanceLabel: string;
  questions: QuizResultDetail[];
}

export interface QuizResultDetail {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  selectedAnswerIndex: number | null;
  isCorrect: boolean;
  explanation?: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  totalQuestions: number;
  answers: Record<number, number | null>;
  timeRemaining: number;
  isCompleted: boolean;
}

export interface GeneratingState {
  progress: number;
  timeRemaining: number;
  isComplete: boolean;
}

export interface Step {
  number: number;
  label: string;
  active: boolean;
}