import { quizQuestions } from './quiz-questions/quiz-questions'
import { quizes } from './quizes/quizes'
import { generateQuiz } from './generate-quiz/generate-quiz'
import { fileUpload } from './file-upload/file-upload'
import { documentQuiz } from './document-quiz/document-quiz'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(quizQuestions)
  app.configure(quizes)
  app.configure(generateQuiz)
  app.configure(fileUpload)
  app.configure(documentQuiz)
  // All services will be registered here
}
