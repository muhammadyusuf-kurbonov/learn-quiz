// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  quizQuestionsDataValidator,
  quizQuestionsPatchValidator,
  quizQuestionsQueryValidator,
  quizQuestionsResolver,
  quizQuestionsExternalResolver,
  quizQuestionsDataResolver,
  quizQuestionsPatchResolver,
  quizQuestionsQueryResolver
} from './quiz-questions.schema'

import type { Application } from '../../declarations'
import { QuizQuestionsService, getOptions } from './quiz-questions.class'
import { quizQuestionsPath, quizQuestionsMethods } from './quiz-questions.shared'

export * from './quiz-questions.class'
export * from './quiz-questions.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const quizQuestions = (app: Application) => {
  // Register our service on the Feathers application
  app.use(quizQuestionsPath, new QuizQuestionsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: quizQuestionsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(quizQuestionsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(quizQuestionsExternalResolver),
        schemaHooks.resolveResult(quizQuestionsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(quizQuestionsQueryValidator),
        schemaHooks.resolveQuery(quizQuestionsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(quizQuestionsDataValidator),
        schemaHooks.resolveData(quizQuestionsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(quizQuestionsPatchValidator),
        schemaHooks.resolveData(quizQuestionsPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [quizQuestionsPath]: QuizQuestionsService
  }
}
