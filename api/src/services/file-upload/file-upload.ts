// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  fileUploadDataResolver,
  fileUploadDataValidator,
  fileUploadExternalResolver,
  fileUploadQueryResolver,
  fileUploadQueryValidator,
  fileUploadResolver
} from './file-upload.schema'

import { createSwaggerServiceOptions } from 'feathers-swagger'
import type { Application } from '../../declarations'
import { FileUploadQuery, getOptions } from './file-upload.class'
import { fileUploadMethods, fileUploadPath } from './file-upload.shared'

export * from './file-upload.schema'

import feathersBlob from 'feathers-blob'
import {
  fileUploadDataSchema,
  fileUploadPatchSchema,
  fileUploadQuerySchema,
  fileUploadSchema
} from './file-upload.schema'
import multer from '@koa/multer'
import { debug, setField } from 'feathers-hooks-common'
import { FeathersKoaContext } from '@feathersjs/koa'
import { Params } from '@feathersjs/feathers'

// A configure function that registers the service and its hooks via `app.configure`
export const fileUpload = (app: Application) => {
  // Get options based on app configuration
  const options = getOptions(app)

  const multipart = multer({
    limits: {
      fileSize: 10 * 1024 * 1024 // 10MB
    },
  })
  const multipartMiddleware = multipart.any()

  // Create and register our file upload service on the Feathers application
  app.use(fileUploadPath, feathersBlob(options), {
    // A list of all methods this service exposes externally
    methods: fileUploadMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    koa: {
      before: [
        multipartMiddleware,
        async (ctx: FeathersKoaContext<Application>, next) => {
          console.log(ctx.files, ctx.file);
          ctx.feathers = {
            ...ctx.feathers,
            // @ts-expect-error Type definition error
            files: ctx.files,
          };
          await next();
        },
      ]
    },
    docs: createSwaggerServiceOptions({
      schemas: {
        fileUploadDataSchema,
        fileUploadSchema,
        fileUploadPatchSchema,
        fileUploadQuerySchema
      },
      docs: {
        operations: {
          create: {
            description: 'Upload a file',
            parameters: [
              {
                name: 'file',
                in: 'formData',
                description: 'File to upload',
                required: true,
                type: 'file'
              }
            ],
            requestBody: {
              content: {
                'multipart/form-data': {
                  schema: {
                    type: 'object',
                    properties: {
                      file: {
                        type: 'string',
                        format: 'binary'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
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
        async (ctx) => {
          if (ctx.data?.buffer) {
            return;
          }

          const dataArray = ctx.params.files
            .map((file: multer.File) => ({ buffer: file.buffer, contentType: file.mimetype }));

          ctx.result = await Promise
            .all(dataArray.map((data: { buffer: Buffer, contentType: string }) => ctx.service.create(data, ctx.params)));
        },
        debug('before upload'),
        // Skip data validation for file upload as it's handled by middleware
        schemaHooks.resolveData(fileUploadDataResolver)
      ]
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
    [fileUploadPath]: ReturnType<typeof feathersBlob>
  }
}
