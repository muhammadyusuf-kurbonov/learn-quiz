<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Quiz Header with Navigation -->
      <div class="w-full bg-white shadow-lg rounded-3xl p-6 mb-6 border border-slate-200">
        <!-- Top row: Quiz title and question counter -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div class="flex items-center">
            <NuxtLink to="/">
              <button class="p-3 rounded-full hover:bg-slate-200 transition-colors duration-200">
                <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18">
                  </path>
                </svg>
              </button>
            </NuxtLink>
            <h1 class="ml-4 text-xl font-bold text-slate-900">Quiz: {{ quizTitle }}</h1>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span class="text-base font-medium text-slate-700 text-center sm:text-left">
              Time: <span class="font-bold text-indigo-700"> {{ timeLeft }} </span>
            </span>
            <div class="w-full sm:w-40 bg-slate-200 rounded-full h-3">
              <div
                class="bg-linear-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
                :style="{ width: (quizStore.currentQuestionIndex + 1) / quizStore.totalQuestions * 100 + '%' }"></div>
            </div>
            <span class="text-base font-semibold text-slate-800 text-center sm:text-left">
              {{ quizStore.currentQuestionIndex + 1 }} / {{ quizStore.totalQuestions }}
            </span>
          </div>
        </div>

        <!-- Middle row: Question navigation -->
        <div class="w-full mb-6 px-4">
          <div class="grid grid-cols-5 gap-3">
            <button
v-for="n in quizStore.totalQuestions" :key="n" :class="[
              'min-w-12 h-12 rounded-full flex items-center justify-center text-base font-bold cursor-pointer',
              n === quizStore.currentQuestionIndex + 1
                ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : quizStore.answers[n - 1] != null
                  ? 'bg-linear-to-r from-green-400 to-emerald-500 text-white border border-green-500'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
            ]" @click="goToQuestion(n - 1)">
              {{ n }}
            </button>
          </div>
        </div>


        <!-- Navigation Buttons - Made sticky with responsive layout -->
        <div class="sticky bottom-4 flex flex-col sm:flex-row sm:justify-between items-center gap-4 sm:gap-0 mb-6 z-10 px-4">
          <button
            class="px-6 py-3 bg-linear-to-r from-slate-600 to-slate-700 text-white rounded-lg font-bold hover:from-slate-700 hover:to-slate-800 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            :disabled="quizStore.currentQuestionIndex <= 0" @click="goToPreviousQuestion">
            Previous
          </button>

          <div class="flex space-x-4 w-full sm:w-auto justify-center">
            <button
              v-if="!isLastUnsolvedQuestion"
              class="cursor-pointer px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex-1 sm:flex-none"
              @click="goToNextQuestion">
              Next
            </button>

            <button
              v-else
              class="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex-1 sm:flex-none"
              @click="endQuiz">
              Finish
            </button>
          </div>
        </div>
      </div>

      <!-- Quiz Content -->
      <div class="mt-4">
        <!-- Quiz Question Component -->
        <QuizQuestion
v-if="currentQuizQuestion"
          :model-value="quizStore.answers[quizStore.currentQuestionIndex] ?? null" :question="currentQuizQuestion"
          :question-number="quizStore.currentQuestionIndex + 1" :total-questions="quizStore.totalQuestions"
          @update:model-value="selectAnswer(quizStore.currentQuestionIndex, $event!)" />
        <div v-else class="text-center py-10">
          <p>Loading quiz...</p>
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

// Quiz metadata for the header
const quizTitle = computed(() => {
  return quizStore.quiz?.title || 'Document Title';
});

const timeLeft = computed(() => {
  // Format time as MM:SS
  const minutes = Math.floor(quizStore.timeRemaining / 60);
  const seconds = quizStore.timeRemaining % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

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
