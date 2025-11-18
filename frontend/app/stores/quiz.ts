import { defineStore } from 'pinia'
import type { Quiz } from '~/types/quiz'
import { mockQuiz } from '~/data/mockQuiz'
import { useResultsStore } from '~/stores/results'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    currentQuestionIndex: 0,
    totalQuestions: mockQuiz.totalQuestions,
    answers: {} as Record<number, number | null>,
    timeRemaining: mockQuiz.timeLimit, // 15 minutes in seconds
    isCompleted: false,
    quiz: null as Quiz | null,
  }),

  getters: {
    isQuizComplete: (state): boolean => {
      for (let i = 0; i < state.totalQuestions; i++) {
        if (state.answers[i] === undefined || state.answers[i] === null) {
          return false;
        }
      }
      return true;
    },

    findNextUnansweredQuestion: (state): number => {
      for (let i = 0; i < state.totalQuestions; i++) {
        if (state.answers[i] === undefined || state.answers[i] === null) {
          return i;
        }
      }
      return -1; // Return -1 if all questions are answered
    }
  },

  actions: {
    async loadQuiz(): Promise<Quiz> {
      // Reset the quiz state to ensure no data from previous sessions
      this.resetQuiz();
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 500));
      this.quiz = mockQuiz;
      this.totalQuestions = mockQuiz.totalQuestions;
      return mockQuiz;
    },

    goToNextQuestion() {
      const nextUnansweredIndex = this.findNextUnansweredQuestion;
      if (nextUnansweredIndex !== -1) {
        if (this.currentQuestionIndex !== nextUnansweredIndex) {
          this.currentQuestionIndex = nextUnansweredIndex;
        } else {
          this.currentQuestionIndex++;
        }
      }
    },

    goToPreviousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },

    goToQuestion(index: number) {
      if (index >= 0 && index < this.totalQuestions) {
        this.currentQuestionIndex = index;
      }
    },

    selectAnswer(questionIndex: number, answerIndex: number) {
      this.answers[questionIndex] = answerIndex;
    },

    startTimer() {
      const timerInterval = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--;
        } else {
          // Time is up, finish the quiz
          this.finishQuiz();
          clearInterval(timerInterval);
        }
      }, 1000);
    },

    finishQuiz() {
      this.isCompleted = true;
    },

    // Method to reset the quiz state
    resetQuiz() {
      this.currentQuestionIndex = 0;
      this.answers = {};
      this.timeRemaining = mockQuiz.timeLimit;
      this.isCompleted = false;

      // Also reset the results store to prevent data leakage
      const resultsStore = useResultsStore();
      resultsStore.resetResults();
    }
  }
});