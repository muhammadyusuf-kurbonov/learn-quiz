<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex flex-col">
    <div class="container mx-auto px-4 py-8 grow flex flex-col">
      <!-- Header -->
      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-slate-900">Learn Quiz</h1>
      </header>

      <!-- Main Content -->
      <div class="grow flex items-center justify-center">
        <GeneratingProgress
          :progress="progress"
          :time-remaining="timeRemaining"
          title="Generating Your Quiz"
          description="Our AI is analyzing your document and creating personalized questions"
          status-text="Processing"
          :steps="[
            { number: 1, label: 'Content Analysis', active: progress < 33 },
            { number: 2, label: 'Question Generation', active: progress >= 33 && progress < 66 },
            { number: 3, label: 'Finalizing', active: progress >= 66 }
          ]"
          @cancel="cancelProcess"
        />
      </div>
    </div>

    <!-- Footer -->
    <footer class="py-6 text-center text-slate-600 text-sm">
      <p>Powered by AI technology for enhanced learning</p>
    </footer>
  </div>
</template>

<script setup>
import { useGeneratingState } from '~/composables/generatingState'
import { useRouter } from 'vue-router'
import { watch } from 'vue'

const router = useRouter()
const { progress, timeRemaining, isComplete, startGenerating, cancelGenerating } = useGeneratingState()

// Start the generating process when component mounts
startGenerating()

// Watch for completion to navigate to quiz
watch(isComplete, (completed) => {
  if (completed) {
    setTimeout(() => {
      router.push('/quiz')
    }, 1000)
  }
})

const cancelProcess = () => {
  cancelGenerating()
  router.push('/')
}
</script>