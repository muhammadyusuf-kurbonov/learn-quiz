<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4">
    <div class="max-w-4xl w-full mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Quiz Results</h1>
        <p class="text-lg text-slate-700">Here are your quiz results and performance analysis.</p>
      </div>

      <!-- Overall Results Card -->
      <OverallResultsCard :results="results" />

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center my-6">
        <button
          class="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          @click="reviewAnswers"
        >
          Review Answers
        </button>
        <button
          class="px-8 py-4 bg-white border border-slate-300 text-slate-800 rounded-2xl font-bold hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow"
        >
          Download Report
        </button>
        <button
          class="px-8 py-4 bg-white border border-slate-300 text-slate-800 rounded-2xl font-bold hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow"
          @click="goHome"
        >
          Back to Home
        </button>
      </div>

      <!-- Question Results Card -->
      <section id="question-results">
        <QuestionResultsCard :results="results" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useResultsStore } from '~/stores/results'
import OverallResultsCard from '~/components/OverallResultsCard.vue'
import QuestionResultsCard from '~/components/QuestionResultsCard.vue'

const router = useRouter()
const resultsStore = useResultsStore()

// Get results from the results store
const results = resultsStore.results

const goHome = () => {
  router.push('/')
}

const reviewAnswers = () => {
  // Scroll to the question results section
  const questionResultsCard = document.querySelector('section#question-results')
  if (questionResultsCard) {
    questionResultsCard.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>