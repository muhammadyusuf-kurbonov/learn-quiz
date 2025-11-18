<template>
  <div class="bg-white rounded-3xl shadow-lg p-10 mb-8 border border-slate-200">
    <!-- Question Counter -->
    <div class="flex justify-between items-center mb-8">
      <span class="text-lg font-bold text-indigo-700">Question {{ questionNumber }} of {{ totalQuestions }}</span>
      <div class="flex space-x-3">
        <span class="px-4 py-2 bg-linear-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full text-base font-medium border border-indigo-200">
          {{ question.type }}
        </span>
      </div>
    </div>

    <!-- Question -->
    <h2 class="text-2xl font-bold text-slate-900 mb-8 leading-relaxed">
      {{ question.text }}
    </h2>

    <!-- Options -->
    <div class="space-y-4 mb-10">
      <div
        v-for="(option, index) in question.options"
        :key="index"
        class="flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md"
        :class="[
          modelValue === index
            ? 'border-indigo-500 bg-linear-to-r from-indigo-50 to-purple-50'
            : 'border-slate-200 hover:border-indigo-300'
        ]"
        @click="selectOption(index)"
      >
        <div
          class="w-7 h-7 rounded-full border-2 flex items-center justify-center mr-4"
          :class="[
            modelValue === index
              ? 'border-indigo-600 bg-indigo-600'
              : 'border-slate-400'
          ]"
        >
          <div
            v-if="modelValue === index"
            class="w-3 h-3 rounded-full bg-white"
          ></div>
        </div>
        <span
          class="text-lg"
          :class="[
            modelValue === index ? 'font-semibold text-slate-900' : 'text-slate-800'
          ]"
        >
          {{ option }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuizQuestion } from '~/types/quiz';

interface Props {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  modelValue: number | null;
}

defineProps<Props>();

interface Emits {
  (e: 'update:modelValue', value: number | null): void;
}

const emit = defineEmits<Emits>();

const selectOption = (index: number) => {
  emit('update:modelValue', index);
}
</script>
