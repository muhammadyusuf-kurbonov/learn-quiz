<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <div class="container mx-auto px-4 py-12">
      <!-- Header -->
      <header class="mb-12 text-center">
        <h1 class="text-4xl font-bold text-slate-900 mb-2">Learn Quiz</h1>
        <p class="text-lg text-slate-600">Transform your documents into interactive quizzes</p>
      </header>

      <!-- Upload Card -->
      <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-3xl shadow-lg p-10 border border-slate-200">
          <div class="text-center mb-10">
            <h2 class="text-3xl font-bold text-slate-900 mb-3">Upload Your Document</h2>
            <p class="text-lg text-slate-700">We support PDF, DOCX, and Excel files</p>
          </div>

          <!-- Drag & Drop Area -->
          <div
            class="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center hover:border-indigo-400 transition-colors duration-300 bg-linear-to-br from-slate-50 to-slate-100 hover:from-indigo-50 hover:to-indigo-100"
            @dragover.prevent="handleDragOver"
            @drop="handleDrop"
            @dragleave="handleDragLeave"
          >
            <div class="mb-4">
              <UIcon
                :name="isDraggingOver ? 'i-heroicons-document-text' : 'i-heroicons-document-arrow-up'"
                class="mx-auto h-16 w-16 text-slate-500"
                :class="{ 'text-indigo-600': isDraggingOver }"
              />
            </div>
            <p class="text-xl font-medium text-slate-800 mb-2">Drag and drop your file here</p>
            <p class="text-slate-600 mb-4">or</p>

            <!-- Hidden file input -->
            <input
              ref="fileInputRef"
              type="file"
              accept=".pdf,.docx,.xlsx"
              class="hidden"
              @change="handleFileSelect"
            />

            <UButton
              color="primary"
              variant="solid"
              class="px-8 py-3 text-lg font-semibold"
              @click="selectFile"
            >
              Browse Files
            </UButton>
            <p class="text-sm text-slate-600 mt-4">PDF, DOCX, or Excel up to 10MB</p>

            <!-- Selected file info -->
            <div v-if="selectedFile" class="mt-4 p-3 bg-slate-100 rounded-lg flex items-center justify-between">
              <div class="flex items-center">
                <UIcon name="i-heroicons-document-text" class="w-5 h-5 mr-2 text-indigo-600" />
                <span class="text-slate-700 truncate">{{ selectedFile.name }}</span>
              </div>
              <UButton
                color="red"
                variant="ghost"
                size="sm"
                class="ml-2 rounded-full hover:bg-red-100"
                @click="cancelFile"
              >
                <UIcon name="i-heroicons-x-mark-20-solid" class="w-5 h-5 text-red-500 hover:text-red-700" />
              </UButton>
            </div>
          </div>

          <!-- Supported Formats -->
          <div class="mt-8">
            <h3 class="text-xl font-semibold text-slate-800 mb-4">Supported formats:</h3>
            <div class="flex flex-wrap gap-4 justify-center">
              <div class="bg-linear-to-r from-blue-100 to-blue-200 text-blue-800 px-6 py-3 rounded-full font-medium border border-blue-200">PDF</div>
              <div class="bg-linear-to-r from-green-100 to-green-200 text-green-800 px-6 py-3 rounded-full font-medium border border-green-200">DOCX</div>
              <div class="bg-linear-to-r from-amber-100 to-amber-200 text-amber-800 px-6 py-3 rounded-full font-medium border border-amber-200">XLSX</div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-12 flex justify-center gap-4">
            <UButton
              color="primary"
              class="px-10 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              :disabled="!selectedFile"
              @click="generateQuiz"
            >
              Generate Quiz
            </UButton>
          </div>
        </div>

        <!-- Features Preview -->
        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-2xl p-8 shadow-lg text-center border border-slate-200 transition-all duration-300 hover:shadow-xl">
            <div class="w-16 h-16 bg-linear-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <UIcon name="i-heroicons-shield-check" class="w-8 h-8 text-indigo-700" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Secure Processing</h3>
            <p class="text-slate-700">Your documents are processed securely and deleted after quiz generation</p>
          </div>
          <div class="bg-white rounded-2xl p-8 shadow-lg text-center border border-slate-200 transition-all duration-300 hover:shadow-xl">
            <div class="w-16 h-16 bg-linear-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <UIcon name="i-heroicons-bolt" class="w-8 h-8 text-emerald-700" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Fast Generation</h3>
            <p class="text-slate-700">Get your quiz in seconds with our AI-powered technology</p>
          </div>
          <div class="bg-white rounded-2xl p-8 shadow-lg text-center border border-slate-200 transition-all duration-300 hover:shadow-xl">
            <div class="w-16 h-16 bg-linear-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <UIcon name="i-heroicons-cog-6-tooth" class="w-8 h-8 text-purple-700" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Customizable</h3>
            <p class="text-slate-700">Adjust difficulty and question types to fit your needs</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// File input reference
const fileInputRef = ref<HTMLInputElement>()
const selectedFile = ref<File | null>(null)
const isDraggingOver = ref(false)
const router = useRouter()

// Methods
const selectFile = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0] ?? null;
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDraggingOver.value = true
}

const handleDragLeave = () => {
  isDraggingOver.value = false
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDraggingOver.value = false

  if (event.dataTransfer && event.dataTransfer.files.length > 0) {
    const file = event.dataTransfer.files[0] ?? null;
    if (!file) {
      return;
    }
    // Check if file type is supported
    if (file.type === 'application/pdf' ||
        file.name.endsWith('.docx') ||
        file.name.endsWith('.xlsx')) {
      selectedFile.value = file
    } else {
      alert('Please upload a PDF, DOCX, or XLSX file.')
    }
  }
}

const cancelFile = () => {
  selectedFile.value = null;
  // Also reset the file input to clear any selected files
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
}

const generateQuiz = async () => {
  if (!selectedFile.value) {
    alert('Please select a file first.')
    return
  }

  // In a real application, you would upload the file to your backend here
  // For now, we'll just navigate to the generating page
  router.push('/generating')
}
</script>