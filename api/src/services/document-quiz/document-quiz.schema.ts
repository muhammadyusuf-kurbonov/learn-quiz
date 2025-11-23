// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { DocumentQuizService } from './document-quiz.class'

// Main data model schema
export const documentQuizSchema = Type.Object(
  {
    id: Type.Number(),
    fileName: Type.String(),
    quizResult: Type.String(),
    status: Type.String(),
  },
  { $id: 'DocumentQuiz', additionalProperties: false }
)
export type DocumentQuiz = Static<typeof documentQuizSchema>
export const documentQuizValidator = getValidator(documentQuizSchema, dataValidator)
export const documentQuizResolver = resolve<DocumentQuizQuery, HookContext<DocumentQuizService>>({})

export const documentQuizExternalResolver = resolve<DocumentQuiz, HookContext<DocumentQuizService>>({})

// Schema for creating new entries
export const documentQuizDataSchema = Type.Object(
  {
    file: Type.Object({}) // This will be handled by middleware
  },
  { $id: 'DocumentQuizData' }
)
export type DocumentQuizData = Static<typeof documentQuizDataSchema>
export const documentQuizDataValidator = getValidator(documentQuizDataSchema, dataValidator)
export const documentQuizDataResolver = resolve<DocumentQuizData, HookContext<DocumentQuizService>>({})

// Schema for updating existing entries
export const documentQuizPatchSchema = Type.Partial(documentQuizSchema, {
  $id: 'DocumentQuizPatch'
})
export type DocumentQuizPatch = Static<typeof documentQuizPatchSchema>
export const documentQuizPatchValidator = getValidator(documentQuizPatchSchema, dataValidator)
export const documentQuizPatchResolver = resolve<DocumentQuizPatch, HookContext<DocumentQuizService>>({})

// Schema for allowed query properties
export const documentQuizQueryProperties = Type.Pick(documentQuizSchema, ['id', 'fileName', 'status'])
export const documentQuizQuerySchema = Type.Intersect(
  [
    querySyntax(documentQuizQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type DocumentQuizQuery = Static<typeof documentQuizQuerySchema>
export const documentQuizQueryValidator = getValidator(documentQuizQuerySchema, queryValidator)
export const documentQuizQueryResolver = resolve<DocumentQuizQuery, HookContext<DocumentQuizService>>({})