<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
    <!-- Sticky Header -->
    <header class="sticky top-0 z-10 bg-white shadow-md rounded-b-2xl p-4 border-b border-slate-200">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center">
            <button class="p-3 rounded-full hover:bg-slate-100 transition-colors duration-200">
              <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </button>
            <h1 class="ml-2 text-xl font-bold text-slate-900">LearnQuiz</h1>
          </NuxtLink>
          
          <h2 class="text-2xl font-bold text-slate-900">Quiz Results</h2>
          
          <div class="w-12"></div> <!-- Spacer to balance the layout -->
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Overall Results Section -->
      <section class="mb-10">
        <div class="bg-white rounded-3xl shadow-lg p-8 border border-slate-200">
          <!-- Header with quiz title and date -->
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-slate-900">{{ results.quizTitle }}</h2>
            <p class="text-slate-600 mt-2">Completed on {{ results.completionDate }}</p>
          </div>

          <!-- Score Circle -->
          <div class="flex flex-col items-center mb-8">
            <div class="relative w-48 h-48">
              <!-- Background circle -->
              <svg class="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e2e8f0"
                  stroke-width="8"
                />
                <!-- Progress circle -->
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#gradient)"
                  stroke-width="8"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="strokeDashoffset"
                  transform="rotate(-90 50 50)"
                  class="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#10b981" />
                    <stop offset="100%" stop-color="#059669" />
                  </linearGradient>
                </defs>
              </svg>
              <!-- Score text inside circle -->
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-4xl font-bold text-slate-900">{{ results.score }}%</span>
                <span class="text-sm font-medium text-slate-600 mt-1">{{ results.performanceLabel }}</span>
              </div>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center border border-blue-200">
              <div class="text-3xl font-bold text-blue-700">{{ results.correctAnswers }}/{{ results.totalQuestions }}</div>
              <div class="text-base font-medium text-slate-800 mt-2">Correct Answers</div>
            </div>
            <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 text-center border border-indigo-200">
              <div class="text-3xl font-bold text-indigo-700">{{ results.timeTaken }}</div>
              <div class="text-base font-medium text-slate-800 mt-2">Time Taken</div>
            </div>
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center border border-purple-200">
              <div class="text-3xl font-bold text-purple-700">{{ results.grade }}</div>
              <div class="text-base font-medium text-slate-800 mt-2">Grade</div>
            </div>
          </div>

          <!-- Performance Graph -->
          <div class="mb-6">
            <div class="flex justify-between mb-2">
              <span class="text-sm font-medium text-slate-700">Performance</span>
              <span class="text-sm font-medium text-slate-700">{{ results.score }}%</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-3">
              <div
                class="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                :style="{ width: results.score + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Action Buttons -->
      <section class="flex flex-col sm:flex-row gap-4 justify-center my-8">
        <button
          class="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          @click="reviewAnswers"
        >
          Review Answers
        </button>
        <button
          class="px-8 py-4 bg-white border border-slate-300 text-slate-800 rounded-2xl font-bold hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow"
          @click="goHome"
        >
          Back to Home
        </button>
      </section>

      <!-- Question-by-Question Results -->
      <section id="question-results" class="mt-10">
        <div class="bg-white rounded-3xl shadow-lg p-8 border border-slate-200">
          <h3 class="text-2xl font-bold text-slate-900 mb-6 text-center">Question-by-Question Results</h3>
          
          <div class="space-y-8">
            <div
              v-for="(question, index) in results.questions"
              :key="index"
              class="pb-8 last:border-0 last:pb-0 border-b border-slate-200 last:border-0"
            >
              <div class="flex items-start">
                <!-- Status indicator -->
                <div
                  class="w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0 text-lg font-bold"
                  :class="question.isCorrect ? 'bg-green-100 text-green-700 border-2 border-green-500' : 'bg-red-100 text-red-700 border-2 border-red-500'"
                >
                  {{ question.isCorrect ? '✓' : '✗' }}
                </div>
                
                <!-- Question details -->
                <div class="flex-1">
                  <h4 class="font-bold text-lg text-slate-900 mb-3">
                    {{ index + 1 }}. {{ question.question }}
                  </h4>
                  
                  <!-- User's answer -->
                  <div class="mb-3">
                    <p class="text-base text-slate-800">
                      Your answer:
                      <span
                        :class="question.isCorrect ? 'font-semibold text-green-600' : 'font-semibold text-red-600'"
                      >
                        {{ question.selectedAnswerIndex !== null ? question.options[question.selectedAnswerIndex] : 'Not answered' }}
                      </span>
                      <span 
                        :class="question.isCorrect ? 'text-green-600' : 'text-red-600'"
                        class="ml-2 font-semibold"
                      >
                        ({{ question.isCorrect ? 'Correct' : 'Incorrect' }})
                      </span>
                    </p>
                  </div>
                  
                  <!-- Correct answer -->
                  <div v-if="!question.isCorrect" class="mb-3">
                    <p class="text-base text-slate-800">
                      Correct answer:
                      <span class="font-semibold text-green-600">
                        {{ question.options[question.correctAnswerIndex] }}
                      </span>
                    </p>
                  </div>

                  <!-- Explanation -->
                  <div v-if="question.explanation" class="mt-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p class="text-base text-slate-700">
                      <span class="font-semibold text-slate-800">Explanation:</span> {{ question.explanation }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useResultsStore } from '~/stores/results'
import type { QuizResult } from '~/types/quiz'

const router = useRouter()
const resultsStore = useResultsStore()

// Get results from the results store
const results = computed<QuizResult>(() => resultsStore.results!)

const goHome = () => {
  router.push('/')
}

const reviewAnswers = () => {
  // Scroll to the question results section with enhanced smooth scrolling
  const questionResultsSection = document.querySelector('section#question-results')
  if (questionResultsSection) {
    questionResultsSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    })
  }
}

// Calculate values for the circular progress indicator
const radius = 45
const circumference = 2 * Math.PI * radius

const strokeDashoffset = computed(() => {
  const progress = results.value?.score || 0
  return circumference - (progress / 100) * circumference
})
</script>