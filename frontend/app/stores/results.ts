import { defineStore } from 'pinia'
import type { QuizResult, QuizResultDetail } from '~/types/quiz'
import { mockQuiz } from '~/data/mockQuiz'

export const useResultsStore = defineStore('results', {
  state: () => ({
    results: null as QuizResult | null,
    answers: {} as Record<number, number | null>,
  }),

  actions: {
    setAnswers(answers: Record<number, number | null>) {
      this.answers = answers;
      this.calculateResults();
    },

    calculateResults() {
      const questions = mockQuiz.questions.map((question, index) => {
        const selectedAnswerIndex = this.answers[index] ?? null;
        const isCorrect = selectedAnswerIndex !== null && selectedAnswerIndex === question.correctAnswerIndex;

        const resultDetail: QuizResultDetail = {
          id: question.id,
          question: question.text,
          options: question.options,
          correctAnswerIndex: question.correctAnswerIndex,
          selectedAnswerIndex,
          isCorrect,
          explanation: question.explanation
        };

        return resultDetail;
      });

      // Calculate score
      const correctCount = questions.filter(q => q.isCorrect).length;
      const score = Math.round((correctCount / questions.length) * 100);

      // Calculate time taken (using mock time for now)
      const totalSeconds = mockQuiz.timeLimit; // In a real app, get from quiz store
      const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
      const seconds = (totalSeconds % 60).toString().padStart(2, '0');
      const timeTaken = `${minutes}:${seconds}`;

      // Calculate grade
      let grade = 'F';
      let performanceLabel = 'Needs Improvement';
      if (score >= 90) {
        grade = 'A+';
        performanceLabel = 'Excellent!';
      } else if (score >= 80) {
        grade = 'A';
        performanceLabel = 'Very Good!';
      } else if (score >= 70) {
        grade = 'B';
        performanceLabel = 'Good!';
      } else if (score >= 60) {
        grade = 'C';
        performanceLabel = 'Satisfactory';
      } else if (score >= 50) {
        grade = 'D';
        performanceLabel = 'Pass';
      }

      this.results = {
        id: Date.now(), // Generate a temporary ID
        quizId: mockQuiz.id,
        quizTitle: mockQuiz.title,
        score,
        correctAnswers: correctCount,
        totalQuestions: questions.length,
        timeTaken,
        grade,
        completionDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        performanceLabel,
        questions
      };
    },

    resetResults() {
      this.results = null;
      this.answers = {};
    }
  }
});