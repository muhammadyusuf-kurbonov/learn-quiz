<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
    <div class="grid grid-cols-5 gap-3">
      <button
        v-for="n in totalQuestions"
        :key="n"
        :class="[
          'w-12 h-12 rounded-full flex items-center justify-center text-base font-bold',
          n === currentQuestion
            ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md'
            : answers[n - 1] != null
              ? 'bg-linear-to-r from-green-400 to-emerald-500 text-white border border-green-500'
              : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
        ]"
        @click="$emit('navigate-to-question', n - 1)"
      >
        {{ n }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentQuestion: number;
  totalQuestions: number;
  answers: Record<number, number | null>;
}

interface Emits {
  (e: 'navigate-to-question', index: number): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>