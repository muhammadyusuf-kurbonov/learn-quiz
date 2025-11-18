<template>
  <div class="max-w-2xl w-full bg-white rounded-3xl shadow-lg p-10 text-center border border-slate-200">
    <!-- Animated Processing -->
    <div class="mb-10">
      <div class="relative w-40 h-40 mx-auto mb-8">
        <div class="absolute inset-0 rounded-full border-8 border-slate-200"></div>
        <div
          class="absolute inset-0 rounded-full border-t-8 border-indigo-600 animate-spin"
          :class="{ 'animate-spin': isSpinning }"
        ></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <UIcon name="i-heroicons-document-text" class="w-14 h-14 text-indigo-600" />
        </div>
      </div>

      <h2 class="text-3xl font-bold text-slate-900 mb-4">{{ title }}</h2>
      <p class="text-lg text-slate-700 mb-8">{{ description }}</p>
    </div>

    <!-- Progress Bar -->
    <div class="mb-10">
      <div class="flex justify-between text-base text-slate-700 mb-3">
        <span class="font-medium">{{ statusText }}</span>
        <span class="font-semibold">{{ progress }}%</span>
      </div>
      <UProgress :value="progress" size="lg" class="w-full" color="primary" />
    </div>

    <!-- Steps -->
    <div class="grid grid-cols-3 gap-6 mb-10">
      <div v-for="(step, index) in steps" :key="index" class="text-center">
        <div
          class="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-semibold"
          :class="[
            step.active
              ? 'bg-linear-to-br from-indigo-500 to-indigo-600 text-white'
              : 'bg-slate-100 text-slate-700 border-2 border-slate-200'
          ]"
        >
          {{ step.number }}
        </div>
        <p
          class="text-base font-medium"
          :class="[step.active ? 'text-slate-900' : 'text-slate-700']"
        >
          {{ step.label }}
        </p>
      </div>
    </div>

    <!-- Estimated Time -->
    <div class="bg-linear-to-br from-indigo-50 to-blue-50 rounded-2xl p-5 mb-8 border border-indigo-100">
      <p class="text-slate-800 flex items-center justify-center text-lg">
        <UIcon name="i-heroicons-clock" class="w-6 h-6 mr-3 text-indigo-600" />
        Estimated time: <span class="font-bold ml-1 text-indigo-700">{{ timeRemaining }} seconds</span>
      </p>
    </div>

    <!-- Cancel Button -->
    <button
      class="px-8 py-3 text-lg font-medium hover:bg-slate-50 rounded-lg border border-slate-300 text-slate-700"
      @click="$emit('cancel')"
    >
      Cancel Process
    </button>
  </div>
</template>

<script setup lang="ts">
interface Step {
  number: number;
  label: string;
  active: boolean;
}

interface Props {
  progress?: number;
  timeRemaining?: number;
  title?: string;
  description?: string;
  statusText?: string;
  steps?: Step[];
  isSpinning?: boolean;
}

interface Emits {
  (e: 'cancel'): void;
}

withDefaults(defineProps<Props>(), {
  progress: 75,
  timeRemaining: 15,
  title: 'Generating Your Quiz',
  description: 'Our AI is analyzing your document and creating personalized questions',
  statusText: 'Processing',
  steps: () => [
    { number: 1, label: 'Content Analysis', active: false },
    { number: 2, label: 'Question Generation', active: true },
    { number: 3, label: 'Finalizing', active: false }
  ],
  isSpinning: true
});

defineEmits<Emits>();
</script>