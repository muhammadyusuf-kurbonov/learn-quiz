<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
useHead({
  title: 'Learn Quiz - Transform Documents into Interactive Quizzes',
  meta: [
    {
      name: 'description',
      content: 'Transform your documents into interactive quizzes in seconds. Upload any PDF, DOCX, or Excel file and get personalized questions to test your knowledge.'
    }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})
</script>
