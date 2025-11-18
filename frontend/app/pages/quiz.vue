<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Quiz Content -->
      <div class="max-w-3xl mx-auto mt-4">
        <!-- Quiz Question Component -->
        <QuizQuestion
          v-if="currentQuizQuestion"
          :model-value="quizStore.answers[quizStore.currentQuestionIndex] ?? null"
          :question="currentQuizQuestion"
          :question-number="quizStore.currentQuestionIndex + 1"
          :total-questions="quizStore.totalQuestions"
          @update:model-value="selectAnswer(quizStore.currentQuestionIndex, $event!)"
        />
        <div v-else class="text-center py-10">
          <p>Loading quiz...</p>
        </div>

        <!-- Question Navigation Component -->
        <QuestionNavigation
          :current-question="quizStore.currentQuestionIndex + 1"
          :total-questions="quizStore.totalQuestions"
          :answers="quizStore.answers"
          @navigate-to-question="goToQuestion"
        />

        <!-- Quiz Navigation Buttons -->
        <div class="flex justify-between items-center mt-8">
          <button
            class="px-6 py-3 bg-linear-to-r from-slate-600 to-slate-700 text-white rounded-lg font-bold hover:from-slate-700 hover:to-slate-800 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="quizStore.currentQuestionIndex <= 0"
            @click="goToPreviousQuestion"
          >
            Previous
          </button>

          <div class="flex space-x-4">
            <button
              class="px-8 py-4 bg-linear-to-r from-slate-100 to-slate-200 text-slate-800 rounded-xl font-bold hover:from-slate-200 hover:to-slate-300 transition-all duration-300 border border-slate-300 shadow-sm flex items-center"
            >
              <svg class="w-6 h-6 mr-2 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              Flag Question
            </button>

            <button
              v-if="!isLastUnsolvedQuestion"
              class="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              @click="goToNextQuestion"
            >
              Next
            </button>

            <button
              v-else
              class="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              @click="endQuiz"
            >
              {{ 'Finish' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuizStore } from '~/stores/quiz'
import { useResultsStore } from '~/stores/results'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const quizStore = useQuizStore()
const resultsStore = useResultsStore()

// Load the quiz data when component is initialized
await quizStore.loadQuiz()

// Use the quiz data from the store
const currentQuizQuestion = computed(() => {
  if (!quizStore.quiz) return null;
  return quizStore.quiz.questions[quizStore.currentQuestionIndex]!;
})

// Check if current question is the last unanswered question
const isLastUnsolvedQuestion = computed(() => {
  if (quizStore.isQuizComplete) return true;

  const nextUnansweredIndex = quizStore.findNextUnansweredQuestion;
  if (nextUnansweredIndex === -1) return true; // All questions are answered

  // Check if this is the last unanswered question
  // by finding the next unanswered question after the current one
  for (let i = quizStore.currentQuestionIndex + 1; i < quizStore.totalQuestions; i++) {
    if (quizStore.answers[i] === undefined || quizStore.answers[i] === null) {
      // There is an unanswered question after current, so current is not the last unsolved
      return false;
    }
  }

  // If we reach here, no unanswered questions exist after current question
  return nextUnansweredIndex === quizStore.currentQuestionIndex;
})

const endQuiz = async () => {
  quizStore.finishQuiz()
  // Send answers to results store
  resultsStore.setAnswers(quizStore.answers)
  try {
    await router.push('/results')
  } catch (error) {
    console.error('Navigation error:', error)
  }
}

// Destructure methods for template usage
const {
  goToNextQuestion,
  goToPreviousQuestion,
  goToQuestion,
  selectAnswer
} = quizStore
</script>
