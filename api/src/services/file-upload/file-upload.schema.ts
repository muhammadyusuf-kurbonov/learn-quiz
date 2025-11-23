// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { FileUploadService } from './file-upload.class'

// Main data model schema
export const fileUploadSchema = Type.Object(
  {
    id: Type.String(),
    originalName: Type.String(),
    fileName: Type.String(),
    path: Type.String(),
    mimeType: Type.String(),
    size: Type.Number(),
    uploadedAt: Type.String({ format: 'date-time' })
  },
  { $id: 'FileUpload', additionalProperties: false }
)
export type FileUpload = Static<typeof fileUploadSchema>
export const fileUploadValidator = getValidator(fileUploadSchema, dataValidator)
export const fileUploadResolver = resolve<FileUploadQuery, HookContext<FileUploadService>>({})

export const fileUploadExternalResolver = resolve<FileUpload, HookContext<FileUploadService>>({})

// Schema for creating new entries
export const fileUploadDataSchema = Type.Object(
  {
    file: Type.Object({}) // This will be handled by middleware
  },
  { $id: 'FileUploadData' }
)
export type FileUploadData = Static<typeof fileUploadDataSchema>
export const fileUploadDataValidator = getValidator(fileUploadDataSchema, dataValidator)
export const fileUploadDataResolver = resolve<FileUploadData, HookContext<FileUploadService>>({})

// Schema for updating existing entries
export const fileUploadPatchSchema = Type.Partial(fileUploadSchema, {
  $id: 'FileUploadPatch'
})
export type FileUploadPatch = Static<typeof fileUploadPatchSchema>
export const fileUploadPatchValidator = getValidator(fileUploadPatchSchema, dataValidator)
export const fileUploadPatchResolver = resolve<FileUploadPatch, HookContext<FileUploadService>>({})

// Schema for allowed query properties
export const fileUploadQueryProperties = Type.Pick(fileUploadSchema, ['id', 'originalName', 'mimeType'])
export const fileUploadQuerySchema = Type.Intersect(
  [
    querySyntax(fileUploadQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type FileUploadQuery = Static<typeof fileUploadQuerySchema>
export const fileUploadQueryValidator = getValidator(fileUploadQuerySchema, queryValidator)
export const fileUploadQueryResolver = resolve<FileUploadQuery, HookContext<FileUploadService>>({})