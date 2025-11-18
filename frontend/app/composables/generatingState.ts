// composables/generatingState.ts
import { ref } from 'vue'
import type { GeneratingState } from '~/types/quiz'

export const useGeneratingState = () => {
  const progress = ref<GeneratingState['progress']>(0)
  const timeRemaining = ref<GeneratingState['timeRemaining']>(15)
  const isComplete = ref<GeneratingState['isComplete']>(false)

  // Simulate the generation process
  const startGenerating = () => {
    const interval = setInterval(() => {
      if (progress.value < 100) {
        progress.value += Math.floor(Math.random() * 10) + 5 // Random increment for more realistic feel
        if (timeRemaining.value > 0) {
          timeRemaining.value--
        }
      } else {
        isComplete.value = true
        clearInterval(interval)
      }
    }, 1000)
  }

  const cancelGenerating = () => {
    progress.value = 0
    timeRemaining.value = 15
    isComplete.value = false
  }

  return {
    progress,
    timeRemaining,
    isComplete,
    startGenerating,
    cancelGenerating
  }
}