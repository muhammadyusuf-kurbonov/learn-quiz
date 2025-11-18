<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <div class="container mx-auto px-4 py-12">
      <!-- Header -->
      <header class="mb-16 text-center">
        <h1 class="text-5xl font-bold text-slate-900 mb-4">Learn Quiz</h1>
        <p class="text-xl text-slate-600 max-w-2xl mx-auto">Transform your documents into interactive quizzes in seconds. Upload any PDF, DOCX, or Excel file and get personalized questions to test your knowledge.</p>
      </header>

      <!-- Hero Section -->
      <div class="max-w-4xl mx-auto mb-16">
        <div class="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-200">
          <div class="md:flex">
            <div class="md:w-1/2 p-10 flex flex-col justify-center">
              <h2 class="text-3xl font-bold text-slate-900 mb-6">How it works</h2>
              <ul class="space-y-6">
                <li class="flex items-start">
                  <div class="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 shrink-0 font-semibold">1</div>
                  <p class="text-lg text-slate-800">Upload your document (PDF, DOCX, or Excel)</p>
                </li>
                <li class="flex items-start">
                  <div class="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 shrink-0 font-semibold">2</div>
                  <p class="text-lg text-slate-800">Our AI analyzes the content and generates questions</p>
                </li>
                <li class="flex items-start">
                  <div class="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 shrink-0 font-semibold">3</div>
                  <p class="text-lg text-slate-800">Take the quiz and see your results</p>
                </li>
              </ul>
              <div class="mt-10">
                <NuxtLink to="/upload" class="inline-block px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Get Started
                </NuxtLink>
              </div>
            </div>
            <div class="md:w-1/2 bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center p-10">
              <div class="bg-white p-6 rounded-xl shadow-md w-full max-w-xs border border-slate-200">
                <div class="bg-linear-to-br from-slate-100 to-slate-200 border-2 border-dashed border-slate-300 rounded-xl w-full h-48 flex items-center justify-center text-slate-700 font-medium">
                  Quiz Preview
                </div>
                <div class="mt-6 space-y-4">
                  <div class="h-4 bg-slate-200 rounded-full"></div>
                  <div class="h-4 bg-slate-200 rounded-full w-5/6"></div>
                  <div class="h-4 bg-slate-200 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="max-w-6xl mx-auto mb-16">
        <h2 class="text-4xl font-bold text-center text-slate-900 mb-16">Powerful Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-2xl shadow-lg text-center border border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div class="w-20 h-20 bg-linear-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Smart AI</h3>
            <p class="text-slate-700">Our advanced AI analyzes your documents to create relevant, challenging questions.</p>
          </div>
          <div class="bg-white p-8 rounded-2xl shadow-lg text-center border border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div class="w-20 h-20 bg-linear-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Fast Results</h3>
            <p class="text-slate-700">Generate and take quizzes in minutes, not hours. Perfect for quick learning sessions.</p>
          </div>
          <div class="bg-white p-8 rounded-2xl shadow-lg text-center border border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div class="w-20 h-20 bg-linear-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Detailed Reports</h3>
            <p class="text-slate-700">Get comprehensive feedback on your performance with detailed explanations.</p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="max-w-2xl mx-auto text-center bg-linear-to-br from-indigo-50 to-purple-50 rounded-3xl shadow-lg p-10 border border-slate-200">
        <h2 class="text-3xl font-bold text-slate-900 mb-4">Ready to transform your learning?</h2>
        <p class="text-lg text-slate-700 mb-8">Join thousands of students and professionals using Learn Quiz to enhance their knowledge.</p>
        <NuxtLink to="/upload" class="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl inline-block">
          Start Learning Now
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// This is a UI mockup - no logic implementation yet
</script>