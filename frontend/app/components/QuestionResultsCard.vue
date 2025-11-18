<template>
  <div class="bg-white rounded-3xl shadow-lg p-8 border border-slate-200">
    <h3 class="text-2xl font-bold text-slate-900 mb-6 text-center">Question-by-Question Results</h3>
    <QuestionReview :questions="results.questions" />
  </div>
</template>

<script setup lang="ts">
import type { QuizResult } from '~/types/quiz';
import QuestionReview from './QuestionReview.vue';

interface Props {
  results: QuizResult;
}

defineProps<Props>();
</script>