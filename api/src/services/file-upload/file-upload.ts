// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  fileUploadDataValidator,
  fileUploadPatchValidator,
  fileUploadQueryValidator,
  fileUploadResolver,
  fileUploadExternalResolver,
  fileUploadDataResolver,
  fileUploadPatchResolver,
  fileUploadQueryResolver
} from './file-upload.schema'

import type { Application } from '../../declarations'
import { FileUploadService, getOptions } from './file-upload.class'
import { fileUploadPath, fileUploadMethods } from './file-upload.shared'
import { createSwaggerServiceOptions } from 'feathers-swagger'
import { handleFileUpload } from '../../hooks/handle-file-upload'

export * from './file-upload.class'
export * from './file-upload.schema'

import {
  fileUploadDataSchema,
  fileUploadSchema,
  fileUploadPatchSchema,
  fileUploadQuerySchema
} from './file-upload.schema';

// A configure function that registers the service and its hooks via `app.configure`
export const fileUpload = (app: Application) => {
  // Register our service on the Feathers application
  app.use(fileUploadPath, new FileUploadService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: fileUploadMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: {
          fileUploadDataSchema,
          fileUploadSchema,
          fileUploadPatchSchema,
          fileUploadQuerySchema
      },
    }),
  })
  // Initialize hooks
  app.service(fileUploadPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(fileUploadExternalResolver),
        schemaHooks.resolveResult(fileUploadResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(fileUploadQueryValidator),
        schemaHooks.resolveQuery(fileUploadQueryResolver)
      ],
      create: [
        handleFileUpload(), // Handle file upload before validation
        schemaHooks.validateData(fileUploadDataValidator),
        schemaHooks.resolveData(fileUploadDataResolver)
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
    [fileUploadPath]: FileUploadService
  }
}