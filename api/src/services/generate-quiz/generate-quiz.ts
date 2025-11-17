// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  generateQuizDataValidator,
  generateQuizPatchValidator,
  generateQuizQueryValidator,
  generateQuizResolver,
  generateQuizExternalResolver,
  generateQuizDataResolver,
  generateQuizPatchResolver,
  generateQuizQueryResolver
} from './generate-quiz.schema'

import type { Application } from '../../declarations'
import { GenerateQuizService, getOptions } from './generate-quiz.class'
import { generateQuizPath, generateQuizMethods } from './generate-quiz.shared'
import { createSwaggerServiceOptions } from 'feathers-swagger'

export * from './generate-quiz.class'
export * from './generate-quiz.schema'

import {
  generateQuizDataSchema,
  generateQuizSchema,
  generateQuizPatchSchema,
  generateQuizQuerySchema
} from './generate-quiz.schema';

// A configure function that registers the service and its hooks via `app.configure`
export const generateQuiz = (app: Application) => {
  // Register our service on the Feathers application
  app.use(generateQuizPath, new GenerateQuizService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: generateQuizMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: {
          generateQuizDataSchema,
          generateQuizSchema,
          generateQuizPatchSchema,
          generateQuizQuerySchema
      },
    }),
  })
  // Initialize hooks
  app.service(generateQuizPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(generateQuizExternalResolver),
        schemaHooks.resolveResult(generateQuizResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(generateQuizQueryValidator),
        schemaHooks.resolveQuery(generateQuizQueryResolver)
      ],
      create: [
        schemaHooks.validateData(generateQuizDataValidator),
        schemaHooks.resolveData(generateQuizDataResolver)
      ],
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
    [generateQuizPath]: GenerateQuizService
  }
}
