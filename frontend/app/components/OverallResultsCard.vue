<template>
  <div class="bg-white rounded-3xl shadow-lg p-8 mb-8 border border-slate-200">
    <!-- Overall Score -->
    <div class="flex flex-col md:flex-row items-center justify-between mb-8">
      <div class="text-center md:text-left mb-6 md:mb-0">
        <h2 class="text-2xl font-bold text-slate-900">{{ results.quizTitle }}</h2>
        <p class="text-base text-slate-700">Completed on {{ results.completionDate }}</p>
      </div>

      <div class="bg-linear-to-r from-green-500 to-emerald-600 rounded-full w-40 h-40 flex items-center justify-center text-white shadow-xl">
        <div class="text-center px-2">
          <div class="text-4xl font-bold">{{ results.score }}%</div>
          <div class="text-xs font-medium mt-1 max-w-[120px] break-words" :title="results.performanceLabel">{{ results.performanceLabel }}</div>
        </div>
      </div>
    </div>

    <!-- Score Details -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center border border-blue-200">
        <div class="text-3xl font-bold text-blue-700">{{ results.correctAnswers }}/{{ results.totalQuestions }}</div>
        <div class="text-base font-medium text-slate-800">Correct Answers</div>
      </div>
      <div class="bg-linear-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 text-center border border-indigo-200">
        <div class="text-3xl font-bold text-indigo-700">{{ results.timeTaken }}</div>
        <div class="text-base font-medium text-slate-800">Time Taken</div>
      </div>
      <div class="bg-linear-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center border border-purple-200">
        <div class="text-3xl font-bold text-purple-700">{{ results.grade }}</div>
        <div class="text-base font-medium text-slate-800">Grade</div>
      </div>
    </div>

    <!-- Performance Graph -->
    <div>
      <h3 class="text-xl font-bold text-slate-900 mb-4 text-center">Your Performance</h3>
      <div class="bg-slate-200 rounded-full h-4 mb-3">
        <div
          class="bg-linear-to-r from-green-500 to-emerald-500 h-4 rounded-full"
          :style="{ width: results.score + '%' }"
        ></div>
      </div>
      <div class="flex justify-between text-sm text-slate-700">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuizResult } from '~/types/quiz';

interface Props {
  results: QuizResult;
}

defineProps<Props>();
</script>