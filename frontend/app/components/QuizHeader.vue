<template>
  <div class="flex items-center justify-between mb-8">
    <div class="flex items-center">
      <NuxtLink to="/">
        <button class="p-3 rounded-full hover:bg-slate-200 transition-colors duration-200">
          <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </button>
      </NuxtLink>
      <h1 class="ml-4 text-xl font-bold text-slate-900">Quiz: {{ quizTitle }}</h1>
    </div>

    <div class="flex items-center space-x-4">
      <span class="text-base font-medium text-slate-700">Time: <span class="font-bold text-indigo-700">{{ timeLeft }}</span></span>
      <div class="w-40 bg-slate-200 rounded-full h-3">
        <div
          class="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
          :style="{ width: (currentQuestion / totalQuestions * 100) + '%' }"
        ></div>
      </div>
      <span class="text-base font-semibold text-slate-800">{{ currentQuestion }} / {{ totalQuestions }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  quizTitle?: string;
  timeLeft?: string;
  currentQuestion: number;
  totalQuestions: number;
}

const props = withDefaults(defineProps<Props>(), {
  quizTitle: 'Document Title',
  timeLeft: '15:42'
})
</script>