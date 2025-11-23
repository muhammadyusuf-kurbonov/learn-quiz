// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  documentQuizDataValidator,
  documentQuizPatchValidator,
  documentQuizQueryValidator,
  documentQuizResolver,
  documentQuizExternalResolver,
  documentQuizDataResolver,
  documentQuizPatchResolver,
  documentQuizQueryResolver
} from './document-quiz.schema'

import type { Application } from '../../declarations'
import { DocumentQuizService, getOptions } from './document-quiz.class'
import { documentQuizPath, documentQuizMethods } from './document-quiz.shared'
import { createSwaggerServiceOptions } from 'feathers-swagger'
import { handleDocumentQuizFlow } from '../../hooks/handle-document-quiz-flow'

export * from './document-quiz.class'
export * from './document-quiz.schema'

import {
  documentQuizDataSchema,
  documentQuizSchema,
  documentQuizPatchSchema,
  documentQuizQuerySchema
} from './document-quiz.schema';

// A configure function that registers the service and its hooks via `app.configure`
export const documentQuiz = (app: Application) => {
  // Register our service on the Feathers application
  app.use(documentQuizPath, new DocumentQuizService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: documentQuizMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: {
          documentQuizDataSchema,
          documentQuizSchema,
          documentQuizPatchSchema,
          documentQuizQuerySchema
      },
    }),
  })
  // Initialize hooks
  app.service(documentQuizPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(documentQuizExternalResolver),
        schemaHooks.resolveResult(documentQuizResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(documentQuizQueryValidator),
        schemaHooks.resolveQuery(documentQuizQueryResolver)
      ],
      create: [
        handleDocumentQuizFlow(), // Handle the complete document-to-quiz flow
        schemaHooks.validateData(documentQuizDataValidator),
        schemaHooks.resolveData(documentQuizDataResolver)
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
    [documentQuizPath]: DocumentQuizService
  }
}