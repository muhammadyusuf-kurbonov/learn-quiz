// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { GenerateQuizService } from './generate-quiz.class'

// Main data model schema
export const generateQuizSchema = Type.Object(
  {
    id: Type.Number(),
    fileId: Type.String(),
    responseTxt: Type.String(),
  },
  { $id: 'GenerateQuiz', additionalProperties: false }
)
export type GenerateQuiz = Static<typeof generateQuizSchema>
export const generateQuizValidator = getValidator(generateQuizSchema, dataValidator)
export const generateQuizResolver = resolve<GenerateQuizQuery, HookContext<GenerateQuizService>>({})

export const generateQuizExternalResolver = resolve<GenerateQuiz, HookContext<GenerateQuizService>>({})

// Schema for creating new entries
export const generateQuizDataSchema = Type.Pick(generateQuizSchema, ['fileId'], {
  $id: 'GenerateQuizData'
})
export type GenerateQuizData = Static<typeof generateQuizDataSchema>
export const generateQuizDataValidator = getValidator(generateQuizDataSchema, dataValidator)
export const generateQuizDataResolver = resolve<GenerateQuizData, HookContext<GenerateQuizService>>({})

// Schema for updating existing entries
export const generateQuizPatchSchema = Type.Partial(generateQuizSchema, {
  $id: 'GenerateQuizPatch'
})
export type GenerateQuizPatch = Static<typeof generateQuizPatchSchema>
export const generateQuizPatchValidator = getValidator(generateQuizPatchSchema, dataValidator)
export const generateQuizPatchResolver = resolve<GenerateQuizPatch, HookContext<GenerateQuizService>>({})

// Schema for allowed query properties
export const generateQuizQueryProperties = Type.Pick(generateQuizSchema, ['id', 'fileId'])
export const generateQuizQuerySchema = Type.Intersect(
  [
    querySyntax(generateQuizQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type GenerateQuizQuery = Static<typeof generateQuizQuerySchema>
export const generateQuizQueryValidator = getValidator(generateQuizQuerySchema, queryValidator)
export const generateQuizQueryResolver = resolve<GenerateQuizQuery, HookContext<GenerateQuizService>>({})
