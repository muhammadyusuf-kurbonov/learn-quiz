<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <!-- Main Content -->
    <main class="grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-12">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <h3 class="text-xl font-bold">Learn Quiz</h3>
            <p class="text-gray-400">Transform documents into interactive quizzes</p>
          </div>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">Privacy</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">Terms</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">Contact</a>
          </div>
        </div>
        <div class="mt-8 text-center text-gray-400 text-sm">
          <p>&copy; {{ new Date().getFullYear() }} Learn Quiz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Global styles can go here if needed */
</style>