<template>
  <div class="space-y-8">
    <div
      v-for="(question, index) in questions"
      :key="index"
      class="pb-8 last:border-0 last:pb-0"
      :class="{ 'border-b border-slate-200': index < questions.length - 1 }"
    >
      <div class="flex items-start">
        <div
          class="w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0 text-lg font-bold"
          :class="question.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'"
        >
          {{ question.isCorrect ? '✓' : '✗' }}
        </div>
        <div class="flex-1">
          <h4 class="font-bold text-lg text-slate-900">
            {{ index + 1 }}. {{ question.question }}
          </h4>
          <div class="mt-4">
            <p class="text-base text-slate-800 mb-2">
              Your answer:
              <span
                :class="question.isCorrect ? 'font-semibold text-green-600' : 'font-semibold text-red-600'"
              >
                {{ question.selectedAnswerIndex !== null ? question.options[question.selectedAnswerIndex] : 'Not answered' }}
              </span>
              ({{ question.isCorrect ? 'Correct' : 'Incorrect' }})
            </p>
            <p class="text-base text-slate-800">
              Correct answer:
              <span class="font-semibold text-green-600">
                {{ question.options[question.correctAnswerIndex] }}
              </span>
            </p>
            <p v-if="question.explanation" class="text-base text-slate-700 mt-2">
              Explanation: {{ question.explanation }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuizResultDetail } from '~/types/quiz';

interface Props {
  questions: QuizResultDetail[];
}

defineProps<Props>();
</script>